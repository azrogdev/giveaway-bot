// Première utilisation
module.exports.run = (client, message, args) => {
    message.channel.send("un exemple...!") // code de la commande
}
module.exports.help = {
    name: "exemple1", // nom de la commande
    description: "Renvoie le premier exemple", // description de la commande
    args: false // n'utilise pas d'arguments
}
