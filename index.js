const mineflayer = require('mineflayer')
const cmd = require('mineflayer-cmd').plugin
const fs = require('fs');
let rawdata = fs.readFileSync('config.json');
let data = JSON.parse(rawdata);
var lasttime = -1;
var moving = 0;
var connected = 0;
var actions = [ 'forward', 'back', 'left', 'right']
var lastaction;
var pi = 3.14159;
var moveinterval = 2; // 2 second movement interval
var maxrandom = 5; // 0-5 seconds added to movement interval (randomly)
var host = data["ip"];
var username = data["name"]
var nightskip = data["auto-night-skip"]
var bot = mineflayer.createBot({
  host: host,
  username: username
});
function getRandomArbitrary(min, max) {
       return Math.random() * (max - min) + min;

}

bot.loadPlugin(cmd)


const express = require("express");
const mineflayer = require("mineflayer");

const app = express();
const PORT = process.env.PORT || 3000;

// мини-сайт
app.get("/", (req, res) => {
  res.send("AFK bot is running");
});

// запуск сайта
app.listen(PORT, () => {
  console.log("Web server started on port " + PORT);
});


// ───── Minecraft бот ─────
const bot = mineflayer.createBot({
  host: "АДРЕС_СЕРВЕРА",
  port: 25565,
  username: "AFK_Bot"
});

bot.on("login", () => {
  console.log("Bot logged in");
});

bot.on("error", err => console.log(err));
bot.on("end", () => console.log("Bot disconnected"));


bot.on('login',function(){
	console.log("Logged In")
	bot.chat("hello");
});

bot.on('time', function(time) {
	if(nightskip == "true"){
	if(bot.time.timeOfDay >= 13000){
	bot.chat('/time set day')
	}}
    if (connected <1) {
        return;
    }
    if (lasttime<0) {
        lasttime = bot.time.age;
    } else {
        var randomadd = Math.random() * maxrandom * 20;
        var interval = moveinterval*20 + randomadd;
        if (bot.time.age - lasttime > interval) {
            if (moving == 1) {
                bot.setControlState(lastaction,false);
                moving = 0;
                lasttime = bot.time.age;
            } else {
                var yaw = Math.random()*pi - (0.5*pi);
                var pitch = Math.random()*pi - (0.5*pi);
                bot.look(yaw,pitch,false);
                lastaction = actions[Math.floor(Math.random() * actions.length)];
                bot.setControlState(lastaction,true);
                moving = 1;
                lasttime = bot.time.age;
                bot.activateItem();
            }
        }
    }
});

bot.on('spawn',function() {
    connected=1;
});

bot.on('death',function() {
    bot.emit("respawn")
});


