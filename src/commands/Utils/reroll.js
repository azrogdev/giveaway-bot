const { MessageEmbed } = require("discord.js")
const ms = require("ms")
module.exports.run = (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous devez avoir la permission `MANAGE MESSAGES` pour faire cette commande")
    let messageID = args[0]
    if(!messageID) return
    const find = message.channel.messages.cache.find(m => m.id === messageID)
    if(!find) return message.channel.send("Giveaway introuvable")
    if(find.author.id != client.user.id) return message.channel.send("Ce message n'est pas de moi")
    if(find.content != "**🎉 GIVEAWAY FINI 🎉**") return message.channel.send("Ce giveaway n'est pas fini")
    let msg = find
    if(msg.reactions.cache.get("🎉").count <= 1) return message.channel.send("Pas assez de participants pour établir un gagnant")
    let winner = msg.reactions.cache.get("🎉").users.cache.filter((u) => !u.bot).random()
    let url = msg.url
    message.channel.send(`🎊 GG à ${winner} qui est le nouveau gagnant ! ${url}`)
}
module.exports.help = {
    name: "reroll",
    description: "Détermine un nouveau gagnant",
    args: true,
    usage: "<message_id>"
}
