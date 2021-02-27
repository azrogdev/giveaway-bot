// Dexuième utilisation : 
module.exports.run = (client, message, args) => {
  if(!args[0]) return
    message.channel.send("un exemple...!" + ` ${args[0]}`) // code de la commande
}
module.exports.help = {
    name: "exemple2", // nom de la commande
    description: "Renvoie le deuxième exemple", // description de la commande
    args: true, // utilise des arguments
    usage: "<test>" // si args = true , il faut spécifier l'usage de la commande
}
