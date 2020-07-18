function placeholderParse(str) {
    return str
        .replace("%RAM%", (`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`))

}

module.exports = {
    checkInternet,
    placeholderParse
}