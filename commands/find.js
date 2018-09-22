exports.run =  (client, message, args) => {
    const https = require("https");
    var url = 'https://raider.io/api/v1/characters/profile?region=eu&realm=elune&name='+args[0]+'&fields=gear,mythic_plus_scores';
    https.get(url, function(res){
        var body = '';
        res.on('data', function(chunk){
            body += chunk;
        });
        res.on('end', function(){
            var profile=JSON.parse(body)
            if (profile.statusCode === 400){
                console.log(profile)
                return;
            }

            message.author.send({embed: {
            color: 3447003,
            author: {
              name: "Profils de "+profile.name,
              icon_url: profile.thumbnail_url
            },

            fields: [

                {
                name: "Général",
                value: "Haut-faits : **"+profile.achievement_points+"**\n Ilvl : **"+profile.gear.item_level_equipped+"**\n MM+ score : **"+profile.mythic_plus_scores.all+"**"
            },{
                name: "WarcraftLogs",
                value: "https://www.warcraftlogs.com/character/eu/elune/"+args[0]
            },
                {
                    name: "Raider.io",
                    value: profile.profile_url
                },
                {
                    name: "WoW Armurie",
                    value: "https://worldofwarcraft.com/fr-fr/character/elune/"+args[0]
                },
                {
                    name: "RaidBot simulation",
                    value: "https://www.raidbots.com/simbot/stats?region=eu&realm=elune&name="+args[0]
                },
            ],
        }});

        });
    }).on('error', function(e){
        console.log("Got an error: ", e);
    });
};

exports.conf = {
  enabled: true,
  aliases: ["cherche","wow","profile","profil"],
    name : "find"
};
