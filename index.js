const Discord = require('discord.js')
const {client, MessageEmbed, MessageActionRow, MessageButton} = require('discord.js')
const intents = new Discord.Intents(32767);
const bot = new Discord.Client({ intents });
const config= require("./config.json")

const SnakeGame = require('./Games/snake-game');
const HangmanGame = require('./Games/hangman-game');
const Connect4 = require('./Games/connect4');

const snakeGame = new SnakeGame(bot);
const hangman = new HangmanGame(bot);
const connect4 = new Connect4(bot);

const superagent = require('superagent');

bot.on('ready', async () => {
    
    var botonmessage = `
    |-------------------------|
    | > Logging in...         |
    |-------------------------|
    Bot: ${bot.user.tag}`
    
        console.log(botonmessage);
        console.log(`Servers - ${bot.guilds.cache.size}`)

    let statusArray = [
        `| $help for commands |`
        `you...`
    ];
    
    setInterval(function() {
        bot.user.setActivity(`${statusArray[~~(Math.random() * statusArray.length)]}`, { type: 'WATCHING' });
    }, 5000);
});

bot.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) {
        await interaction.deferReply({ ephemeral: false }).catch(() => {});

        const args = [];
        interaction.options.array().map((x) => {
            if (x.value) args.push(x.value);
            if (x.name) args.push(x.name);
        });
        }

        const helpRow3 = new MessageActionRow().addComponents(
            new MessageButton()
            .setCustomId('gotopage3')
            .setLabel('Next Page')
            .setStyle('SECONDARY')
        );
        
        const helpRow4 = new MessageActionRow().addComponents(
            new MessageButton()
            .setCustomId('gotopage4')
            .setLabel('Next Page')
            .setStyle('SECONDARY')
        );

        if (interaction.isButton()) {
            if (interaction.customId === 'gotopage2') {

                const help2 = new MessageEmbed()
                .setColor(config.embedColor)
                .setAuthor('Help Panel')
                .setTitle('Page 2 Miscellaneous')
                .setDescription(`\n${config.prefix}dm \`<@user> <message> (Permission: "Move Members" needed)\`\n${config.prefix}serverinfo\n${config.prefix}userinfo \`<@user>\`\n${config.prefix}invite \`<sends a dm to invite this bot to your server>\`\n${config.prefix}say \`<message>\`\n${config.prefix}calculate \`<example - 2 + 2>\``)
                interaction.channel.send({ embeds: [help2], components: [helpRow3] }).then(message =>{setTimeout(() => message.delete(), 15000)});
            } else if (interaction.customId === 'gotopage3') {
                const help3 = new MessageEmbed()
                .setColor(config.embedColor)
                .setAuthor('Help Panel')
                .setTitle('Page 3 Fun')
                .setDescription(`\n**FUN:**\n${config.prefix}rng \`<randomly generates a number>\`\n${config.prefix}roll \`<rolls a dice>\`\n${config.prefix}snake \`<starts a game of snake>\`\n${config.prefix}hangman \`<starts a game of hangman>\`\n${config.prefix}connect4 \`<starts a game of connect4>\`\n${config.prefix}penis \`<randomly generates your gurth>\`\n${config.prefix}coinflip \`<flips heads or tails>\`\n${config.prefix}rate \`<@user>\``)
                interaction.channel.send({ embeds: [help3], components: [helpRow4] }).then(message =>{setTimeout(() => message.delete(), 15000)}); 
            } else if (interaction.customId === 'gotopage4') {
                const help4 = new MessageEmbed()
                .setColor(config.embedColor)
                .setAuthor('Help Panel')
                .setTitle('Page 4 Anime')
                .setDescription(`\n**${config.prefix}delete** \`[count] (Permission: "Manage Messages" needed)\`__*Deletes messages*__\n**${config.prefix}ban** \`<@user> (Permission: "Ban Members" needed)\`__*Bans a certain user*__\n**${config.prefix}kick** \`<@user> (Permission: "Kick Members" needed)\`__*Kicks a certain user*__`)
                interaction.channel.send({ embeds: [help4] }).then(message =>{setTimeout(() => message.delete(), 15000)});
        }
    }
});

