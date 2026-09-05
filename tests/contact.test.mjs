import { test } from 'node:test'
import assert from 'node:assert/strict'
import { submitContactMessage, validateContactDraft } from '../src/contact.ts'

const recipient = 'owner@example.com'
const draft = { name: 'Jane Smith', email: 'jane@example.com', message: 'I would like to discuss a web project.', website: '' }
const signal = () => new AbortController().signal
const jsonResponse = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

test('validates required fields, trimmed values, field limits, and the honeypot', () => {
  assert.equal(validateContactDraft(draft), null)
  for (const invalid of [
    { name: '  ' }, { name: 'a'.repeat(101) }, { email: 'no-email' },
    { email: 'user@host\r\nBcc: other@example.com' }, { email: 'x'.repeat(250) + '@example.com' },
    { message: '     ' }, { message: 'short' }, { message: 'x'.repeat(5001) }, { website: 'spam' },
  ]) assert.ok(validateContactDraft({ ...draft, ...invalid }))
})

test('invalid drafts never contact the provider', async () => {
  let called = false
  await assert.rejects(submitContactMessage(recipient, { ...draft, message: ' ' }, signal(), async () => {
    called = true
    return jsonResponse({ success: true })
  }), /between 10 and 5,000/)
  assert.equal(called, false)
})

test('posts trimmed fields, the reply address, and a fixed subject to the correct recipient', async () => {
  const abortSignal = signal()
  const result = await submitContactMessage(recipient, { ...draft, name: '  Jane Smith ', email: ' jane@example.com ', message: '  I have a project idea.  ' }, abortSignal, async (url, options) => {
    assert.equal(url, 'https://formsubmit.co/ajax/owner%40example.com')
    assert.equal(options.method, 'POST')
    assert.equal(options.signal, abortSignal)
    assert.equal(options.headers.Accept, 'application/json')
    assert.deepEqual(JSON.parse(options.body), {
      name: 'Jane Smith', email: 'jane@example.com', message: 'I have a project idea.',
      _replyto: 'jane@example.com', _subject: 'New portfolio contact message', _template: 'table', _honey: '',
    })
    return jsonResponse({ success: true, message: 'Success' })
  })
  assert.equal(result, 'accepted')
})

test('accepts documented boolean-like success responses without treating false strings as true', async () => {
  assert.equal(await submitContactMessage(recipient, draft, signal(), async () => jsonResponse({ success: 'true' })), 'accepted')
  for (const success of [false, 'false', undefined, 1]) {
    await assert.rejects(submitContactMessage(recipient, draft, signal(), async () => jsonResponse({ success })), /did not accept/)
  }
})

test('first-use activation is separate from accepted submission', async () => {
  for (const message of [
    'This form needs Activation. We have sent you an email containing an Activate Form link.',
    'Please confirm your email address.',
    'Verify your email to start receiving submissions.',
  ]) {
    assert.equal(await submitContactMessage(recipient, draft, signal(), async () => jsonResponse({ success: true, message })), 'activation')
  }
})

test('HTTP failures never show success', async () => {
  await assert.rejects(submitContactMessage(recipient, draft, signal(), async () => jsonResponse({}, 429)), /too many requests/)
  await assert.rejects(submitContactMessage(recipient, draft, signal(), async () => jsonResponse({}, 500)), /could not confirm/)
})

test('malformed and empty responses never show success', async () => {
  for (const response of [new Response('<html>Error</html>'), jsonResponse(null), jsonResponse('OK')]) {
    await assert.rejects(submitContactMessage(recipient, draft, signal(), async () => response), /unexpected|could not be confirmed/)
  }
})

test('network failures and aborts propagate without automatically retrying', async () => {
  let calls = 0
  const networkFailure = new TypeError('Failed to fetch')
  await assert.rejects(submitContactMessage(recipient, draft, signal(), async () => { calls++; throw networkFailure }), networkFailure)
  assert.equal(calls, 1)
  const controller = new AbortController()
  controller.abort()
  await assert.rejects(submitContactMessage(recipient, draft, controller.signal, async (_url, options) => {
    options.signal.throwIfAborted()
    return jsonResponse({ success: true })
  }), { name: 'AbortError' })
})
