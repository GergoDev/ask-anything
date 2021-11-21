async function author(parent, args, context, info) {
    const user = await context.prisma.answer.findUnique({ where: { id: parent.id } }).user()
    return user.name
}

function key(parent, args, context, info) {
    return parent.id
}

function question(parent, args, context, info) {
    return context.prisma.answer.findUnique({ where: { id: parent.id } }).question()
}

function user(parent, args, context, info) {
    return context.prisma.answer.findUnique({ where: { id: parent.id } }).user()
}

module.exports = {
    author,
    key,
    question,
    user,
}