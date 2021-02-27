const { Client, Collection } = require("discord.js")
const { readdirSync } = require("fs")
const { get } = require("http")
const { TOKEN, PREFIX } = require("./config")

const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
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

const LoadEvents = (dir = "./events/") => {
    readdirSync(dir).forEach(dirs => {
        const events = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"))

        for (const event of events) {
            const evt = require(`${dir}/${dirs}/${event}`)
            const evtName = event.split(".")[0]
            client.on(evtName, evt.bind(null, client))
            console.log("Evenement chargé: " + ` ${evtName}`)
        }
    })
}


LoadCommands()
LoadEvents()

client.login(TOKEN)
