exports.run =  (client, message, args) => {
    const https = require("https");
    var url = 'https://raider.io/api/v1/mythic-plus/affixes?region=eu&locale=fr';
    https.get(url, function(res){
        var body = '';
        res.on('data', function(chunk){
            body += chunk;
        });
        res.on('end', function(){
            var mm=JSON.parse(body)
            message.channel.send({embed: {
                    color: 3447003,
                    fields: [{
                        name: "Affixes de la semaine : ",
                        value: "- [lvl 2] ["+mm.affix_details[0].name+"]("+mm.affix_details[0].wowhead_url+") : "+mm.affix_details[0].description+"\n" +
                            "- [lvl 3] ["+mm.affix_details[1].name+"]("+mm.affix_details[1].wowhead_url+") : "+mm.affix_details[1].description+"\n" +
                            "- [lvl 7] ["+mm.affix_details[2].name+"]("+mm.affix_details[2].wowhead_url+") : "+mm.affix_details[2].description+"\n" +
                            "- [lvl 10] ["+mm.affix_details[3].name+"]("+mm.affix_details[3].wowhead_url+") : "+mm.affix_details[3].description+"\n" +
                            "**[Liste des loot par niveau de clé disponible ici](https://fr.wowhead.com/mythic-keystones-and-dungeons-guide#other-gear-item-levels)**"
                    }
                    ],
                }});
        });
    }).on('error', function(e){
        console.log("Got an error: ", e);
    });
};

exports.conf = {
  enabled: true,
  aliases: ["mm+","affixes","affix"],
    name : "mm"
};
