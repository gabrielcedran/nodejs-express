import { User } from "@prisma/client"

declare global { 
    namespace Express {
        export interface Request {
            shhhh_secret?: string
            user?: {id: string, username: string}
        }
    }
}

export {}