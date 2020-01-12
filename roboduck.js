const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config/auth2.json");
const fs = require("fs");

let warns = require("./warnings2.json");
const prefix = "!";



client.on("ready", () => {
  
  console.log(`[${new Date()}] Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  //console.log(`online and Ready`)

  client.user.setActivity(`Serving ${client.users.size} Users on ${client.guilds.size} Servers`);

  client.user.setStatus("dnd")
});


//WELCOME MESSAGE//
  client.on("guildMemberAdd", member => {

 console.log('User ' + member.user.username + ' has joined the server!')

 const role = member.guild.roles.find(x => x.name === "Goose");

 member.addRole(role);

    member.guild.channels.find(x => x.name === "welcome").send(`welcome ${member.user}, Please read the rules in the server-rules channel to enter the main channels.`);
  });

//MUTE + DEFEAN LOGGING//
client.on('voiceStateUpdate', (oldM, newM) => {
console.log
  let m1 = oldM.serverMute;

  let m2 = newM.serverMute;

  let v1 = oldM.voiceChannel;
  
  let v2 = newM.voiceChannel;

  let d1 = oldM.serverDeaf;

  let d2 = newM.serverDeaf;

 

  let ch = oldM.guild.channels.find(x => x.name === "voice-logs")

  if(!ch) return;

 

    oldM.guild.fetchAuditLogs()

    .then(logs => {

 

      let user = logs.entries.first().executor

 

    if(m1 === false && m2 === true) {

       let embed = new Discord.RichEmbed()

       .setColor(16711680)

       .setAuthor(`${newM.user.tag}`, newM.user.avatarURL)

       .setDescription(`${newM} has been muted`)

       .setFooter(`By : ${user.tag}`)

 

       ch.send(embed)

    }

    if(m1 === true && m2 === false) {

       let embed = new Discord.RichEmbed()

       .setColor(8311585)

       .setAuthor(`${newM.user.tag}`, newM.user.avatarURL)

       .setDescription(`${newM} has unmuted`)

       .setFooter(`By : ${user.tag}`)

 

       ch.send(embed)

    }

    if(d1 === false && d2 === true) {

       let embed = new Discord.RichEmbed()

       .setColor(16711680)

       .setAuthor(`${newM.user.tag}`, newM.user.avatarURL)

       .setDescription(`${newM} has deafened`)

       .setFooter(`By : ${user.tag}`)

 

       ch.send(embed)

    }

    if(d1 === true && d2 === false) {

       let embed = new Discord.RichEmbed()

       .setColor(8311585)

       .setAuthor(`${newM.user.tag}`, newM.user.avatarURL)

       .setDescription(`${newM} has undeafened`)

       .setFooter(`By : ${user.tag}`)

 

       ch.send(embed)

    };

    if(v1 && v2 && v1.id != v2.id) {

       let embed = new Discord.RichEmbed()

       .setColor(8311585)

       .setAuthor(`${newM.user.tag}`, newM.user.avatarURL)

       .setDescription(`${newM} has moved from ${oldM.voiceChannel} to ${newM.voiceChannel}`)

       .setFooter(`By : ${newM.user.tag}`)

 

       ch.send(embed)

    }

    if(v2 == null) {

       let embed = new Discord.RichEmbed()

       .setColor(8311585)

       .setAuthor(`${newM.user.tag}`, newM.user.avatarURL)

       .setDescription(`${newM} has left ${oldM.voiceChannel}`)

       .setFooter(`By : ${newM.user.tag}`)

 

       ch.send(embed).catch((e) => { console.log(e)})

    }

    if(v2 != null && v1 == null) {

       let embed = new Discord.RichEmbed()

       .setColor(16711680)

       .setAuthor(`${newM.user.tag}`, newM.user.avatarURL)

       .setDescription(`${newM} has joined ${newM.voiceChannel}`)

      

 

       ch.send(embed)

    }

  })

})

 //MESSAGE EDIT//
 client.on('messageUpdate', (omsg, nmsg) => {
  if(omsg.author.bot) return;
   //omsg.guild.channels.find(x => x.name === "chat-logs-2").send(`\`\`\`\n#Message_Edited\n${new Date()}\nOld Content: ${omsg}\n- New Content: ${nmsg}\n<Author: ${omsg.author.username}\n\`\`\`\ `)
   if (omsg.channel.id === '504287395542204417') { return };

   const channel = omsg.guild.channels.find(x => x.name === "chat-logs"); 
 
   if (!channel) return;
   
   let embed = new Discord.RichEmbed()

     .setAuthor(`${omsg.author.tag}`, omsg.author.avatarURL)

     .setColor(1835263)

     .setDescription(`User: <@${omsg.author.id}> on: <#${omsg.channel.id}>\n\n EDITED message:\n\n **Old Message:** \`${omsg}\`\n\n **New Messsage:** \`${nmsg}\``)

     .setTimestamp();

   channel.send({embed:embed});
  });



