exports.run = (client, message, args) => {
    const https = require("https");
    const http = require("http");

    var url = 'https://raider.io/api/v1/mythic-plus/affixes?region=us&locale=fr';
    https.get(url, function (res) {
        var body = '';
        res.on('data', function (chunk) {
            body += chunk;
        });
        res.on('end', function () {
            var mm = JSON.parse(body);
            message.channel.send({
                embed: {
                    color: 3447003,
                    fields: [{
                        name: "Affixes de la semaine : ",
                        value: "[lvl 2] [" + mm.affix_details[0].name + "](" + mm.affix_details[0].wowhead_url + ") : " + mm.affix_details[0].description + "\n" +
                            "[lvl 3] [" + mm.affix_details[1].name + "](" + mm.affix_details[1].wowhead_url + ") : " + mm.affix_details[1].description + "\n" +
                            "[lvl 7] [" + mm.affix_details[2].name + "](" + mm.affix_details[2].wowhead_url + ") : " + mm.affix_details[2].description + "\n" +
                            "[lvl 10] [" + mm.affix_details[3].name + "](" + mm.affix_details[3].wowhead_url + ") : " + mm.affix_details[3].description + "\n" +
                            "**[Liste des loot par niveau de clé disponible ici](https://fr.wowhead.com/mythic-keystones-and-dungeons-guide#other-gear-item-levels)**"
                    }
                    ],
                }
            });

            let affixes = "";
            for (let affix in mm.affix_details) {
                affixes += "Affixes=" + mm.affix_details[affix].id + "&";
            }

            http.get("http://bestkeystone.com:8888/api/keystonedata/GetAffix?" + affixes, function (res) {
                var body = '';
                res.on('data', function (chunk) {
                    body += chunk;
                });
                res.on('end', function () {
                    var mm = JSON.parse(body);
                    message.channel.send({
                        embed: {
                            color: 3447003,
                            fields: [{
                                name: ":new: Meilleurs donjons de la semaine pour ces affixes: ",
                                value: "[1] " + mm.dungeons[0].name + "\n" +
                                    "[2] " + mm.dungeons[1].name + "\n" +
                                    "[3] " + mm.dungeons[2].name + "\n" +
                                    "[4] " + mm.dungeons[3].name + "\n" +
                                    "[5] " + mm.dungeons[4].name + "\n"
                            }
                            ],
                        }
                    });
                });
            }).on('error', function (e) {
                console.log("Got an error: ", e);
            });
        });
    }).on('error', function (e) {
        console.log("Got an error: ", e);
    });


};

exports.conf = {
    enabled: true,
    aliases: ["mm+", "affixes", "affix"],
    name: "mm"
};
