import { NextFunction, Request, Response, Router } from 'express'
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js'

const router = Router()

router.get('/users', async (_request, response, next) => {
  try {
    response.json(await User.find().sort({ name: 1 }))
  } catch (error) {
    next(error)
  }
})

router.post('/users', async (request, response, next) => {
  try {
    response.status(201).json(await User.create(request.body))
  } catch (error) {
    next(error)
  }
})

router.get('/teams', async (_request, response, next) => {
  try {
    response.json(await Team.find().populate('members', 'name email').sort({ name: 1 }))
  } catch (error) {
    next(error)
  }
})

router.post('/teams', async (request, response, next) => {
  try {
    response.status(201).json(await Team.create(request.body))
  } catch (error) {
    next(error)
  }
})

router.get('/activities', async (_request, response, next) => {
  try {
    response.json(await Activity.find().populate('user', 'name email').sort({ completedAt: -1 }))
  } catch (error) {
    next(error)
  }
})

router.post('/activities', async (request, response, next) => {
  try {
    response.status(201).json(await Activity.create(request.body))
  } catch (error) {
    next(error)
  }
})

router.get('/leaderboard', async (_request, response, next) => {
  try {
    response.json(await Leaderboard.find().populate('user', 'name email').sort({ points: -1 }))
  } catch (error) {
    next(error)
  }
})

router.get('/workouts', async (_request, response, next) => {
  try {
    response.json(await Workout.find().sort({ difficulty: 1, name: 1 }))
  } catch (error) {
    next(error)
  }
})

router.post('/workouts', async (request, response, next) => {
  try {
    response.status(201).json(await Workout.create(request.body))
  } catch (error) {
    next(error)
  }
})

router.use((error: unknown, _request: Request, response: Response, _next: NextFunction) => {
  console.error(error)
  response.status(400).json({ error: 'Unable to process request' })
})

export default router