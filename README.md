# Brian's XP Portfolio

A Windows XP-inspired portfolio built with React, TypeScript, Vite, and custom CSS.

## Run locally

```bash
npm install
npm run dev
```

Create a production build with `npm run build`.

## Personalize it

Edit `src/portfolio.ts` to replace the name, bio, contact details, social links,
projects, and skills. All personal content is kept in that single file so the UI
components do not need to be rewritten.

## Contact form

The form submits directly over HTTPS to [FormSubmit](https://formsubmit.co/),
which relays messages to the email in `src/portfolio.ts`. The sender's email is
included as Reply-To. No Gmail password, API key, PHP, or local mail server is
required. The email link still opens an email app, and a copy button is available.

### One-time activation (required)

1. Open the portfolio through `npm run dev`, then open Contact.
2. Submit a short test message using your own sender email.
3. Check **ragasibrian2@gmail.com**, including Spam, for FormSubmit's confirmation
   message and click **Activate Form**.
4. Submit another test and verify receipt, message contents, and Reply-To in Gmail.

Repeat the check on your final deployed URL. A changed email address or form origin
may require confirmation again. Successful API acceptance is not proof of inbox
delivery; the recipient must complete activation and verify receipt.

`src/ContactContent.tsx` handles the form UI, draft retention on failure, a 20-second
timeout, and duplicate-submit prevention. `src/contact.ts` validates input and
handles provider responses. Activation responses are shown separately from accepted
submissions. A failed or timed-out request is not automatically retried.

FormSubmit receives the sender's name, email, and message. The UI discloses this and
links to its privacy policy. A honeypot is included; the integration does not explicitly
disable the provider's default anti-spam settings. Client-side checks are not server-side
rate limiting, so reassess spam protection before a high-traffic public launch.

### Tests

Run `npm test` for validation and API response tests. All requests in these tests
are mocked; they do not send email or activate the form. A real Gmail delivery test
is still needed after owner activation.
