import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { createServer as createViteServer } from 'vite';
import { validateContactEnquiry, validateEnrollmentEnquiry } from './src/utils/validation';
import { saveContactMessage, saveEnrollmentEnquiry } from './src/server/enquiryStore';

const PORT = Number(process.env.PORT || 3000);
const RATE_WINDOW_MS = 15 * 60 * 1000;
const MAX_SUBMISSIONS_PER_WINDOW = 10;

const submissionBuckets = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = submissionBuckets.get(ip) ?? [];
  const recent = timestamps.filter((ts) => now - ts < RATE_WINDOW_MS);
  if (recent.length >= MAX_SUBMISSIONS_PER_WINDOW) {
    submissionBuckets.set(ip, recent);
    return true;
  }
  recent.push(now);
  submissionBuckets.set(ip, recent);
  return false;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '32kb' }));

  app.get('/api/health', (_req, res) => {
    res.json({
      ok: true,
      service: 'idh-web-backend',
      storageConfigured: true,
    });
  });

  app.post('/api/enquiries', async (req, res) => {
    const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
    if (isRateLimited(clientIp)) {
      res.status(429).json({
        ok: false,
        code: 'RATE_LIMITED',
        message: 'Too many enquiries submitted recently. Please wait a few minutes or call IDH directly.',
      });
      return;
    }

    const body = req.body ?? {};
    if (typeof body.website === 'string' && body.website.trim().length > 0) {
      // Reject automated honeypot submissions clearly without persisting spam
      res.status(400).json({
        ok: false,
        code: 'INVALID_SUBMISSION',
        message: 'Submission could not be verified. Please try again or contact IDH by phone.',
      });
      return;
    }

    const validation = validateEnrollmentEnquiry({
      fullName: String(body.fullName ?? ''),
      email: String(body.email ?? ''),
      phone: String(body.phone ?? ''),
      courseInterest: String(body.courseInterest ?? ''),
      learningLevel: body.learningLevel ?? '',
      message: String(body.message ?? ''),
      privacyConsent: Boolean(body.privacyConsent),
      website: '',
    });

    if (!validation.valid || !validation.sanitized) {
      res.status(422).json({
        ok: false,
        code: 'VALIDATION_ERROR',
        message: 'Please correct the highlighted fields and try again.',
        errors: validation.errors,
      });
      return;
    }

    try {
      const saved = await saveEnrollmentEnquiry(validation.sanitized);
      res.status(201).json({
        ok: true,
        referenceId: saved.id,
        submittedAt: saved.createdAt,
        message: 'Your enrollment enquiry has been recorded by Innovative Design Hub.',
      });
    } catch (error) {
      console.error('Failed to persist enrollment enquiry:', error);
      res.status(503).json({
        ok: false,
        code: 'STORAGE_UNAVAILABLE',
        message:
          'We could not store your enquiry right now. Please call IDH directly on 03103816085 or 0316 3042347.',
      });
    }
  });

  app.post('/api/contact', async (req, res) => {
    const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
    if (isRateLimited(clientIp)) {
      res.status(429).json({
        ok: false,
        code: 'RATE_LIMITED',
        message: 'Too many messages sent recently. Please wait a few minutes or call IDH directly.',
      });
      return;
    }

    const body = req.body ?? {};
    if (typeof body.website === 'string' && body.website.trim().length > 0) {
      res.status(400).json({
        ok: false,
        code: 'INVALID_SUBMISSION',
        message: 'Submission could not be verified.',
      });
      return;
    }

    const validation = validateContactEnquiry({
      fullName: String(body.fullName ?? ''),
      email: String(body.email ?? ''),
      phone: String(body.phone ?? ''),
      topic: String(body.topic ?? ''),
      message: String(body.message ?? ''),
      privacyConsent: Boolean(body.privacyConsent),
      website: '',
    });

    if (!validation.valid || !validation.sanitized) {
      res.status(422).json({
        ok: false,
        code: 'VALIDATION_ERROR',
        message: 'Please review the form fields and try again.',
        errors: validation.errors,
      });
      return;
    }

    try {
      const saved = await saveContactMessage(validation.sanitized);
      res.status(201).json({
        ok: true,
        referenceId: saved.id,
        submittedAt: saved.createdAt,
        message: 'Your message has been received by the IDH team.',
      });
    } catch (error) {
      console.error('Failed to persist contact enquiry:', error);
      res.status(503).json({
        ok: false,
        code: 'STORAGE_UNAVAILABLE',
        message:
          'We could not record your message right now. Please call IDH directly on 03103816085 or 0316 3042347.',
      });
    }
  });

  app.get('/sitemap.xml', (req, res) => {
    const baseUrl = process.env.APP_URL || `${req.protocol}://${req.get('host')}`;
    const cleanBase = baseUrl.replace(/\/$/, '');
    const routes = [
      '/',
      '/courses',
      '/courses/web-development-with-ai',
      '/courses/graphic-design',
      '/courses/digital-marketing',
      '/courses/artificial-intelligence',
      '/courses/english-language-and-conversation-club',
      '/courses/python-programming',
      '/courses/cyber-security',
      '/instructors',
      '/scholarships',
      '/about',
      '/contact',
      '/enroll',
      '/faq',
      '/privacy',
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => `  <url><loc>${cleanBase}${route}</loc></url>`).join('\n')}
</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`IDH server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
