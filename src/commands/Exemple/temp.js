const { Giveaway } = require("discord-giveaways");
const { MessageEmbed } = require("discord.js")
const { MESSAGES } = require("../../Util/constants")
const bdd = require("../Data/bdd.json")
const db = require("../Data/giveaway.json")
const fs = require("fs")
const ms = require("ms")
const { COLOR } = require("../../config");
const message = require("../../events/client/message");
module.exports.run = (client, message, args) => {
    function Savedb() {
        fs.writeFile("./commands/Data/giveaway.json", JSON.stringify(db, null, 4), (err) => {
            if (err) console.log("Une erreur est survenue");
        });
    }
   
    if(bdd[message.guild.id]["role"] == 0){
        if(!message.member.hasPermission('MANAGE_MESSAGE')) return message.channel.send("<a:non:801454094765391902> ➜ Vous devez avoir la permission `Gérer les messages`")
    } else {
        if(!bdd[message.guild.id]["role"] == 0){
            if(!message.member.roles.cache.has(bdd[message.guild.id]["role"])) return message.channel.send("<a:non:801454094765391902> ➜ Vous n'avez pas le rôle nécessaire")
        }
    } 
   
  let gchannel = message.mentions.channels.first();
  if (!gchannel) return message.channel.send("<a:non:801454094765391902> ➜ Vous devez mentionner un salon")
  let Durée = args[1]
  console.log(args[1])
  if(!Durée) return message.channel.send("<a:non:801454094765391902> ➜ Vous devez indiquer une durée ")
    if(
        !args[1].endsWith("d") &&
        !args[1].endsWith("h") &&
        !args[1].endsWith("m") &&
        !args[1].endsWith("s") 
    ) return message.channel.send("<a:non:801454094765391902> ➜ Vous devez utiliser **d(jours)**, **h(heures)**, **m(minutes)** et **s(secondes)**")
    if(args[1].length > 3) return message.channel.send("<a:non:801454094765391902> ➜ Vous ne pouvez que mettre deux chiffres dans la durée")
  const NumberWinners = args[2]
  if(!args[2]) return message.channel.send("<a:non:801454094765391902> ➜ Vous devez indiquer un nombre de gagnants")
  if(isNaN(args[2])) return message.channel.send("<a:non:801454094765391902> ➜ Vous devez indiquer un nombre de gagnants")

  let prize = args.slice(3).join(" ")
  if (!prize) return message.channel.send('<a:non:801454094765391902> ➜ Vous devez indiquer un prix')

  


      const Author = message.member.id
      const Prize = args.slice(3).join(" ")
      gchannel.send("<:giftbox:815609211588837376> **GIVEAWAY** <:giftbox:815609211588837376>").then(async (message) => {
        if(args[1].endsWith("d")){
                
            TIMING = args[1].substring(Math.floor(args[1].length / args[1].length - 1), args[1].length - 1) * 86400
    } else {
        if(args[1].endsWith("h")){
            TIMING = args[1].substring(Math.floor(args[1].length / args[1].length - 1), args[1].length - 1) * 3600
        } else {
            if(args[1].endsWith("m")){
                TIMING = args[1].substring(Math.floor(args[1].length / args[1].length - 1), args[1].length - 1) * 60
            } else {
                if(arg[0].endsWith("s")){
                    TIMING = args[1].substring(Math.floor(args[1].length / args[1].length - 1), args[1].length - 1) * 1
                }
            }
        }
    }
    let time = TIMING * 1000
        let url = message.url
        if(!db[message.guild.id]){
            db[message.guild.id] = {}
        }
        db[message.guild.id][message.id] = {}
        db[message.guild.id][message.id]["end"] = false
        db[message.guild.id][message.id]["author"] = Author
        db[message.guild.id][message.id]["prize"] = Prize
        db[message.guild.id][message.id]["requirement"] = 111
        db[message.guild.id][message.id]["time"] = message.createdTimestamp + time
        Savedb()

        const embed = new MessageEmbed()
.setColor(COLOR)
.setDescription([
  "<:giftbox:815609211588837376> Prix » " + ` **${Prize}**`,
  '\u200b',
  "<:deadline:815609171230982206> Temps restant » " + ` **[Timer](https://iparty.com)**`,
  "<:diamond:815704100461215805> Host » " + `<@${Author}>`,
  "<:medal:807231247004467231> Gagnant(s) » " + `**${NumberWinners}**`,
  '\u200b',
  "<:require:817476944949149737> Conditions » **Aucune**"])
  .setTimestamp(message.createdTimestamp + time)
  if(!message.editable) return
        message.edit(embed)
    
    
   
    
    
  message.react("815609211588837376")
  setTimeout(() => {
      if(db[message.guild.id][message.id]["end"] == true) return
    if(message.deleted) return
    message.edit("<:giftbox:815609211588837376> **GIVEAWAY FINI** <:giftbox:815609211588837376>")
    if(message.deleted) return
    const embeds = new MessageEmbed()
    .setColor(COLOR)
    .setDescription([
        "<:giftbox:815609211588837376> Prix » " + ` **${Prize}**`,
        '\u200b',
        "**Giveaway annulé, pas assez de participant**",
        "<:diamond:815704100461215805> Host » " + `<@${Author}>`,
        "<:medal:807231247004467231> Gagnant(s) » " + `**Aucun**`,
        '\u200b',
        "<:require:817476944949149737> Conditions » **Aucune**"])
    
              if(message.reactions.cache.get("815609211588837376").count <= NumberWinners) {
                if(!message.editable) return
                message.edit("<:giftbox:815609211588837376> **GIVEAWAY ANNULE** <:giftbox:815609211588837376>")
            return message.edit(embeds)
            db[message.guild.id][message.id]["end"] = true 
        Savedb()
        } else {
            var array = []
    var i = NumberWinners - 1
    while(array.length <= i){
        let winner = message.reactions.cache.get("815609211588837376").users.cache.filter((u) => !u.bot).random()
        const idx = array.indexOf(winner)
        if(idx > -1){
            array.push(winner)
            array.pop()
            console.log(array)
        } else {
            array.push(winner)
            console.log(array)
        }
        
    }
    if(NumberWinners < 2){
        const embed2 = new MessageEmbed()
        .setColor(COLOR)
        .setDescription([
            `${array}`,
            "gagne " + ` **${prize}**`
        ])
        message.edit(embed2)
        gchannel.send(`🎊 GG à ${array} qui gagne **${prize}** ${url}`)
    } else {
        const embed2 = new MessageEmbed()
    .setColor(COLOR)
    .setDescription([
        `${array}`,
        "gagnent " + ` **${prize}**`
    ])
    message.edit(embed2)
    gchannel.send(`🎊 GG à ${array} qui gagnent **${prize}** ${url}`)
    }
    
        }
    
        db[message.guild.id][message.id]["end"] = true 
        Savedb()
        
  }, ms(args[1]));

      })
}
module.exports.help = MESSAGES.COMMANDS.MISC.START
