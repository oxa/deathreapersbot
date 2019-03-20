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



        function getDungeonByID(dID) {
            var dungeons_ids =[{"id":1763,"keystone_id":244,"name":"Atal'Dazar","slug":"ataldazar","time":1800999,"score":0.0,"runs":null},{"id":1822,"keystone_id":353,"name":"Siege of Boralus","slug":"siege-of-boralus","time":2160999,"score":0.0,"runs":null},{"id":1594,"keystone_id":247,"name":"The MOTHERLODE!!","slug":"the-motherlode","time":2340999,"score":0.0,"runs":null},{"id":1841,"keystone_id":251,"name":"The Underrot","slug":"the-underrot","time":1980999,"score":0.0,"runs":null},{"id":1877,"keystone_id":250,"name":"Temple of Sethraliss","slug":"temple-of-sethraliss","time":2160999,"score":0.0,"runs":null},{"id":1754,"keystone_id":245,"name":"Freehold","slug":"freehold","time":2160999,"score":0.0,"runs":null},{"id":1862,"keystone_id":248,"name":"Waycrest Manor","slug":"waycrest-manor","time":2340999,"score":0.0,"runs":null},{"id":1771,"keystone_id":246,"name":"Tol Dagor","slug":"tol-dagor","time":2160999,"score":0.0,"runs":null},{"id":1762,"keystone_id":249,"name":"Kings' Rest","slug":"kings-rest","time":2520999,"score":0.0,"runs":null},{"id":1864,"keystone_id":252,"name":"Shrine of the Storm","slug":"shrine-of-the-storm","time":2520999,"score":0.0,"runs":null}]

            for (let dj in dungeons_ids) {
                if ( dID === dungeons_ids[dj]["id"])
                    return dungeons_ids[dj]["name"];
            }
         }

    var url = 'https://api.bestkeystone.com/api/Periode?weeks=1';
    https.get(url, function(res){
        var body = '';
        res.on('data', function(chunk){
            body += chunk;
        });
        res.on('end', function(){
            let raw_json=JSON.parse(body);
            var url = 'https://api.bestkeystone.com/api/Dungeon/leaderboard?periode='+String(raw_json[0]["id"])+'&min_level=10&amount=1000&limitToLowestDungeon=false';

            https.get(url, function(res){
                var body = '';
                res.on('data', function(chunk){
                    body += chunk;
                });
                res.on('end', function(){
                    var mm=JSON.parse(body);

                    message.channel.send({
                        embed: {
                            color: 3447003,
                            fields: [{
                                name: ":new: Meilleurs donjons de la semaine pour ces affixes: ",
                                value: "[1] " + getDungeonByID(mm[0]["id"]) + "\n" +
                                    "[2] " + getDungeonByID(mm[1]["id"]) + "\n" +
                                    "[3] " + getDungeonByID(mm[2]["id"]) + "\n" +
                                    "[4] " + getDungeonByID(mm[3]["id"]) + "\n" +
                                    "[5] " + getDungeonByID(mm[4]["id"]) + "\n"
                            }
                            ],
                            footer: {
                                text: "Powered by : http://bestkeystone.com/",
                            }
                        }
                    });


                });
            }).on('error', function(e){
                console.log("Got an error: ", e);
            });





        });
    }).on('error', function(e){
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
    name: "mm",
    admin: false,

};
