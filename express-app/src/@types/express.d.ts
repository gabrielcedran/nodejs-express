
declare global { 
    namespace Express {
        export interface Request {
            shhhh_secret?: string
        }
    }
}

export {}