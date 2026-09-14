import express from 'express'
import mongoose from 'mongoose'
import { connectDatabase } from './config/database.js'
import apiRouter from './routes/api.js'

const app = express()
const port = Number(process.env.PORT ?? 8000)

app.use(express.json())
app.use('/api', apiRouter)

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', database: mongoose.connection.readyState })
})

async function startServer(): Promise<void> {
  try {
    await connectDatabase()
    app.listen(port, () => {
      const codespaceName = process.env.CODESPACE_NAME
      const baseUrl = codespaceName
        ? `https://${codespaceName}-8000.app.github.dev`
        : `http://localhost:${port}`
      console.log(`OctoFit API listening at ${baseUrl}`)
    })
  } catch (error: unknown) {
    console.error('MongoDB connection failed', error)
    process.exitCode = 1
  }
}

startServer()