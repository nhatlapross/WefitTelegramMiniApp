import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from "next-auth/react"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (session) {
    res.json({
      content: "This is protected content. You can access this content because you are signed in.",
      session: session
    })
  } else {
    res.json({
      content: "You must be signed in to view the protected content on this page."
    })
  }
}