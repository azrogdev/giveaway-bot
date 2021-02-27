const { Client, Collection } = require("discord.js")
const { readdirSync } = require("fs")

const { TOKEN, PREFIX } = require("./config")

const client = new Client()
client.commands = new Collection()
const LoadCommands = (dir = "./commands/") => {
    readdirSync(dir).forEach(dirs => {
        const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"))

        for (const file of commands) {
            const getFileName = require(`${dir}/${dirs}/${file}`)
            client.commands.set(getFileName.help.name, getFileName)
            console.log(`Commande chargée: ${getFileName.help.name}`)
        }
    })
}
LoadCommands()
client.on('message', message => {
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
})

client.login(TOKEN)
