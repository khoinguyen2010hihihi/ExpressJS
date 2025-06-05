import express from 'express'
import pollController from '../controllers/poll.controller.js'
import asyncHandler from '../middleware/asyncHandle.js'
import { authMiddleware, isAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.use(authMiddleware)

router.get('/', asyncHandler(pollController.getAllPolls))
router.get('/:id', asyncHandler(pollController.getPollById))
router.post('/', isAdmin, asyncHandler(pollController.createPoll))
router.post('/:id/lock', isAdmin, asyncHandler(pollController.lockPoll))
router.post('/:id/unlock', isAdmin, asyncHandler(pollController.unlockPoll))
router.post('/:id/add-option', isAdmin, asyncHandler(pollController.addOption))
router.post('/:id/remove-option', isAdmin, asyncHandler(pollController.removeOption))

router.post('/:id/vote', asyncHandler(pollController.vote))
router.post('/:id/unvote', asyncHandler(pollController.unvote))

export default router
