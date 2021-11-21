const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET } = require('../utils')

async function signup(parent, args, context, info) {
    const password = await bcrypt.hash(args.password, 10)
  
    const user = await context.prisma.user.create({ data: { ...args, password } })

    const token = jwt.sign({ userId: user.id }, APP_SECRET)
  
    return {
        token,
        user,
    }
}

async function login(parent, args, context, info) {
    const user = await context.prisma.user.findUnique({ where: { email: args.email } })
    if (!user) {
      throw new Error('No such user found')
    }
  
    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
      throw new Error('Invalid password')
    }
  
    const token = jwt.sign({ userId: user.id }, APP_SECRET)
  
    return {
        token,
        user,
    }
}

async function postQuestion(parent, args, context, info) {
    const { userId } = context;

    if (!userId)
        throw new Error(`Not logged in!`)

    const newQuestion =  await context.prisma.question.create({
        data: {
            title: args.title,
            message: args.message,
            view: 0,
            user: { connect: { id: userId } },
        }
    })

    return newQuestion
}

async function updateQuestion(parent, args, context) {
    const { userId } = context;

    if (!userId)
        throw new Error(`Not logged in!`)
    
    const updatedQuestion = await context.prisma.question.update({
        where: { id: Number(args.id) },
        data: {
            title: args.title,
            message: args.message
        }
    })

    return updatedQuestion
}

async function deleteQuestion(parent, args, context) {
    const { userId } = context;

    if (!userId)
        throw new Error(`Not logged in!`)
    
    const deleteVotes = await context.prisma.vote.deleteMany({
        where: { questionId: Number(args.id) }
    })

    const deleteAnswers = await context.prisma.answer.deleteMany({
        where: { questionId: Number(args.id) }
    })

    const deletedQuestion = await context.prisma.question.delete({
        where: { id: Number(args.id) }
    })

    return deletedQuestion
}

async function vote(parent, args, context, info) {
    const userId = context.userId
  
    const vote = await context.prisma.vote.findUnique({
        where: {
                questionId_userId: {
                questionId: Number(args.questionId),
                userId: userId
            }
        }
    })
  
    if (Boolean(vote)) {
        throw new Error(`Already voted for the question!`)
    }
  
    const newVote = context.prisma.vote.create({
        data: {
            user: { connect: { id: userId } },
            question: { connect: { id: Number(args.questionId) } },
        }
    })
  
    return newVote
}

async function addView(parent, args, context, info) {
    const question = await context.prisma.question.findUnique({
        where: { id: Number(args.questionId) }
    })

    const updatedQuestion = await context.prisma.question.update({
        where: { id: Number(args.questionId) },
        data: {
            view: question.view + 1,
        }
    })

    return updatedQuestion
}

async function postAnswer(parent, args, context, info) {
    const { userId } = context;

    if (!userId)
        throw new Error(`Not logged in!`)

    const newAnswer =  await context.prisma.answer.create({
        data: {
            content: args.content,
            avatar: args.avatar,
            user: { connect: { id: userId } },
            question: { connect: { id: Number(args.questionId) } },
        }
    })

    return newAnswer
}

async function updateAnswer(parent, args, context, info) {
    const { userId } = context;

    if (!userId)
        throw new Error(`Not logged in!`)

    const updatedAnswer =  await context.prisma.answer.update({
        where: { id: Number(args.id) },
        data: {
            text: args.text,
        }
    })

    return updatedAnswer
}

async function deleteAnswer(parent, args, context, info) {
    const { userId } = context;

    if (!userId)
        throw new Error(`Not logged in!`)

    const deletedAnswer =  await context.prisma.answer.delete({
        where: { id: Number(args.id) },
    })

    return deletedAnswer
}

module.exports = {
    signup,
    login,
    postQuestion,
    updateQuestion,
    deleteQuestion,
    vote,
    addView,
    postAnswer,
    updateAnswer,
    deleteAnswer,
}