module.exports = async (client, reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch()
    if (reaction.partial) await reaction.fetch()
}
// ce fichier sert à récupérer les messages pour les end/reroll après redémarrage du bot
