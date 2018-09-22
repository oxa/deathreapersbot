exports.run =  (client, message, args) => {
    let alchi = (args[1] === undefined) ? 0 : args[1];
    let raider = (args[0] === undefined) ? 0 : args[0];
    let flasks = (raider - alchi) * 3 + (alchi * 2);
    if (alchi > raider){
        return;
    }
    if (isNaN(flasks)) {
        return;
    }
    let cauldrons = Math.floor(flasks / 30)
    let flasks_to = flasks % 30;
    if (flasks_to >= 12) {
        cauldrons += 1;
    }
    let flasks_left = cauldrons * 30 - flasks
    if (flasks_left < 0) {
        message.channel.send("Il faut craft " + cauldrons + " chaudron(s) et " + flasks_to + " flask(s)");
    } else
        message.channel.send("Il faut craft " + cauldrons + " chaudron(s) " + flasks_left + " flask(s) de rab pour le MM+ ! ");
};

exports.conf = {
  enabled: true,
  aliases: ["chaudrons"],
    name : "chaudron"
};
