const { MessageEmbed } = require("discord.js")
const ms = require("ms")
module.exports.run = (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous devez avoir la permission `MANAGE MESSAGES` pour faire cette commande")
    let Color = message.guild.me.roles.highest.hexColor
    let Host = message.author.id
    let GiveawayChannel = message.mentions.channels.first()
    if(!GiveawayChannel) return message.channel.send("Vous devez mentionner un salon")
    let GiveawayTime = args[1]
    if(!GiveawayTime) return message.channel.send("Vous devez préciser la durée du giveaway")
    if(
        !GiveawayTime.endsWith("d") &&
        !GiveawayTime.endsWith("h") &&
        !GiveawayTime.endsWith("m") &&
        !GiveawayTime.endsWith("s")
    ) return message.channel.send("Vous devez indiquer le temps avec **d**, **h**, **m** ou **s**")
    let winners = args[2]
if(!winners) return message.channel.send("Vous devez préciser un nombre de gagnants")
let price = args.slice(3).join(" ")
if(!price) return message.channel.send("Vous devez préciser un prix")
GiveawayChannel.send("🎉 **GIVEAWAY** 🎉").then((message) => {
    let url = message.url
    message.react("🎉")
    const embed = new MessageEmbed()
    .setColor(Color)
    .setDescription([
        "Host: " + ` <@${Host}>`,
        "Temps: " + ` **${GiveawayTime}**`,
        "Prix: " + ` **${price}**`
    ])
    message.edit(embed)
    setTimeout(() => {
    if(message.reactions.cache.get("🎉").count <= winners){
        console.log("1")
        const embed1 = new MessageEmbed()
    .setColor(Color)
    .setDescription([
        "Pas assez de participants pour établir un gagnant"
    ])
    message.edit(embed1)
    }
    console.log("2")
        var array = []
    var i = winners - 1
    while(array.length <= i){
        let winner = message.reactions.cache.get("🎉").users.cache.filter((u) => !u.bot).random()
        const idx = array.indexOf(winner)
        if(idx > -1){
            array.push(winner)
            array.pop()
            
        } else {
            array.push(winner)
           
        }
        
        const embed2 = new MessageEmbed()
    .setColor(Color)
    .setDescription([
        `${array}`,
        "gagne(nt) " + ` **${price}**`
    ])
    message.edit(embed2)
    message.edit("**🎉 GIVEAWAY FINI 🎉**")
    message.channel.send(`🎊 GG à ${array} qui gagne(nt) **${price}** ${url}`)
        
    }
    

    }, ms(GiveawayTime))
})
}
module.exports.help = {
    name: "start",
    description: "Crée un giveaway",
    args: true,
    usage: "<salon> <durée> <gagnants> <prix>"
}
