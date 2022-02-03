const Discord = require("discord.js")
const fetch = require("node-fetch")
const keepAlive = require("./server")
const client=new Discord.Client()
const deck=["6:spades:","7:spades:","8:spades:","9:spades:",
"10:spades:","J:spades:","Q:spades:","K:spades:","A:spades:",
"6:hearts:","7:hearts:","8:hearts:","9:hearts:",
"10:hearts:","J:hearts:","Q:hearts:","K:hearts:","A:hearts:",
"6:diamonds:","7:diamonds:","8:diamonds:","9:diamonds:",
"10:diamonds:","J:diamonds:","Q:diamonds:","K:diamonds:","A:diamonds:",
"6:clubs:","7:clubs:","8:clubs:","9:clubs:",
"10:clubs:","J:clubs:","Q:clubs:","K:clubs:","A:clubs:"]
const commands=["!durak"]  
function makeObserverChannel(message){
    message.guild.channels.create("observer", {
        type: "text", //This create a text channel, you can make a voice one too, by changing "text" to "voice"
        permissionOverwrites: [
           {
             id: message.guild.roles.everyone, //To make it be seen by a certain role, user an ID instead
             allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'], //Allow permissions
             deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'] //Deny permissions
		   }
        ],
      })
}
var hands=[]
var channels=[]
var kozir=""
var playingDeck=[...deck]
async function makeHandChannel(message, id, int){
    alert(id.substr(0,id.length-1))
    const channel=await message.guild.channels.create("Hand "+int, {
        type: "text", //This create a text channel, you can make a voice one too, by changing "text" to "voice"
        permissionOverwrites: [
          {
            id: id.substr(0,id.length-1), //To make it be seen by a certain role, user an ID instead
            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'], //Allow permissions
		      },
          {
            id: message.guild.roles.everyone, //To make it be seen by a certain role, user an ID instead
            deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'] //Deny permissions
		      }
        ],
      })
    const abc={ id }=channel
    channel.send("hand"+int)
    channels.push(channel)
    alert(channels.length)
}
function deal(){
  
}
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

//onSuccess
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
  //client.channels.cache.get('829835716250959879').send('<@220579324770779137> fart ass mofo')

})
//noUResponse
client.on("message", msg =>{
  if (msg.author.bot) return
  var content=msg.content.split(" <@!")
  if(content[0]=="!shuffle"){
    kozir=""
    hands=[]
    channels=[]
    playingDeck=[...deck]
    shuffle(playingDeck)
    shuffle(playingDeck)
    //msg.reply(content)
    makeObserverChannel(msg)
    handsNum=0
    for (let i = 1; i < content.length; i++) {
      makeHandChannel(msg,content[i],i)
      handsNum++
    }
    for( let i=0; i<handsNum;i++){
      hands.push(playingDeck.splice(0,6))
      //channels[i].send(hands[i])
    }
    msg.reply(hands)
  }
  if(msg.content=="!deal"){
    alert("end of channels")
    alert(channels.length)
    kozir=playingDeck.splice(0,1)
    for( let i=0; i<handsNum;i++){
      channels[i].send("Your hand: "+hands[i])
      channels[i].send("Kozir kard: "+kozir)
    }
  }
})
//romanian stud
client.on("message", msg =>{
  if (msg.author.bot) return
  if (msg.content === "$cristian"){
    msg.channel.send("<@220579324770779137> get on")
    msg.delete()
  }
})
//test
client.on("message", msg =>{
  if (msg.author.bot) return

  if (msg.content === "$com"){
    getQuote().then(quote=>msg.channel.send(quote))
  }
})

keepAlive()
client.login(process.env.TOKEN)