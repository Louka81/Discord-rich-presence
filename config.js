let clientID = ""; // Your clientID from your application

/*
Placeholders: (Used for statusMsg)

%RAM% - Displays the amount of ram being used by this program
*/

let statusMsg = [
    {
        details: "Details 1", // The top line of the presence
        state: "State 1" // The bottom line of the presence
    },
    {
        details: "Details 2",
        state: "State 2"
    }
]

let statusSettings = {
    random: true, // Pick random status messages ^
    delay: 5000, // Milliseconds - Must be above 1000
}

let timeSettings = {
    enabled: true,
    countdown: { // Displays "00:00:00 Left"
        enabled: false,
        time: 1595003884, // In unix timestamp https://www.epochconverter.com/
    },
    elapsed: { // Displays "00:00 Elapsed"
        enabled: true,

    }
}

let images = { // Your images that you uploaded to your application
    large: 'bluefox',
    small: 'bluefox'
}

let instance = true; // Do not change

module.exports = {
    clientID,
    statusMsg,
    statusSettings,
    timeSettings,
    images,
    instance
}