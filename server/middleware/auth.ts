import type { NextApiRequest, NextApiResponse } from "next"
import jwt from "jsonwebtoken"

export interface AuthenticatedRequest extends NextApiRequest {
  user?: {
    id: number
    username: string
  }
}

export function authMiddleware(handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<void>) {
  return async (req: AuthenticatedRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
      return res.status(401).json({ error: "未提供认证令牌" })
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number; username: string }
      req.user = decoded
      return handler(req, res)
    } catch (error) {
      return res.status(401).json({ error: "无效的认证令牌" })
    }
  }
}

