let startDate = new Date();

// Load dependencies
const moment = require('moment');
require('moment-duration-format');

// Temp config and helper vars
let c;
let helper;

// Try to load config.js
try {
    c = require("./config.js");
} catch(e) {
    console.error("Could not load or find \'config.js\'");
}

// Check if there is a clientID
if (!c.clientID) { return console.error("Ooops - You forgot to add your clientID in the \"config.js\"");}

// Try to load functions.js
try {
    helper = require("./modules/functions.js")
} catch (e) {
    console.error("Could not load or find \`/modules/functions.js\`");
}

// Create client RPC
let client = require('discord-rich-presence')(c.clientID);

// Start Message
console.log(`\x1b[37m`)
console.log(`\x1b[32m==========================================`)
console.log(`\x1b[33m   ClientID: ${c.clientID}`)
console.log(`\x1b[33m   Author: FlaringPhoenix#0001`)
console.log(`\x1b[32m==========================================`)
console.log(`\x1b[33m   Images: Large: ${c.images.large} Small: ${c.images.small}`)
console.log(`\x1b[33m   Time: ${c.timeSettings.enabled ? (c.timeSettings.countdown.enabled ? "Countdown System" : (c.timeSettings.elapsed.enabled ? "Elapsed System" : "Error")): "None"}`)
console.log(`\x1b[33m   StatusSettings: Random: ${c.statusSettings.random} Delay: ${c.statusSettings.delay}`)
console.log(`\x1b[33m   Statuses: ${c.statusMsg.length}`)
console.log(`\x1b[32m==========================================`)
console.log(`\x1b[37m`)

let now = new Date();

// Try to update presence
setInterval(async () => {

    let index = Math.floor(Math.random() * (c.statusMsg.length - 0) + 0);

    let running = moment.duration((new Date())-startDate).format(' D [days], H [hrs], m [mins], s [secs]');

    let s = c.statusSettings.random ? c.statusMsg[index].state : c.statusMsg[0].state;
    let d = c.statusSettings.random ? c.statusMsg[index].details : c.statusMsg[0].details;

    s = helper.placeholderParse(s);
    d = helper.placeholderParse(d);

    try {

        if (c.timeSettings.enabled) {
            if (c.timeSettings.countdown.enabled && !isNaN(c.timeSettings.countdown.time)) {
                await client.updatePresence({
                    state: s,
                    details: d,
                    startTimestamp: now,
                    endTimestamp: c.timeSettings.countdown.time,
                    largeImageKey: c.images.large ? c.images.large : null,
                    smallImageKey: c.images.small ? c.images.small : null,
                    instance: c.instance ? c.instance : true
                });
            } else if (c.timeSettings.elapsed.enabled) {
                await client.updatePresence({
                    state: s,
                    details: d,
                    startTimestamp: now,
                    largeImageKey: c.images.large ? c.images.large : null,
                    smallImageKey: c.images.small ? c.images.small : null,
                    instance: c.instance ? c.instance : true
                });
            }
        } else {
            await client.updatePresence({
                state: s,
                details: d,
                largeImageKey: c.images.large ? c.images.large : null,
                smallImageKey: c.images.small ? c.images.small : null,
                instance: c.instance ? c.instance : true
        });

        }
        console.log(`Updated Status: (Running for ${running})\n- Details: ${d}\n- State: ${s}`)
    } catch (e) {
        console.error(`Failed to update presence!`);
    }

}, isNaN(c.statusSettings.delay) && c.statusSettings.delay >= 1000 ? c.statusSettings.delay : 5000);

let endDate = new Date();

console.log(`Started! Took ${moment.duration(endDate-startDate).asMilliseconds()} Milliseconds`);