//MESSAGE DELETE//

client.on('messageDelete', message => {

  if (!message || !message.id || !message.content || !message.guild || message.author.bot) return;

  //IGNORING THE DELETED MESSAGES IN MUSIC ROOM//
  if(message.author.bot) return;
  if (message.channel.id === '513159407350054924') { return };

  const channel = message.guild.channels.find(x => x.name === "chat-logs"); 

  if (!channel) return;

 

  let embed = new Discord.RichEmbed()

     .setAuthor(`${message.author.tag}`, message.author.avatarURL)

     .setColor(1835263)

     .setDescription(`User: <@${message.author.id}> on: <#${message.channel.id}>\n\n Deleted message: \`${message.cleanContent}\``)

     .setTimestamp();

   channel.send({embed:embed});



});

//ON BAN//
  client.on('guildBanAdd',(guild, user) => {
    console.log(`**[USER BANNED]** ${user.username} / ${user.id} got banned from ${guild.name} - time: ${new Date()}`)
    guild.channels.find(x => x.name === "ban-logs").send(`**[BAN]** User: ${user.username} / UserdID: ${user.id} Got banned from: ${guild.name}`);
  });

//ON BAN REMOVE//
  client.on('guildBanRemove',(guild, user) => {
    console.log(`**[USER UNBANNED]** ${user.username} / ${user.id} got unbanned from ${guild.name} - time: ${new Date()}`)
    guild.channels.find(x => x.name === "ban-logs").send(`**[BAN REMOVED]** User: ${user.username} / UserID: ${user.id} Got **UN**banned from: ${guild.name}`);
  });





