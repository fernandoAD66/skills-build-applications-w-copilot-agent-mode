import { Router } from 'express'
import { Activity } from '../models/Activity.js'

const router = Router()

router.get('/', async (_request, response) => {
  try {
    response.json(await Activity.find().sort({ completedAt: -1 }).lean())
  } catch (error: unknown) {
    console.error('Failed to load activities', error)
    response.status(500).json({ error: 'Failed to load activities' })
  }
})

export default router