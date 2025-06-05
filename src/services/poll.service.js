import Poll from "../models/poll.model.js"
import { NotFoundError, ConflictRequestError } from "../handler/error-response.js"

class PollService {
  async createPoll(data, creatorId) {
    return await Poll.create({ ...data, creator: creatorId })
  }

  async getAllPolls() {
    const polls = await Poll.find().populate('creator', 'username').lean()
    return {
      polls: polls.map(p => ({
        ...p,
        votesCount: p.options.reduce((sum, o) => sum + o.votes, 0)
      })),
      total: polls.length,
      page: 1,
      limit: polls.length
    }
  }

  async getPollById(id) {
    const poll = await Poll.findById(id)
      .populate('creator', 'username')
      .populate('options.userVotes', 'username')

    if (!poll) throw new NotFoundError("Poll not found")

    return {
      ...poll.toObject(),
      totalVotes: poll.options.reduce((sum, o) => sum + o.votes, 0)
    }
  }

  async lockPoll(id) {
    const poll = await Poll.findByIdAndUpdate(id, { isLocked: true }, { new: true })
    if (!poll) throw new NotFoundError("Poll not found")
    return poll
  }

  async unlockPoll(id) {
    const poll = await Poll.findByIdAndUpdate(id, { isLocked: false }, { new: true })
    if (!poll) throw new NotFoundError("Poll not found")
    return poll
  }

  async addOption(pollId, optionText) {
    const poll = await Poll.findById(pollId)
    if (!poll) throw new NotFoundError("Poll not found")
    poll.options.push({ text: optionText })
    await poll.save()
    return poll
  }

  async removeOption(pollId, optionId) {
    const poll = await Poll.findById(pollId)
    if (!poll) throw new NotFoundError("Poll not found")
    poll.options.id(optionId).remove()
    await poll.save()
    return poll
  }

  async vote(pollId, optionId, userId) {
    const poll = await Poll.findById(pollId)
    if (!poll || poll.isLocked) throw new ConflictRequestError("Poll is locked or not found")

    const option = poll.options.id(optionId)
    if (!option) throw new NotFoundError("Option not found")

    if (option.userVotes.includes(userId)) {
      throw new ConflictRequestError("Already voted this option")
    }

    option.votes++
    option.userVotes.push(userId)
    await poll.save()
    return poll
  }

  async unvote(pollId, optionId, userId) {
    const poll = await Poll.findById(pollId)
    if (!poll) throw new NotFoundError("Poll not found")

    const option = poll.options.id(optionId)
    if (!option) throw new NotFoundError("Option not found")

    const index = option.userVotes.indexOf(userId)
    if (index === -1) throw new ConflictRequestError("You haven't voted this option")

    option.votes--
    option.userVotes.splice(index, 1)
    await poll.save()
    return poll
  }
}

export default new PollService()
