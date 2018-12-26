const antispam = require("discord-anti-spam");
const Discord = require("discord.js");
const fs = require("fs");
const botSettings = require("./botSettings.json")
const client = new Discord.Client({disableEveryone: true});
client.commands = new Discord.Collection();
const bot = new Discord.Client({disableEveryone: true})
bot.commands = new Discord.Collection();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube("AIzaSyAfIu0OjJtPz4-lpYtR-zTYvipNcnMist4");
const queue = new Map();
var opusscript = require("opusscript");
var servers = {};
var prefix = "p!";
const lblue = "#ADD8E6";
//const ms = require("ms");

fs.readdir("./commands/", (err, files) => {
    
    if (err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.length <= 0){
        console.log("Couldn't find any commands.");
        return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);
        client.commands.set(props.help.name, props)
    });
});

client.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = botSettings.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(!message.content.startsWith(prefix)) return;
    let commandfile = client.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot, message, args);

})

client.on("message", async message => {
	var args = message.content.substring(prefix.length).split(" ");
    if (!message.content.startsWith(prefix)) return;

  
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  let messageArray = message.content.split(" ");
 let cmd = messageArray[0];
	switch (args[0].toLowerCase()) {
		case "message":
if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You're not an admin!");
await message.delete();
let embed = new Discord.RichEmbed()
.setDescription(args.join(" ").slice(3))
.setColor("#FFFFF");

message.channel.send(embed);
break; 
case "help":
let helpEmbed = new Discord.RichEmbed()
.addField("**Commands**",
"** **")
.addField("p!help", "Displays this message.")
.addField("p!purge", "Delete several messages at once.")
.addField("p!mute", "Mute a user.")
.addField("p!tempmute", "Temporally mute a user.")
.addField("p!unmute", "Unmute a user.")
.addField("p!bot", "Displays some info about the bot.")
.setColor("#ADD8E6")
.setFooter(`Coded by Duziest#5104 | ${botSettings.name}`);
message.channel.send(helpEmbed);
break; 
case "bot":
let botEmbed = new Discord.RichEmbed()
.addField("**Info**",
"** **")
.addField(`Description`, "A bot that helps you mute people, and delete several messages at once.")
.addField("Bot Invite Link", "https://discordapp.com/api/oauth2/authorize?client_id=526891442505908244&permissions=8&scope=bot")
.addField("Support Server", "https://discord.gg/wtjsBcq")
.setColor("#ADD8E6")
.setFooter(`Coded by Duziest#5104 | ${botSettings.name}`);
message.channel.send(botEmbed);
break;
case "devleave":
    if(!message.member.id === "516827401385410561") return message.channel.send("no");
await message.channel.send("Leaving. Bye!");
message.guild.leave();
break;
}
});

client.on("ready", async () => {
	console.log(`${client.user.username} is online on ${client.guilds.size} servers!`);
	client.user.setActivity(`${botSettings.prefix}help | ${botSettings.name}`, {type: "WATCHING"});
  });

client.login(botSettings.token);