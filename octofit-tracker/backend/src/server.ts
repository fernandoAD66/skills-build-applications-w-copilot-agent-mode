import express from 'express'
import mongoose from 'mongoose'

const app = express()
const port = Number(process.env.PORT ?? 8000)
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db'

// Build API base URL for Codespaces and localhost
const getApiBaseUrl = (): string => {
  const codespaceName = process.env.CODESPACE_NAME
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`
  }
  return `http://localhost:${port}`
}

const apiBaseUrl = getApiBaseUrl()

app.use(express.json())

// CORS middleware to handle cross-origin requests
app.use((_request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  next()
})

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    database: mongoose.connection.readyState,
    apiBaseUrl: apiBaseUrl
  })
})

// Sample /api/users endpoint for testing
app.get('/api/users', (_request, response) => {
  response.json({
    users: [
      { id: 1, name: 'Alice', team: 'Team A' },
      { id: 2, name: 'Bob', team: 'Team B' }
    ]
  })
})

// Sample /api/activities endpoint for testing
app.get('/api/activities', (_request, response) => {
  response.json({
    activities: [
      { id: 1, name: 'Running', user: 'Alice', distance: 5 },
      { id: 2, name: 'Swimming', user: 'Bob', distance: 2 }
    ]
  })
})

app.listen(port, () => {
  console.log(`OctoFit API listening on port ${port}`)
  console.log(`API Base URL: ${apiBaseUrl}`)
})

mongoose.connect(mongoUri).catch((error: unknown) => {
  console.error('MongoDB connection failed', error)
})
