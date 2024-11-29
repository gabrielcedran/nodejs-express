import express from 'express'
import router from './router'
import morgan from 'morgan';
import cors from 'cors';
import { authenticate } from './modules/auth';
import { createUser, signIn } from './handlers/user';

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use((req, res, next) => {
    req.shhhh_secret = 'donbob';
    next();
})

app.get('/', (req, res) => {
    res.status(200)
    res.json({ourSecret: req.shhhh_secret})
})

app.use('/api', authenticate, router)

app.post('/user', createUser)
app.post('/sign-in', signIn)

// this wouldn't apply to sub routers, as it would sit before the sub routers handlers
// it'd be necessary to have it attached at subrouter level.
app.use(((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err.type === 'auth') {
        res.status(401).json({message: "unauthorized"})
    } else if (err.type === 'input') {
        res.status(400).json({message: "invalid input"})
    } else {
        res.status(500).json({message: "oops, something unexpected happened"})
    }
}) as express.ErrorRequestHandler)

export default app