function key(parent, args, context, info) {
    return parent.id
}

function voteCount(parent, args, context, info) {
    return context.prisma.vote.count({ where: { questionId: parent.id } })
}

function votes(parent, args, context, info) {
    return context.prisma.question.findUnique({ where: { id: parent.id } }).votes()
}

function answers(parent, args, context, info) {
    return context.prisma.question.findUnique({ where: { id: parent.id } }).answers()
}

function user(parent, args, context, info) {
    return context.prisma.question.findUnique({ where: { id: parent.id } }).user()
}

module.exports = {
    key,
    voteCount,
    votes,
    answers,
    user,
}