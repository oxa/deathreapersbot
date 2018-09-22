exports.run = (client, message, args) => {
    const https = require("https");
    var url = 'https://www.wowprogress.com/guild/eu/elune/DeathReapers/json_rank';
    https.get(url, function (res) {
        var body = '';

        res.on('data', function (chunk) {
            body += chunk;
        });

        res.on('end', function () {
            var rank = JSON.parse(body)
            var answer = "On est " + rank.realm_rank + "eme du serveur !"
            message.channel.send(answer + " : https://www.wowprogress.com/guild/eu/elune/DeathReapers");
        });
    }).on('error', function (e) {
        console.log("Got an error: ", e);
    });
};

exports.conf = {
  enabled: true,
  aliases: ["ranks"],
    name:"rank"
};
