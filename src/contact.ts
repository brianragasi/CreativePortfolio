export type ContactDraft = {
  name: string
  email: string
  message: string
  website: string
}

export type ContactResult = 'accepted' | 'activation'

export const CONTACT_LIMITS = { name: 100, email: 254, message: 5000 }

export function validateContactDraft(draft: ContactDraft): string | null {
  if (draft.website.trim()) return 'Unable to submit this form. Please use the email link instead.'
  if (draft.name.trim().length < 2 || draft.name.trim().length > CONTACT_LIMITS.name) {
    return 'Please enter a name between 2 and 100 characters.'
  }
  if (draft.email.length > CONTACT_LIMITS.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email.trim())) {
    return 'Please enter a valid email address so Brian can reply.'
  }
  if (draft.message.trim().length < 10 || draft.message.trim().length > CONTACT_LIMITS.message) {
    return 'Please write a message between 10 and 5,000 characters.'
  }
  return null
}

export async function submitContactMessage(
  recipient: string,
  draft: ContactDraft,
  signal: AbortSignal,
  fetcher: typeof fetch = fetch,
): Promise<ContactResult> {
  const validationError = validateContactDraft(draft)
  if (validationError) throw new Error(validationError)

  const response = await fetcher(`https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    signal,
    body: JSON.stringify({
      name: draft.name.trim(),
      email: draft.email.trim(),
      message: draft.message.trim(),
      _replyto: draft.email.trim(),
      _subject: 'New portfolio contact message',
      _template: 'table',
      _honey: draft.website,
    }),
  })

  if (response.status === 429) {
    throw new Error('The email service is receiving too many requests. Please wait before trying again.')
  }
  if (!response.ok) {
    throw new Error('The email service could not confirm submission. Your message is still here; please try again later or use the email link.')
  }

  let payload: unknown
  try {
    payload = await response.json()
  } catch {
    throw new Error('The email service returned an unexpected response. Submission could not be confirmed; your message has been kept.')
  }
  if (!payload || typeof payload !== 'object') {
    throw new Error('Submission could not be confirmed. Your message has been kept.')
  }

  const data = payload as { success?: unknown; message?: unknown }
  const providerMessage = typeof data.message === 'string' ? data.message : ''
  // Do not label a first-use verification response as delivered mail.
  if (/needs? activat|activat(?:e|ion) (?:your |the )?form|confirm your email|verify your email/i.test(providerMessage)) {
    return 'activation'
  }
  if (data.success !== true && data.success !== 'true') {
    throw new Error('The email service did not accept the submission. Your message is still here; please try again later or use the email link.')
  }
  // Provider acceptance is not proof of delivery to the recipient's inbox.
  return 'accepted'
}
