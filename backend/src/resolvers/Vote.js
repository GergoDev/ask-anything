function user(parent, args, context) {
    return context.prisma.vote.findUnique({ where: { id: parent.id } }).user()
}
  
function question(parent, args, context) {
    return context.prisma.vote.findUnique({ where: { id: parent.id } }).question()
}
  
module.exports = {
    user,
    question
}