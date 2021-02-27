const { Collection } = require("discord.js")

const { PREFIX } = require("../../config")

module.exports = (client, message) => {
    if(!message.content.startsWith(PREFIX) || message.author.bot ) return

    const args = message.content.slice(PREFIX.length).split(/ +/)
    const commandName = args.shift().toLowerCase()

    if(!client.commands.has(commandName)) return
    const command = client.commands.get(commandName)

    if(command.help.args && !args.length) {
        let noArgsReply = `Il faut des arguments pour cette commande ${message.author}`

        if(command.help.usage) noArgsReply += `\n Voici comment utiliser la commande : \`${PREFIX}${command.help.name} ${command.help.usage}\``
        return message.channel.send(noArgsReply)
    }

    command.run(client, message, args)
}
