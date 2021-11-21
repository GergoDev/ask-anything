function questions(parent, args, context) {
    return context.prisma.user.findUnique({ where: { id: parent.id } }).questions()
}

function answers(parent, args, context) {
    return context.prisma.user.findUnique({ where: { id: parent.id } }).answers()
}

function votes(parent, args, context) {
    return context.prisma.user.findUnique({ where: { id: parent.id } }).votes()
}

module.exports = {
    questions,
    answers,
    votes,
}