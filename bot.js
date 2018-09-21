const Discord = require("discord.js");
const config = require("./auth.json");
const client = new Discord.Client();
const https = require("https");

client.on("ready", () => {
  console.log("DeathReapers Bot is up");
});


client.on("message", (message) => {
  if (!message.content.startsWith(config.prefix)) {
   return; 
  }
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if (command=="log") {
    message.channel.send("https://www.warcraftlogs.com/guild/calendar/381517/");
  } else
  if (command=="rank"){
        var url = 'https://www.wowprogress.com/guild/eu/elune/DeathReapers/json_rank';

        https.get(url, function(res){
            var body = '';

            res.on('data', function(chunk){
                body += chunk;
            });

            res.on('end', function(){
                var rank=JSON.parse(body)
                var answer="On est "+rank.realm_rank+"eme du serveur !"
                message.channel.send(answer+" : https://www.wowprogress.com/guild/eu/elune/DeathReapers");
            });
        }).on('error', function(e){
              console.log("Got an error: ", e);
        });
  }else
  if (command=="help"){
      message.author.send({embed: {
    color: 3447003,
    title: "Besoin d'aide ?",
    description: "Voici les commandes que je supporte pour l'instant : ",
    fields: [{
        name: "!log",
        value: "Affiche un lien vers le Warcraftlogs de la guilde"
      },
      {
        name: "!rank",
        value: "Affiche le classement de la guilde"
      },
    {
        name: "!help",
        value: "Affiche ce message"
      },
    ],
    }});
  }

});

client.login(config.token);