import express from 'express'
import router from './router'
import morgan from 'morgan';
import cors from 'cors';

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

app.use('/api', router)

export default app