bot.on('messageCreate', async message => {

    const args = message.content.substring(config.prefix.length).split(" "); // prefix split
    if (!message.content.startsWith(config.prefix)) return;
    
if (message.content.toLowerCase() === `${config.prefix}`) {
    message.channel.send(`I don't understand there is no command here ${message.author.username}`)
};
    
    switch(args[0]){

        case 'help':
            const helpRow = new MessageActionRow().addComponents(
                new MessageButton()
                .setCustomId('gotopage2')
                .setLabel('Next Page')
                .setStyle('SECONDARY')
            );
            const help1 = new MessageEmbed()
            .setColor(config.embedColor)
            .setAuthor('Help Panel')
            .setTitle('Page 1 Moderation')
            .setDescription(`\n${config.prefix}delete \`<number of messages> (Permission: "Manage Messages" needed)\``)
            message.channel.send({ embeds: [help1], components: [helpRow] }).then(message =>{setTimeout(() => message.delete(), 15000)}); // each help panel deletes itself after 15 seconds
            break;

            case 'serverinfo':
            let owner = await message.guild.fetchOwner()
                  const serverinfoembed = new MessageEmbed()
                  .setColor(config.embedColor)
                  .setTitle(`**Server Name: ** \`${message.guild.name}\``)
                  .setThumbnail(`https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}?size=3072`)
                .addField("**Total Members**", `\`\`\`${message.guild.memberCount}\`\`\``)
                .addField("**Total Roles**", `\`\`\`${message.guild.roles.cache.size}\`\`\``)
                .addField("**Total Channels**", `\`\`\`${message.guild.channels.cache.size}\`\`\``)
                .addField("**---------------------------------------------------------------------------**", `\`\`\`diff\n-Server Created:\n${message.guild.createdAt}\`\`\``)
                .addField("**Server Picture**", `[Picture URL](https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}?size=3072)`, true)
                .addField("**Vanity URL**", `https://discord.gg/${message.guild.vanityURLCode}`,true)
                .addField("**Current Location**", `${message.guild.region}`, true)
                .addField("**Verification Level**", `${message.guild.verificationLevel}`, true)
                .addField("**Guild Owner**", `${owner}`, true)
                .addField("**Guild ID**", `\`\`\`${message.guild.id}\`\`\``)
                .setImage(`https://cdn.discordapp.com/splashes/${message.guild.id}/${message.guild.splash}?size=3072`)
                  message.channel.send({ embeds: [serverinfoembed] });
            break;
            
            case 'ban': 
            if (message.member.permissions.has("BAN_MEMBERS")) {
                const target = message.mentions.members.first(); 
                if (!target) {
                    return message.channel.send('You have to mention a user to ban them.')
                }

                if (!target.bannable) {
                    return message.channel.send('I cannot ban this user.')
                }

                target.ban()

                return message.channel.send(`${target.user.tag} was banned.`)
            } else {
            message.channel.send(`${message.author} You do not have the permission \`ban members\` to use this command.`)
                }
                break;
            
            
                case 'kick': 
                if (message.member.permissions.has("KICK_MEMBERS")) {
                    const target = message.mentions.members.first(); 
                    if (!target) {
                        return message.channel.send('You have to mention a user to kick them.')
                    }
    
                    if (!target.kickable) {
                        return message.channel.send('I cannot kick this user.')
                    }
    
                    target.kick()
    
                    return message.channel.send(`${target.user.tag} was kicked.`)
                } else {
                message.channel.send(`${message.author} You do not have the permission \`kick members\` to use this command.`)
                    }
                    break;

        case 'rate': 
            let number = Math.floor(Math.random() * 11);
            let userate = message.mentions.members.first() || message.guild.members.cache.get(args[1]) || message.guild.members.cache.find(x => x.user.username.toLowerCase)
    
         if (userate) {
              message.channel.send(`Rating ${userate} a ${number}/10`)
            } else {
                return;
            }
            break;
            
        case 'info':
        message.delete()
            const info = new MessageEmbed()
            .setColor(config.embedColor)
            .setTitle('*Info*')
            .addField('**MADE WITH:**', "This bot is coded with [JS](http://discord.js.org/)")
            message.author.send({ embeds: [info] });
            break;

        case 'roll':
            let rollnumber = [
                `<:game_die:> ${message.author.username} rolled a 1`,
                `<:game_die:> ${message.author.username} rolled a 2`,
                `<:game_die:> ${message.author.username} rolled a 3`,
                `<:game_die:> ${message.author.username} rolled a 4`,
                `<:game_die:> ${message.author.username} rolled a 5`,
                `<:game_die:> ${message.author.username} rolled a 6`
            ];
            const rollembed = new MessageEmbed()
            .setColor(embedColor)
            .setTitle(`${rollnumber[~~(Math.random() * rollnumber.length)]}`)
            message.channel.send({ embeds: [rollnumber] })
            break;

        case 'invite':
            message.delete()
            const invite = new MessageEmbed()
            .setColor(config.embedColor)
            .setTitle('*Invite Me!*')
            .setDescription(`\`Click the button to invite the\` [bot](https://discord.com/oauth2/authorize?client_id=${message.client.user.id}&permissions=8&scope=applications.commands%20bot)`)
            message.author.send({ embeds: [invite] });
            break;

        case 'notice':

        var hugs = [
                "`＼(^o^)／`",
                "`d=(´▽｀)=b`",
                "`⊂((・▽・))⊃`",
                "`⊂( ◜◒◝ )⊃`",
                "`⊂（♡⌂♡）⊃`",
                "`⊂(◉‿◉)つ`"
            ];
            const notice = new MessageEmbed()
            .setColor(config.embedColor)
            .setTitle(`${hugs[~~(Math.random() * hugs.length)]}`)
            message.channel.send({ embeds: [notice] });
            break;

        case 'delete':
        if (message.member.permissions.has("MANAGE_MESSAGES")){
              if(!args[1]) return
                  if (args[1] == 1){
                  let n1 = parseInt(args[1])
                  message.channel.bulkDelete(n1 + 1)
                  } else {
                  message.channel.bulkDelete(args[1])
                  }
                  const del = new MessageEmbed()
                  .setColor(config.embedColor)
                  .setAuthor('Delete Command')
                  .addField("Deleted Messages ", (args[1]), true)
                  .addField("Deleter Uername ", `${message.author.username}`, true)
                  .addField("Deleter ID ", `${message.author.id}`, true)
                  .setTimestamp()
                  message.channel.send({ embeds: [del] });
                } else {
                    message.channel.send("You do not have the permission `manage messages` to use this command.")
                }
        break;
        
        case "calculate":

                let math = require('math-expression-evaluator');
                let calcArgs = message.content.split(' ').slice(1).join(' ');

                if (!calcArgs[0]) {
                    const expressionCalculatorEmbed = new MessageEmbed()
                    .setColor(config.embedColor)
                    .setFooter('Please input an expression.')
                    message.channel.send({ embeds: [expressionCalculatorEmbed] })
                    };
                
                let calcResult;
                try {
                    calcResult = math.eval(calcArgs);
                } catch (e) { 
                    calcResult = 'Error: "Invalid Input"';
                }
                const calculatorEmbed = new MessageEmbed()
                .setColor(config.embedColor)
                .setAuthor('Calculator')
                .addField("Question", `\`${calcArgs}\``, true)
                .addField("Answer", `\`${calcResult}\``, true)
                .setTimestamp()
                message.channel.send({ embeds: [calculatorEmbed] });
            break;

        case 'userinfo':
        var person = message.mentions.users.first();
        var member = message.guild.members.cache.get(person.id);
        if (!person) return message.channel.send('You need to mention someone to display user info')
        if (!member) return message.channel.send('You need to mention someone to display user info')

        const userinfoembed = new MessageEmbed()
            .setColor(config.embedColor)
            .setTitle(`${person.username}'s info`)
              .setThumbnail(`${person.displayAvatarURL({dynamic: true})}`)
              .addField("**ID**", `\`\`\`${person.id}\`\`\``, true)
              .addField("**Username**", `\`\`\`${person.username}\`\`\``, true)
              .addField("**Tag**", `\`\`\`#${person.discriminator}\`\`\``, true)
              .addField("**Bot?**", `${person.bot}`, true)
              .addField("**Avatar**", `[Avatar URL](${person.displayAvatarURL({dynamic: true})})`)
              .addField("**--------------------------------------**", `\`\`\`diff\n-User Created:\n${person.createdAt}\`\`\``, true)
              .addField("**--------------------------------------**", `\`\`\`diff\n-User Joined:\n${member.joinedAt}\`\`\``, true)
              .addField("**Nickname**", `\`\`\`${person.nickname}\`\`\``)
              .addField("**Status**", `\`\`\` ${member.presence.status} \`\`\``)
         message.channel.send({ embeds: [userinfoembed] });
        break;

        case 'poke':
            if (!message.mentions.users.first()) return message.reply("You need to mention someone to poke them");
            var { body } = await superagent.get("https://nekos.life/api/v2/img/poke");
            
            const poke = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle(`${message.author.username} poked ${message.mentions.users.first().username}`)
            .setImage(body.url)
            message.channel.send({ embeds: [poke] });
        break;

        case 'pat':
            if (!message.mentions.users.first()) return message.reply("You need to mention someone to poke them");
            var { body } = await superagent.get("https://nekos.life/api/v2/img/pat");
            
            const pat = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle(`${message.author.username} gave head pats to ${message.mentions.users.first().username}`)
            .setImage(body.url)
            message.channel.send({ embeds: [pat] });
        break;

        case 'hug':
            if (!message.mentions.users.first()) return message.reply("You need to mention someone to hug them");
            var { body } = await superagent.get("https://nekos.life/api/hug");
            
            const hug = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle(`${message.author.username} hugged ${message.mentions.users.first().username}`)
            .setImage(body.url)

            message.channel.send({ embeds: [hug] });
        break;

        case 'cuddle':
            if (!message.mentions.users.first()) return message.reply("You need to mention someone to cuddle them");
            var { body } = await superagent.get("https://nekos.life/api/hug");
            
            const cuddle = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle(`${message.author.username} cuddled ${message.mentions.users.first().username}`)
            .setImage(body.url)
            message.channel.send({ embeds: [cuddle] });
        break;

        case 'slap':
            if (!message.mentions.users.first()) return message.reply("You need to mention someone to slap them.");
            var { body } = await superagent.get("https://nekos.life/api/v2/img/slap");
            
            const slap = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle(`${message.author.username} slapped ${message.mentions.users.first().username}`)
            .setImage(body.url)
            message.channel.send({ embeds: [slap] });
        break;
        
        case 'tickle':
            if (!message.mentions.users.first()) return message.reply("You need to mention someone to tickle them");
            var { body } = await superagent.get("https://nekos.life/api/v2/img/tickle");
            
            const tickle = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle(`${message.author.username} tickled ${message.mentions.users.first().username}`)
            .setImage(body.url)
            message.channel.send({ embeds: [tickle] });
        break;

        case 'feed':
            if (!message.mentions.users.first()) return message.reply("You need to mention someone to feed them");
            var { body } = await superagent.get("https://nekos.life/api/v2/img/feed"); 
            
            const feed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle(`${message.author.username} fed ${message.mentions.users.first().username}`)
            .setImage(body.url)
            message.channel.send({ embeds: [feed] });
        break;

        case 'kiss':
            if (!message.mentions.users.first()) return message.reply("You need to mention someone to kiss them");
            var { body } = await superagent.get("https://nekos.life/api/kiss");
            
            const kiss = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle(`${message.author.username} kissed ${message.mentions.users.first().username}`) 
            .setImage(body.url)
            message.channel.send({ embeds: [kiss] });
        break;
    }

    if (message.content.startsWith(config.prefix + "dm")) {
        if (message.member.permissions.has("MOVE_MEMBERS")) {
        // using permission MOVE_MEMBERS because i don't want just anyone using this command since it can be really annoying, but have someone with a small permission have the ability to use this command
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!args) return message.channel.send(`You need to mention a user.`);
        if (!args.slice(1).join(" ")) return message.channel.send("You need to enter a message to send them.");
        user.send(args.slice(2).join(" ")).catch(() => message.channel.send("That user could not be DMed.")).then(() => message.channel.send(`Sent a message to ${user.user.tag}`))
    } else {
    message.channel.send(`${message.author} You do not have the permission \`move members\` to use this command.`)
        }
    }
    
    if (message.content.startsWith(config.prefix + "say")) {
        if (!args.slice(1).join(" ")) return message.channel.send(`You need to enter a message for me to say.`);
        message.channel.send(args.slice(1).join(" "));
    }

if (message.content.toLowerCase() === `${config.prefix}snake`) {
    snakeGame.newGame(message)
};

if (message.content.toLowerCase() === `${config.prefix}hangman`) {
    hangman.newGame(message)
};

if (message.content.toLowerCase() === `${config.prefix}connect4`) {
    connect4.newGame(message)
};

if (message.content.toLowerCase() === `${config.prefix}rng`) {
    let number = Math.floor(Math.random() * 101);

    message.channel.send(`**Random Number Generator:**\n__${number}/100__`);
};

if (message.content.toLowerCase() === `${config.prefix}coinflip`) {
    let number = Math.floor(Math.random() * 2);

    if (number == 1) {
        message.channel.send('I flipped a coin and it landed on heads.')
    }
    if (number == 0) {
        message.channel.send('I flipped a coin and it landed on tails.')
    }
};

if (message.content.toLowerCase() === `${config.prefix}penis`) {

    let dicks = [
        `${message.author.username}'s penis size\n 8=D`,
        `${message.author.username}'s penis size\n 8==D`,
        `${message.author.username}'s penis size\n 8===D`,
        `${message.author.username}'s penis size\n 8====D`,
        `${message.author.username}'s penis size\n 8=====D`,
        `${message.author.username}'s penis size\n 8======D`,
        `${message.author.username}'s penis size\n 8=======D`,
        `${message.author.username}'s penis size\n 8========D`,
        `${message.author.username}'s penis size\n 8=========D`,
        `${message.author.username}'s penis size\n 8==========D`,
        '404 penis not found'
    ];

    const penisembed = new MessageEmbed()
    .setColor(config.embedColor)
    .setTitle(`${dicks[~~(Math.random() * dicks.length)]}`)
    message.channel.send({ embeds: [penisembed] });
};

});

bot.login(config.token)
