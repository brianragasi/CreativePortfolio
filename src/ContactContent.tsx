import { CheckCircle2, Code2, Copy, ExternalLink, Globe2, LoaderCircle, Mail, Send } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { CONTACT_LIMITS, submitContactMessage, validateContactDraft } from './contact'
import type { ContactDraft, ContactResult } from './contact'
import { profile } from './portfolio'

const emptyDraft: ContactDraft = { name: '', email: '', message: '', website: '' }

export default function ContactContent({ notify }: { notify: (message: string) => void }) {
  const [draft, setDraft] = useState<ContactDraft>(emptyDraft)
  const [status, setStatus] = useState<'idle' | 'sending' | ContactResult>('idle')
  const [error, setError] = useState('')
  const request = useRef<AbortController | null>(null)
  const feedback = useRef<HTMLDivElement | null>(null)

  useEffect(() => () => {
    request.current?.abort()
    request.current = null
  }, [])

  useEffect(() => {
    if (status === 'accepted' || status === 'activation') feedback.current?.focus()
  }, [status])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      notify('Email address copied.')
    } catch {
      notify(`Couldn't copy automatically. Email: ${profile.email}`)
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (request.current) return
    const validationError = validateContactDraft(draft)
    if (validationError) {
      setError(validationError)
      return
    }

    const controller = new AbortController()
    request.current = controller
    setError('')
    setStatus('sending')
    const timeout = window.setTimeout(() => controller.abort(), 20000)
    try {
      const result = await submitContactMessage(profile.email, draft, controller.signal)
      if (request.current !== controller) return
      setStatus(result)
      if (result === 'accepted') {
        setDraft(emptyDraft)
        notify('Message accepted by the email service.')
      } else {
        notify('Email confirmation is required before this form can deliver messages.')
      }
    } catch (submissionError) {
      if (request.current !== controller) return
      setStatus('idle')
      if (controller.signal.aborted) {
        setError('The request timed out. Submission could not be confirmed. Your message is still here; avoid resending immediately to prevent duplicates.')
      } else if (submissionError instanceof TypeError) {
        setError('Could not reach the email service. Check your connection or try the email link. Your message has been kept.')
      } else {
        setError(submissionError instanceof Error ? submissionError.message : 'Something went wrong. Your message has been kept.')
      }
    } finally {
      window.clearTimeout(timeout)
      if (request.current === controller) request.current = null
    }
  }

  const updateDraft = (field: keyof ContactDraft, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }))
  }

  return (
    <div className="contact-view">
      <aside>
        <p className="eyebrow">LET'S TALK</p>
        <h2>Have a project in mind?</h2>
        <p>I’m always happy to talk about useful products, interesting technical problems, or a good collaboration.</p>
        <div className="contact-links">
          <a href={`mailto:${profile.email}`}><Mail size={18} /><span><small>Email</small>{profile.email}</span></a>
          <button type="button" className="copy-email" onClick={copyEmail}><Copy size={13} /> Copy email address</button>
          <a href={profile.github} target="_blank" rel="noreferrer"><Code2 size={18} /><span><small>GitHub</small>{new URL(profile.github).pathname.replace(/^\/|\/$/g, '')}</span><ExternalLink size={13} /></a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer"><Globe2 size={18} /><span><small>LinkedIn</small>View my profile</span><ExternalLink size={13} /></a>
        </div>
      </aside>
      {status === 'accepted' || status === 'activation' ? (
        <div className="sent-state" role="status" tabIndex={-1} ref={feedback}>
          {status === 'activation' ? <Mail size={48} /> : <CheckCircle2 size={48} />}
          <h3>{status === 'activation' ? 'Email confirmation needed' : 'Message submitted'}</h3>
          <p>{status === 'activation'
            ? `This form is waiting for its owner to confirm ${profile.email} through FormSubmit. Delivery is not active yet. Your draft is still available.`
            : 'The email service accepted your message. Thank you for reaching out! This confirms submission, not inbox delivery.'}</p>
          <button type="button" onClick={() => { setStatus('idle'); setError('') }}>{status === 'activation' ? 'Return to your draft' : 'Write another message'}</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} aria-label="Contact Brian" aria-busy={status === 'sending'} aria-describedby="contact-privacy">
          <label>Your name<input name="name" autoComplete="name" placeholder="Jane Smith" required minLength={2} maxLength={CONTACT_LIMITS.name} value={draft.name} onChange={(event) => updateDraft('name', event.target.value)} disabled={status === 'sending'} /></label>
          <label>Email address<input name="email" type="email" autoComplete="email" placeholder="jane@company.com" required maxLength={CONTACT_LIMITS.email} value={draft.email} onChange={(event) => updateDraft('email', event.target.value)} disabled={status === 'sending'} /></label>
          <label>Message<textarea name="message" placeholder="Tell me a little about what you're building…" required minLength={10} maxLength={CONTACT_LIMITS.message} value={draft.message} onChange={(event) => updateDraft('message', event.target.value)} disabled={status === 'sending'} /></label>
          <div className="contact-honeypot" aria-hidden="true"><label>Leave this field empty<input name="_honey" type="text" tabIndex={-1} autoComplete="off" value={draft.website} onChange={(event) => updateDraft('website', event.target.value)} /></label></div>
          {error && <p className="contact-error" role="alert">{error}</p>}
          <button type="submit" disabled={status === 'sending'}>{status === 'sending' ? <LoaderCircle className="sending-spinner" size={16} /> : <Send size={16} />}{status === 'sending' ? 'Sending…' : 'Send message'}</button>
          <small id="contact-privacy">Your name, email, and message are sent through FormSubmit to Brian. <a href="https://formsubmit.co/privacy.pdf" target="_blank" rel="noreferrer">Privacy policy</a>.</small>
        </form>
      )}
    </div>
  )
}
