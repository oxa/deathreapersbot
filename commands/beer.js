exports.run = (client, message, args) => {
    const https = require("https");
    var url = 'https://api.punkapi.com/v2/beers/random';
    https.get(url, function (res) {
        var body = '';

        res.on('data', function (chunk) {
            body += chunk;
        });

        res.on('end', function () {
            var beer = JSON.parse(body)
            message.author.send({embed: {
                color: 3447003,
                author: {
                    name: "Hey tu as bue "+beer.name+" ?",
                    icon_url: beer.image_url
                },

                fields: [

                    {
                        name: "Se marie bien avec : ",
                        value: beer.food_paring
                    },
                    {
                        name: "Le commentaire du connaisseur ",
                        value: beer.brewers_tips
                    },
                    {
                        name: "Taux d'alchool",
                        value: beer.abv
                    },
                    {
                        name: "Description (dsl Millie)",
                        value: beer.description
                    }
                ],
            }});
        });
    }).on('error', function (e) {
        console.log("Got an error: ", e);
    });
};

exports.conf = {
  enabled: true,
  aliases: ["beers","beer","biere","bière","binouze"],
  name:"beer",
  admin: false,



};
