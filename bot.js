const Discord = require("discord.js");
const config = require("./config.json");
const version = require("./package")
const client = new Discord.Client();
const https = require("https");

client.on("ready", () => {
    console.log("DeathReapers Bot is up");
});


client.on("message", (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) {
        return;
    }
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (command=="log" || command=="logs") {
        var url = ' https://www.warcraftlogs.com:443/v1/reports/guild/DeathReapers/elune/EU?api_key=7538252618cdc752f67c78ff1c7612f1';
        https.get(url, function(res){
            var body = '';
            res.on('data', function(chunk){
                body += chunk;
            });
            res.on('end', function(){
                var reports=JSON.parse(body)
                message.channel.send({embed: {
                        color: 3447003,
                        fields: [{
                            name: "Calendrier : ",
                            value: "https://www.warcraftlogs.com/guild/calendar/381517/"
                        },
                            {
                                name: "Dernier Raid",
                                value: "https://www.warcraftlogs.com/reports/"+reports[0].id
                            },
                        ],
                    }});
            });
        }).on('error', function(e){
            console.log("Got an error: ", e);
        });
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
    } else
    if (command=="version" & message.author.username=="Oxa"){
        message.author.send("v1.0.0b")
    }else
    if (command=="chaudrons" || command=="chaudron"){
        let alchi = (args[1] === undefined) ? 0 : args[1];
        let raider = (args[0] === undefined) ? 0 : args[0];
        let flasks=(raider-alchi)*3+(alchi*2);
        if (isNaN(flasks)){
            return;
        }
        let cauldrons= Math.floor(flasks/30)
        let flasks_to= flasks % 30;
        if (flasks_to>=12){
            cauldrons+=1;
        }
        let flasks_left=cauldrons*30-flasks
        if (flasks_left<0){
            message.channel.send("Il faut craft "+cauldrons+" chaudron(s) et "+flasks_to+" flask(s)");
        }else
            message.channel.send("Il faut craft "+cauldrons+" chaudron(s) "+flasks_left+" flask(s) de rab pour le MM+ ! ");

    }else
    if (command=="help"){
        message.author.send({embed: {
                color: 3447003,
                title: "Besoin d'aide ?",
                description: "Voici les commandes que je supporte pour l'instant : ",
                fields: [{
                    name: "!log ou !logs",
                    value: "Affiche un lien vers les Warcraftlogs de la guilde"
                },
                    {
                        name: "!rank",
                        value: "Affiche le classement de la guilde"
                    },
                    {
                        name: "!chaudron <nb de raiders> <nb d'alchis>",
                        value: "Affiche le nombre de chaudrons/flasks pour un raid de 3h\n Exemple : !chaudron 20 4"
                    },
                    {
                        name: "!help",
                        value: "Affiche ce message"
                    },
                ],
                    footer: {
      text: "DeathReapers v"+version.version
    }
            }});
    }
    else
        message.author.send("Heu... je sens que tu veux me dire quelque chose mais tu galères... Tapes : !help pour avoir un coups de mains");



});

client.login(config.token);