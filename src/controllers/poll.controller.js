import pollService from '../services/poll.service.js'
import { OK, CREATED } from '../handler/success-response.js'

class PollController {
  createPoll = async (req, res) => {
    const poll = await pollService.createPoll(req.body, req.user.id)
    res.status(201).json(new CREATED({
      message: "Poll created successfully",
      metadata: poll
    }))
  }

  getAllPolls = async (req, res) => {
    const result = await pollService.getAllPolls()
    res.status(200).json(new OK({
      message: "Get all polls successfully",
      metadata: result
    }))
  }

  getPollById = async (req, res) => {
    const poll = await pollService.getPollById(req.params.id)
    res.status(200).json(new OK({
      message: "Get poll successfully",
      metadata: poll
    }))
  }

  lockPoll = async (req, res) => {
    const poll = await pollService.lockPoll(req.params.id)
    res.status(200).json(new OK({
      message: "Poll locked",
      metadata: poll
    }))
  }

  unlockPoll = async (req, res) => {
    const poll = await pollService.unlockPoll(req.params.id)
    res.status(200).json(new OK({
      message: "Poll unlocked",
      metadata: poll
    }))
  }

  addOption = async (req, res) => {
    const poll = await pollService.addOption(req.params.id, req.body.text)
    res.status(200).json(new OK({
      message: "Option added",
      metadata: poll
    }))
  }

  removeOption = async (req, res) => {
    const poll = await pollService.removeOption(req.params.id, req.body.optionId)
    res.status(200).json(new OK({
      message: "Option removed",
      metadata: poll
    }))
  }

  vote = async (req, res) => {
    const poll = await pollService.vote(req.params.id, req.body.optionId, req.user.id)
    res.status(200).json(new OK({
      message: "Voted successfully",
      metadata: poll
    }))
  }

  unvote = async (req, res) => {
    const poll = await pollService.unvote(req.params.id, req.body.optionId, req.user.id)
    res.status(200).json(new OK({
      message: "Unvoted successfully",
      metadata: poll
    }))
  }
}

export default new PollController()