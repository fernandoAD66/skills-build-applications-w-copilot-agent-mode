import express from 'express'
import mongoose from 'mongoose'
import { apiBaseUrl } from './config/api.js'
import activitiesRouter from './routes/activities.js'
import usersRouter from './routes/users.js'

const app = express()
const port = Number(process.env.PORT ?? 8000)
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db'

app.use(express.json())
app.use('/api/users', usersRouter)
app.use('/api/activities', activitiesRouter)

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', database: mongoose.connection.readyState })
})

app.listen(port, () => {
  console.log(`OctoFit API listening at ${apiBaseUrl}`)
})

mongoose.connect(mongoUri).catch((error: unknown) => {
  console.error('MongoDB connection failed', error)
})