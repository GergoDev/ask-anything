function feedQuestions(parent, args, context, info) {
    return context.prisma.question.findMany()
}

function feedQuestion(parent, args, context, info) {
    return context.prisma.question.findUnique({
        where: { id: Number(args.id) }
    })
}

function getUser(parent, args, context, info) {
    const { userId } = context

    if(!userId)
        throw new Error('Not logged in!')

    return context.prisma.user.findUnique({
        where: { id: userId }
    })
}

module.exports = {
    feedQuestions,
    feedQuestion,
    getUser,
}