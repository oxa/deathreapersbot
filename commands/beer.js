exports.run = (client, message, args) => {
    const https = require("https");
    var url = 'https://api.punkapi.com/v2/beers/random';
    https.get(url, function (res) {
        var body = '';

        res.on('data', function (chunk) {
            body += chunk;
        });

        res.on('end', function () {
            var beer = JSON.parse(body)[0]
            console.log(beer);
/*            let houblon="";
            let malt="";
            for (let item in beer.ingredients.malt){
                console.log(beer.ingredients.malt[item]);
                malt+=beer.ingredients.malt[item].name+" : "+beer.ingredients.malt[item].amount.value+" "+beer.ingredients.malt[item].amount.unit;
            }*/


            message.channel.send({embed: {
                color: 3447003,
                author: {
                    name: "Deja vue de la "+beer.name+" ?",
                    icon_url: beer.image_url
                },

                fields: [
                    {
                        name: "Description (dsl Millie) : ",
                        value: String(beer.description)
                    },
                    {
                        name: "Se marie bien avec : ",
                        value: String(beer.food_pairing)
                    },
                    {
                        name: "Details : ",
                        value: "Taux d'alchool : "+String(beer.abv)+"% PH : "+String(beer.ph)
                    },

                ],
            }});
        });
    }).on('error', function (e) {
        console.log("Got an error: ", e);
    });
};

exports.conf = {
  enabled: true,
  aliases: ["beers","beer","biere","binouze"],
  name:"beer",
  admin: false,



};
