/**
 * BlueFox Rich Presence - Developed by FlaringPhoenix.
 * All rights reserved 2020.
 * Creation Date: 7/18/2020
 */

/*
Placeholders: (Used for statusMsg)

%RAM% - Displays the amount of ram being used by this program
*/

let clientID = ""; // Your clientID from your application - https://discord.com/developers/applications

let statusMsg = [
    {
        details: "Details 1", // The top line of the presence
        state: "State 1", // The bottom line of the presence

        // Set either to "" to disable - Will be displayed on image hover
        largeImageHover: "Text", // Text on hover for large image
        smallImageHover: "Text", // Text on hover for small image

        // Set both to 0 to disable - Will display (size of max) next to the state
        partySize: 1,
        partyMax: 2
    },
    {
        details: "Details 2",
        state: "State 2",
        largeImageHover: "",
        smallImageHover: "",
        partySize: 0,
        partyMax: 0
    }
]

let statusSettings = {
    random: false, // Pick random status messages - Disabling this will cause it to go through the statuses in order
    delay: 5000, // Milliseconds - Must be above 5000 (Anything below will cause errors!)
}

let timeSettings = {
    enabled: false,
    countdown: { // Displays "00:00:00 Left"
        enabled: false,
        time: 1595003884, // In unix timestamp https://www.epochconverter.com/
    },
    elapsed: { // Displays "00:00 Elapsed"
        enabled: true,

    }
}

let images = { // Your images that you uploaded to your application - "" to disable an image
    large: 'bluefox',
    small: 'bluefox'
}

// Do not change
let instance = true;

// Do not edit/touch this!
module.exports = {
    clientID,
    statusMsg,
    statusSettings,
    timeSettings,
    images,
    instance
}
