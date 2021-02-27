module.exports.run = (client, message, args) => {
    message.channel.send("un exemple...!") // code de la commande
}
module.exports.help = {
    name: "exemple", // nom de la commande
    description: "Renvoie un exemple", // description de la commande
    args: false // n'utilise pas d'arguments
}
// Dexuième utilisation : 
module.exports.run = (client, message, args) => {
  if(!args[0]) return
    message.channel.send("un exemple...!" + `args[0]`) // code de la commande
}
module.exports.help = {
    name: "exemple", // nom de la commande
    description: "Renvoie un exemple", // description de la commande
    args: true, // utilise des arguments
    usage: "<id>" // si args = true , il faut spécifier l'usage de la commande
}
