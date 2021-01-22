const Discord = require('discord.js');
const usersInfos = require('./membersInfos.json');
const { prefix, token } = require('./config.json');
const bot = new Discord.Client()
const ID_REGEX = /\d/g;
const botId = "796046003899334677";


/**
 *  1] je dis que je veux donner des news
 *  2] le bot detecte le message et ouvre un PV
 *  3] j'alimente "mon objet USER"
*/

// a remove quand le dev est fini
bot.on('ready', function () {
    console.log("Je suis connecté !");
})

bot.login(token);

bot.on('message', message  => {
    if(message.channel.type === 'dm' && message.author.id !== botId) {
        console.log("Message privé ne venant pas du bot");
    }
} )

bot.on('message', message => {
    if(message.content.includes(`!news`) && message.author.id !== botId) {
        // défini l'user à chercher
        let IdOfUserToDisplay = message.content.match(ID_REGEX).join('');

        // affiche l'user selectionné
        let userToDisplay = usersInfos.find(user => user.id === IdOfUserToDisplay);
        
        // envoie des infos sur la personne taguée en mp
        message.author.send(`
        Hello ! 
        Voilà des nouvelles de ` + userToDisplay.firstName + ` ` + userToDisplay.name + ` : 
        Sa situation : ` + userToDisplay.situation + `
        Son petit message d'encouragement : ` + userToDisplay.cheerMessage);
    }
})

bot.on('message', message => {
    if(message.content === `!giveNews` ) {
        let news = {
            "id" : message.author.id
        };
        message.reply(`Pour donner des nouvelles de vous, veuillez suivre les instructions suivantes :`);
        message.reply(`Entrez votre prénom`)
        .then(() => {
            message.channel.awaitMessages().then(userResponse => {
                news.firstName = userResponse.content;
            })
            .then(() => {
                usersInfos.push(news);
            })           
        })   
    }
});

bot.on('message', message => {
    if(message.content === `!help` ) {
        message.reply(`
        Écrivez !news en taguant un membre du serveur pour avoir de ses nouvelles par message privé
        Vous pouvez aussi écrire !giveNews pour ajouter des infos à propos de vous qui seront accessibles par les autres membres du serveur`);
    }
})


