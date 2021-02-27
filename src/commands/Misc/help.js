const { MessageEmbed } = require("discord.js")
module.exports.run = (client, message, args) => {
    let Color = message.guild.me.roles.highest.hexColor
    const embed = new MessageEmbed()
    .setColor(Color)
    .setDescription([
        "**Giveaway**",
        "`start`, `reroll`",
        "\u200b",
        "**Utile**",
        "`help`"
    ])
    message.channel.send(embed)
}
module.exports.help = {
    name: "help",
    description: "Renvoie le menu d'aide",
    args: false
}
