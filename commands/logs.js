exports.run = (client, message, args) => {
    const https = require("https");
    var url = ' https://www.warcraftlogs.com:443/v1/reports/guild/DeathReapers/elune/EU?api_key=7538252618cdc752f67c78ff1c7612f1';
    https.get(url, function(res){
        var body = '';
        res.on('data', function(chunk){
            body += chunk;
        });
        res.on('end', function(){
            var reports=JSON.parse(body);
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
                        {
                            name:"Optimisation du Raid",
                            value:"https://www.wipefest.net/report/"+reports[0].id+"\nhttps://wowanalyzer.com/report/"+reports[0].id
                        }
                    ],
                }});
        });
    }).on('error', function(e){
        console.log("Got an error: ", e);
    });
};

exports.conf = {
    name:"logs",
    enabled: true,
    aliases: ["log"],
    admin: false,

};