//ON MESSAGE//
client.on("message", async message => {
  if(message.author.bot) return;
  
  //IGNORING MUSIC ROOM FOR COMMANDS//
  if (message.channel.id === '513159407350054924') { return };

  //LOGGING WHEN DM RECIEVED//
   if (message.channel.type == "dm") {
   // message.guild.find(x => x.name === "Teal").send(`Recieved a DM`)
    client.fetchUser('264771677445947393').then((user) => {
      user.send(`**DM Recieved**\nAuthor: ${message.author}\nContaining: ${message.content}\nMessage ID: ${message.id}`);
    return
   })
  };

  if(message.content.indexOf(prefix) !== 0) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

 if(command === "ping") {

    const m = await message.channel.send("Ping");

    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
    
    message.delete()

  };

  // if(command === "yt") {

  //   message.channel.send(`Here is a link to the live stream!`)

  //   message.channel.send(`https://www.youtube.com/channel/UCBzDAvD-747LONwoWRFnXmA`)
    
  //   message.channel.send(`https://www.deeveeaar.com`)

  //   console.log("Livestream link requested")

  //   message.delete()

  //   return

  // }


//THIS IS THE SAY COMMAND
  if(command === "say") {
    if(!message.member.roles.some(r=>["Teal", "Woz", "Main PPL", "Owner", "Co Owner", "Admin", "Founder", "Server CEO"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    const sayMessage = args.join(" ");

    message.delete().catch(O_o=>{}); 

    message.channel.send(sayMessage);
  }


//THIS IS THE 18 COMMAND
  if(command === "18") {
    if(!message.member.roles.some(r=>["Ducklings"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    const plusrole18 = message.member.guild.roles.find(x => x.name === "18+");

    message.delete().catch(O_o=>{}); 

     message.member.addRole(plusrole18);

}

//THIS IS THE remove 18 COMMAND
  if(command === "r18") {
    if(!message.member.roles.some(r=>["18+"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    const remrole18 = message.member.guild.roles.find(x => x.name === "18+");

    message.delete().catch(O_o=>{}); 

     message.member.removeRole(remrole18);

}

//THIS IS THE add miner COMMAND
  if(command === "miner") {
    if(!message.member.roles.some(r=>["Ducklings"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    const plusroleminers = message.member.guild.roles.find(x => x.name === "Miners");

    message.delete().catch(O_o=>{}); 

     message.member.addRole(plusroleminers);

}

//THIS IS THE remove miners COMMAND
  if(command === "rminer") {
    if(!message.member.roles.some(r=>["Miners"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    const remroleminers = message.member.guild.roles.find(x => x.name === "Miners");

    message.delete().catch(O_o=>{}); 

     message.member.removeRole(remroleminers);

}

//THIS IS THE add rusties COMMAND
  if(command === "rust") {
    if(!message.member.roles.some(r=>["Ducklings"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    const plusrolerust = message.member.guild.roles.find(x => x.name === "Rusties");

    message.delete().catch(O_o=>{}); 

     message.member.addRole(plusrolerust);

}

//THIS IS THE remove rusties COMMAND
  if(command === "rrust") {
    if(!message.member.roles.some(r=>["Rusties"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    const remrolerust = message.member.guild.roles.find(x => x.name === "Rusties");

    message.delete().catch(O_o=>{}); 

     message.member.removeRole(remrolerust);

}

//THIS IS THE agree COMMAND
  if(command === "agree") {
    if(!message.member.roles.some(r=>["Goose"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    const remrole = message.member.guild.roles.find(x => x.name === "Goose");
    const plusrole = message.member.guild.roles.find(x => x.name === "Ducklings");

    message.delete().catch(O_o=>{}); 

     message.member.addRole(plusrole);
     message.member.removeRole(remrole);

}

//THIS IS THE disagree COMMAND
  if(command === "disagree") {
    if(!message.member.roles.some(r=>["Goose"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
   
  message.channel.send(":wave: " + message.member.displayName + " Bye then.");
   
  message.member.kick();
  
  message.delete().catch(O_o=>{}); 



}


  //BOTINFO//
  if (command === "uptime") {
    let days = Math.floor(client.uptime / (1000 * 60 * 60 * 24));

    let hours = Math.floor((client.uptime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    let minutes = Math.floor((client.uptime % (1000 * 60 * 60)) / (1000 * 60));

    let seconds = Math.floor((client.uptime % (1000 * 60)) / 1000);

    message.author.send("My uptime is: " + days + " days, " + hours + " hours, " + minutes + " minutes, " + seconds + " seconds.");
    
    
    message.delete()

  };

  if (command === "botinfo") {



    let days = Math.floor(client.uptime / (1000 * 60 * 60 * 24));

    let hours = Math.floor((client.uptime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    let minutes = Math.floor((client.uptime % (1000 * 60 * 60)) / (1000 * 60));

    let seconds = Math.floor((client.uptime % (1000 * 60)) / 1000);



    const embed = {

      "title": "Roboduck",

      "fields": [

        {

          "name": "Created by:",

          "value": "Teal & D4rk"

        },

        {

          "name": "Running on:",

          "value": "Node.JS / Discord.JS"

        },

        {

          "name": "Uptime:",

          "value": "My uptime is: " + days + " days, " + hours + " hours, " + minutes + " minutes, " + seconds + " seconds."

        },

      ]

    }

    message.author.send({ embed })

    message.delete();

  }

//GIVE TF ROLE  
  if(command === "tf") {
//console.log(message)

    if(!message.member.roles.some(r=>["Teal", "Woz", "Main PPL", "Owner", "Co Owner", "Admin", "Founder", "Server CEO", "MOD", "Mod"].includes(r.name)) )
      return message.author.send("Sorry, you don't have permissions to use this!") | message.delete();
    
    let role = message.guild.roles.find(role => role.name === "TF");
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.author.send("Please mention a valid member of this server") | message.delete();

    // Now, time for a TF role!
    member.addRole(role);

    message.guild.channels.find(x => x.name === "mod-logs").send(`**[TF]** ${message.member.user} has given ${member.user} the TF role.`);

      message.delete(); //Supposed to delete message
    

  }

//REMOVE TF ROLE  
  if(command === "rtf") {
//console.log(message)

    if(!message.member.roles.some(r=>["Teal", "Woz", "Main PPL", "Owner", "Co Owner", "Admin", "Founder", "Server CEO", "MOD", "Mod"].includes(r.name)) )
      return  message.author.send("Sorry, you don't have permissions to use this!") | message.delete();
    
    let role = message.guild.roles.find(role => role.name === "TF");
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return  message.author.send("Please mention a valid member of this server") | message.delete();

    // Now, time to remove TF role!
    member.removeRole(role);

    message.guild.channels.find(x => x.name === "mod-logs").send(`**[Removed TF]** ${message.member.user} has removed the TF Role from ${member.user}`);
    
    
      message.delete(); //Supposed to delete message


  }

//JOKER OF THE SERVER//

  if(command === "joker") {

    //console.log(message)

    

        if(!message.member.roles.some(r=>["Teal", "Woz", "Main PPL", "Owner", "Co Owner", "Admin", "Founder", "Server CEO"].includes(r.name)) )

          return message.author.send("Sorry, you don't have permissions to use this!") | message.delete();

        

        let role = message.guild.roles.find(role => role.name === "Jokers Of The Server");

        let member2 = message.guild.roles.find(role => role.name === "Member");

        let tf = message.guild.roles.find(role => role.name == "TF");

        let member = message.mentions.members.first() || message.guild.members.get(args[0]);

        if(!member)

          return message.author.send("Please mention a valid member of this server") | message.delete();

    

       

        member.addRole(role);

        member.removeRole(member2)
       
        member.removeRole(tf)

    

        message.guild.channels.find(x => x.name === "mod-logs").send(`**[Jokers Of The Server]** ${message.member.user} has given ${member.user} the "Jokers Of The Server" role.`);

    

          message.delete(); //Supposed to delete message

        

    

      }



  //REMOVE JOKER OF THE SERVER//  

  if(command === "rjoker") {

    //console.log(message)

    

        if(!message.member.roles.some(r=>["Teal", "Woz", "Main PPL", "Owner", "Co Owner", "Admin", "Founder", "Server CEO"].includes(r.name)) )

          return  message.author.send("Sorry, you don't have permissions to use this!") | message.delete();

        

        let role = message.guild.roles.find(role => role.name === "Jokers Of The Server");

        let member2 = message.guild.roles.find(role => role.name === "Member");

        let member = message.mentions.members.first() || message.guild.members.get(args[0]);

        if(!member)

          return  message.author.send("Please mention a valid member of this server") | message.delete();

    

        // Now, time to remove TF role!

        member.removeRole(role);

        member.addRole(member2)

    

        message.guild.channels.find(x => x.name === "mod-logs").send(`**[Removed Jokers Of The Server]** ${message.member.user} has removed the "Jokers Of The Server" Role from ${member.user}`);

        

        

          message.delete(); //Supposed to delete message

    

    

      }

// //LIVE COMMAND//  
// if(command === "live") {
//   //console.log(message)

//       if(!message.member.roles.some(r=>["Administrator"].includes(r.name)) )
//         return message.author.send("Sorry, you don't have permissions to use this!");

//         message.channel.send(`@everyone We are LIVE!!!! https://www.youtube.com/channel/UCBzDAvD-747LONwoWRFnXmA & http://www.deeveeaar.com`);

//         message.delete();

//     }

//HELP SYSTEM
  if (command === "help"){
    var helpadmin = [

      "Help commands for Administrators:",

      "!Clear <amount> - `Clear <amount> messages.`",

      "!vk @username - `Kicks @username from voicechannels`",

      "!tf @username - `[Gives TF role to @username]`",

      "!rtf @username - `[Removes TF role from @username]`",

      "!joker @username - `[Add Joker of the server and removes the member role]`",,

      "!rjoker @username = `[Removes the joker role, and adds the member role back on]`",

      "!botinfo - `Send information about me.`",

      "!live - `[Tags everyone, and says that we are live]`",

      "!uptime - `Sends my current uptime.`",

    ];



    var scamcall = [

      "Help commands for Scam Calls Mod:",

      "!vk @username - `Kicks @username from voicechannels`",

      "!tf @username - `[Gives TF role to @username]`",

      "!rtf @username - `[Removes TF role from @username]`",

      "!joker @username - `[Add Joker of the server and removes the member role]`",

      "!rjoker @username = `[Removes the joker role, and adds the member role back on]`",

      "!uptime - `Sends my current uptime.`",

      "!botinfo - `Send information about me.`",

    ];



    var helpmember = [

      "Help commands for Members:",

      "!botinfo - `Send information about me.`",

      "!uptime - `Sends my current uptime.`",

      "Nothing more currently...",

    ];

    let Role1 = message.guild.roles.find(role => role.name === "Administrators"); //Highest Role
    let Role2 = message.guild.roles.find(role => role.name === "MOD"); //scam calls mod
    let Role3 = message.guild.roles.find(role => role.name === "Member"); //member
    if (message.member.roles.has(Role1.id)) {
      message.author.send(helpadmin); //Administrators
    } else if (message.member.roles.has(Role2.id)) {
      message.author.send(scamcall); //scam calls mod
        } else if (message.member.roles.has(Role3.id)) { 
      message.author.send(helpmember) //member
      }
     message.delete();
    };
    

//CLEAR COMMAND//
  if(command === "clear"){
      if(!message.member.roles.some(r=>["Teal", "Administrators", "Main PPL", "Woz", "Co Owner", "Admin"].includes(r.name)) )
      return message.author.send("Sorry, you don't have permissions to use this!") | message.delete();
      if (isNaN(args [0])) return message.author.send('`You dindt supply a amout <<!clear <number of lines>>`') | message.delete();
      if (args[0] > 100) return message.author.send('`Please supply a number (more then 1 and less then 100)`') | message.delete();
      message.channel.bulkDelete(args[0])
          .then(messages => message.guild.channels.find(x => x.name === "mod-logs").send(`**[Clear]** Cleared \`${messages.size}/${args[0]}\` on \`#${message.channel.name}\` by: ${message.author}`))
          .catch( error => message.guild.channels.find(x => x.name === "mod-logs").send(`**i was getting a ERROR:** ${error.message}`));
    }

//VOICEKICK//

    if (command == "vk") {

      if(!message.member.roles.some(r=>["Teal", "Woz", "Main PPL", "Owner", "Co Owner", "Admin", "Founder", "Server CEO", "MOD", "Mod"].includes(r.name)) )

      return message.author.send("Sorry, you don't have permissions to use this!") | message.delete();

      let user = message.mentions.users.first();

      if (!user) {

          return message.author.send("You need to mention a user!") | message.delete();

      }

      let kickMention = message.guild.members.get(user.id);

      if (kickMention.hasPermission("MANAGE_MESSAGES")) return message.author.send("Sorry this command cant be used on Crew members") | message.delete();

      if (kickMention) {

          if (!kickMention.voiceChannel) {

              message.author.send(`**${user.username}** isn't in a voice channel.`);

              message.delete();

          } else {

              message.guild.createChannel(`voicekick`, `voice`)

                  .then(channel => {

                      setTimeout(() => {

                          kickMention.setVoiceChannel(channel);

                      }, 1000)

                      setTimeout(() => {

                          message.guild.channels.find(x => x.name === "voice-logs").send(`**[Voicekick]** ${message.member.user} kicked ${kickMention} from the voice channels!`);

                          channel.delete()

                      }, 1500)

                      message.delete();

                  })

                  .catch((error) => {

                    message.author.send(`I couldn't kick **${user.username}** from the voice channel.`) | message.delete();

                  })

          }

      }

  }



  

//WARNING SYSTEM//

  if (command == "warn") {

            if(!message.member.roles.some(r=>["Teal", "Woz", "Main PPL", "Owner", "Co Owner", "Admin", "Founder", "Server CEO", "MOD", "Mod"].includes(r.name)) )

            return message.author.send("Sorry, you don't have permissions to use this!");

            let wuser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])

            if (!wuser) return message.channel.send("u need to mention a user!.");

            if (wuser.hasPermission("MANAGE_MESSAGES")) return message.author.send("Nope Cant do that!..!")

            let reason = args.slice(1).join(" ");

 

            if (!warns[wuser.id]) warns[wuser.id] = {

                warns: 0

            };

            warns[wuser.id].warns++;

 

            fs.writeFile("./warnings.json", JSON.stringify(warns), "utf8", (err) => {

                if (err) console.log(err)

            });

 

            let warnEmbed = new Discord.RichEmbed()

                .setDescription("User has been warned!")

                .setColor(16711680)

                .addField("Warned User:", wuser)

                .addField("Warned by:", message.member)

                .addField("Total Warnings:", warns[wuser.id].warns)

                .addField("Reason:", reason);

 

            let warnchannel = message.guild.channels.find(x => x.name === "mod-logs");

 

            warnchannel.send(warnEmbed);



            //SEND THE USER A WARNING DM//

            let dm = message.mentions.users.first()



            let warningsu = new Discord.RichEmbed()

                .setDescription("**You have been warned!**")

                .setColor(16711680)

                .addField("Warned by:", message.member)

                .addField("Reason:", reason)

                .addField("Total warnings you have:", warns[wuser.id].warns)

                .setFooter(`${dm} on 3 warnings you get a kick, on 5 warnings you will get a ban!`);



            dm.send(warningsu)

            console.log(`Warning dm sended to: ${wuser}`)

            message.delete();



             //ACTION ON ENOUGGH POINTS//



             if (warns[wuser.id].warns == 3) {



                 message.guild.member(wuser).kick("3 warnings [AUTO KICK]");

                 warnchannel.send(`**[AUTO KICK]** ${wuser} has a total of 3 warnings and got kicked from the server!`)

                 }

          

             if (warns[wuser.id].warns == 5) {



                message.guild.member(wuser).ban("5 Warnings [AUTO KICK]");

                warnchannel.send(`**[AUTO BAN]** ${wuser} has a total of 5 warnnings and got banned from the server`)

            }

 

        }

        //EINDE VAN WARN SYSTEM//

if (command == "gate"){



  if(!message.member.roles.some(r=>["Teal", "Woz", "Main PPL", "Owner", "Co Owner", "Admin", "Founder", "Server CEO"].includes(r.name)) )



  return message.author.send("Sorry, you don't have permissions to use this!");



  let membersWithRole = message.guild.roles.get("433361071286517791");

  let reason = "You're account was removed for inactivity and server cleanup."
  membersWithRole.members.forEach(member => member.kick(reason)); 

  message.channel.send(`i found ${membersWithRole.members.size} users with the "Gatekeeper" role`)



//  member.addRole("527149835237720083").forEach(member)



}

});

client.login(config.token);
