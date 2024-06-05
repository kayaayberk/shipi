import { auth } from '@/auth'
import MagicLinkEmail from '@/components/EmailTemplates/magic-link'
import { env } from '@/env'
import { Resend } from 'resend'

const resend = new Resend(env.RESEND_API_KEY)

export async function POST(req: Request) {
  const body = await req.json()
  const { host, url, to } = body
  const session = await auth()

  if (!to) {
    return Response.json({ error: 'No email found' }, { status: 400 })
  }
  if (!host) {
    return Response.json({ error: 'No host found' }, { status: 400 })
  }
  if (!url) {
    return Response.json({ error: 'No url found' }, { status: 400 })
  }
//   if (!image) {
//     return Response.json({ error: 'No image found' }, { status: 400 })
//   }
//   if (!name) {
//     return Response.json({ error: 'No name found' }, { status: 400 })
//   }
  try {
    const { data, error } = await resend.emails.send({
      from: env.RESEND_FROM,
      to: to,
      subject: 'Your Magic Link to Shipi!',
      react: MagicLinkEmail({ url, host })
    })

    if (error) {
      return Response.json({ error }, { status: 500 })
    }

    return Response.json(data)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
