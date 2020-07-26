/**
 * BlueFox Rich Presence - Developed by FlaringPhoenix.
 * All rights reserved 2020.
 * Creation Date: 7/18/2020
 */

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

let last = 0;

// Try to update presence
setInterval(async () => {

    let index = Math.floor(Math.random() * (c.statusMsg.length - 0) + 0);

    let running = moment.duration((new Date())-startDate).format(' D[d], H[h], m[m], s[s]');

    let s = c.statusSettings.random == true ? helper.placeholderParse(c.statusMsg[index].state) : helper.placeholderParse(c.statusMsg[last].state);
    let d = c.statusSettings.random == true ? helper.placeholderParse(c.statusMsg[index].details) : helper.placeholderParse(c.statusMsg[last].details);

    let largeHover = c.statusSettings.random ?  helper.placeholderParse(c.statusMsg[index].largeImageHover) :  helper.placeholderParse(c.statusMsg[last].largeImageHover);
    let smallHover = c.statusSettings.random ?  helper.placeholderParse(c.statusMsg[index].smallImageHover) :  helper.placeholderParse(c.statusMsg[last].smallImageHover);

    let partySize = c.statusSettings.random ? c.statusMsg[index].partySize : c.statusMsg[last].partySize;
    let partyMax = c.statusMsg.random ? c.statusMsg[index].partyMax : c.statusMsg[last].partyMax;

    if (last != (c.statusMsg.length-1)) {
        last=last+1;
    } else {
        last = 0;
    }

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
                    largeImageText: largeHover ? largeHover : null,
                    smallImageText: smallHover ? smallHover : null,
                    partySize: partySize,
                    partyMax: partyMax,
                    instance: c.instance ? c.instance : false
                });
            } else if (c.timeSettings.elapsed.enabled) {
                await client.updatePresence({
                    state: s,
                    details: d,
                    startTimestamp: now,
                    largeImageKey: c.images.large ? c.images.large : null,
                    smallImageKey: c.images.small ? c.images.small : null,
                    largeImageText: largeHover ? largeHover : null,
                    smallImageText: smallHover ? smallHover : null,
                    partySize: partySize,
                    partyMax: partyMax,
                    instance: c.instance ? c.instance : false
                });
            }
        } else {
            await client.updatePresence({
                state: s,
                details: d,
                largeImageKey: c.images.large ? c.images.large : null,
                smallImageKey: c.images.small ? c.images.small : null,
                largeImageText: largeHover ? largeHover : null,
                smallImageText: smallHover ? smallHover : null,
                partySize: partySize,
                partyMax: partyMax,
                instance: c.instance ? c.instance : true
        });

        }
        console.log(`Updated Status: [DURATION: ${running}] [RAM: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB]\n- Details: ${d}\n- State: ${s}\n- LargeImageHover: ${largeHover}\n- SmallImageHover: ${smallHover}`)
    } catch (e) {
        console.error(`Failed to update presence!`);
    }

}, c.statusSettings.delay >= 5000 ? c.statusSettings.delay : 5000);

let endDate = new Date();

console.log(`Started! Took ${moment.duration(endDate-startDate).asMilliseconds()} Milliseconds`);
