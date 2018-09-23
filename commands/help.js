exports.run = (client, message, args) => {
    const version = require("../package")
    message.author.send({embed: {
            color: 3447003,
            title: "Besoin d'aide ?",
            description: "Voici les commandes que je supporte : ",
            fields: [{
                name: ":new: !logs ou !log",
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
                    name: ":new: !profil <joueur>",
                    value: "Affiche le profile du joueur \n Exemple : !profil Millieharis"
                },
                                {
                    name: ":new: !mm ou !affix",
                    value: "Affiche des infos sur les Mythic+"
                },
                {
                    name: "!help",
                    value: "Affiche ce message"
                },
            ],
            footer: {
                text: "DeathReapers Bot v"+version.version
            }
        }});
};

exports.conf = {
    name:"help",
  enabled: true,
  aliases: [],
};
