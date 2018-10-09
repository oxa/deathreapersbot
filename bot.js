const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();
const {promisify} = require('util');
const readdir = promisify(require("fs").readdir);
const https = require("https");
const Enmap = require("enmap");

client.commands = new Enmap();
client.aliases = new Enmap();
client.raiders = new Enmap();

client.loadCommand = (commandName) => {
    try {
        console.log(`Loading Command: ${commandName}`);
        const props = require(`./commands/${commandName}`);
        if (props.init) {
            props.init(client);
        }
        client.commands.set(props.conf.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.conf.name);
        });
        return false;
    } catch (e) {
        return `Unable to load command ${commandName}: ${e}`;
    }
};

const init = async () => {

    const cmdFiles = await readdir("./commands/");
    console.log(`Loading a total of ${cmdFiles.length} commands.`);
    cmdFiles.forEach(f => {
        if (!f.endsWith(".js")) return;
        const response = client.loadCommand(f);
        if (response) console.log(response);
    });


    client.on("ready", () => {
        if (client.user.id==="491592769588953088"){
            console.log("DeathReapers Beta is UP")
        } else {
            console.log("DeathReapers Prod is UP")
        }
        try {
            client.users.get("121522123910021120").send("I'm UP and running");
            client.user.setActivity('!aide pour me parler', { type: 'WATCHING' });
                var url = 'https://eu.api.battle.net/wow/guild/Elune/DeathReapers?fields=members&locale=en_GB&apikey='+process.env.BLIZZ_KEY;
            https.get(url, function (res) {
                var body = '';
                res.on('data', function (chunk) {
                    body += chunk;
                });
                res.on('end', function () {
                    var members_raw = JSON.parse(body);
                    for (let id in members_raw.members) {
                        if (members_raw.members[id].rank <= 4 && members_raw.members[id].character.level === 120) {
                            client.raiders.set(members_raw.members[id].character.name, {});
                        }
                    }
                    console.log("Imported : "+client.raiders.keyArray().length+" guild members");
                    //let members=client.guilds.get('492764538857324544').members;
                    //for (let member in members){
                    //    console.log(client.guilds.get('492764538857324544').members.get(member));
                    //}
                });
            }).on('error', function (e) {
                console.log("Got an error: ", e);
            });

        }
        catch(error) {
            console.error(error);

        }
    });

    client.on("message", message => {
        if (message.author.bot) return;
        //TODO:review usage of this block
        const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
        if (message.content.match(prefixMention)) {
            return message.reply(`Utilise \`${config.prefix}\` pour me parler`);
        }
        // end of block
        if (message.content.indexOf(config.prefix) !== 0) return;

        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        console.log(message.author.username+" : "+message.content)

        const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
        if (!cmd) {
            message.author.send("Heu... je sens que tu veux me dire quelque chose mais tu galères... Tape : !aide pour avoir un coup de main");
            return;
        }
        cmd.run(client, message, args);

    });

    client.on("guildMemberAdd", member => {
        member.send({embed: {
                    color: 3447003,
                    fields: [
                        {
                            name: "Bienvenue chez DeathReapers !",
                            value: "Que tu sois un membre ou de passage sois le bienvenue ! Merci de respecter la charte de guilde. "
                        },
                       {
                            name: "De passage ?",
                            value: "Le cannal textuel **#public** et les cannaux vocaux **#donjons** te sont ouverts !\n Bon jeux parmis nous ! "
                        },
                       {
                            name: ":new: DeathReapers Recrute !",
                            value: "DeathReapers est toujours à la recherche de joueurs motivés ! \n/w Préludix, Millieharis, Naturiel ou rendez-vous sur [wowprogress](https://www.wowprogress.com/guild/eu/elune/deathReapers) pour plus d'infos"
                        },
                        {
                            name: "De l'aide ?",
                            value: "!aide pour plus d'infos sur le bot"
                        },
                    ],
                }});
    });

    client.on('error', console.error);

    client.login(process.env.BOT_TOKEN);
};

init();