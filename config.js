let clientID = "733342259524927520"; // Your clientID from your application - https://discord.com/developers/applications

/*
Placeholders: (Used for statusMsg)

%RAM% - Displays the amount of ram being used by this program
*/

let statusMsg = [ // set largeImageHover or smallImageHover to "" to disable it
    {
        details: "Details 1", // The top line of the presence
        state: "State 1", // The bottom line of the presence
        largeImageHover: "Text", // Text on hover for large image
        smallImageHover: "Text" // Text on hover for small image
    },
    {
        details: "Details 2", // The top line of the presence
        state: "State 2", // The bottom line of the presence
        largeImageHover: "", // Text on hover for large image
        smallImageHover: "" // Text on hover for small image
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
