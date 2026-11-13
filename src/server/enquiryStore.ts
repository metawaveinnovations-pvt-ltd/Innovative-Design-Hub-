import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import type { ContactEnquiryInput, EnrollmentEnquiryInput } from '../utils/validation';

export interface StoredEnrollmentRecord extends Omit<EnrollmentEnquiryInput, 'website'> {
  id: string;
  createdAt: string;
  source: 'website-enroll';
}

export interface StoredContactRecord extends Omit<ContactEnquiryInput, 'website'> {
  id: string;
  createdAt: string;
  source: 'website-contact';
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');
const CONTACT_FILE = path.join(DATA_DIR, 'contact-messages.json');

async function ensureStoreFile(filePath: string): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, '[]\n', 'utf8');
  }
}

async function appendRecord<T>(filePath: string, record: T): Promise<void> {
  await ensureStoreFile(filePath);
  const raw = await fs.readFile(filePath, 'utf8');
  let existing: T[] = [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      existing = parsed as T[];
    }
  } catch {
    existing = [];
  }
  existing.push(record);
  const tmpPath = `${filePath}.${crypto.randomUUID()}.tmp`;
  await fs.writeFile(tmpPath, `${JSON.stringify(existing, null, 2)}\n`, 'utf8');
  await fs.rename(tmpPath, filePath);
}

/**
 * Optional external integration boundary:
 * If ENQUIRY_WEBHOOK_URL is configured in the environment, forwards submitted
 * records to an external CRM/spreadsheet webhook after persisting locally.
 */
async function forwardToConfiguredWebhook(payload: unknown): Promise<void> {
  const webhookUrl = process.env.ENQUIRY_WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.warn('Optional ENQUIRY_WEBHOOK_URL forwarding failed:', err);
  }
}

export async function saveEnrollmentEnquiry(
  input: EnrollmentEnquiryInput,
): Promise<StoredEnrollmentRecord> {
  const id = `IDH-ENQ-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
  const record: StoredEnrollmentRecord = {
    id,
    createdAt: new Date().toISOString(),
    source: 'website-enroll',
    fullName: input.fullName,
    email: input.email,
    phone: input.phone,
    courseInterest: input.courseInterest,
    learningLevel: input.learningLevel,
    message: input.message,
    privacyConsent: input.privacyConsent,
  };

  await appendRecord(ENQUIRIES_FILE, record);
  await forwardToConfiguredWebhook(record);
  return record;
}

export async function saveContactMessage(
  input: ContactEnquiryInput,
): Promise<StoredContactRecord> {
  const id = `IDH-MSG-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
  const record: StoredContactRecord = {
    id,
    createdAt: new Date().toISOString(),
    source: 'website-contact',
    fullName: input.fullName,
    email: input.email,
    phone: input.phone,
    topic: input.topic,
    message: input.message,
    privacyConsent: input.privacyConsent,
  };

  await appendRecord(CONTACT_FILE, record);
  await forwardToConfiguredWebhook(record);
  return record;
}
