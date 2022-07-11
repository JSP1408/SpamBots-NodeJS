const mc = require('minecraft-protocol');
const randomstring = require('randomstring')
const config = require('./config.json')

setInterval(() => {
    addBot(config.host, config.port, randomstring.generate(Math.floor(Math.random() * 16) + 1))
}, config.connectionDelay);

function addBot(host, port, username) {
    var id = null

    const client = mc.createClient({
        host: host,
        port: port,
        username: username,
    });

    client.once('login', (data) => {
        console.log('Logged in!')

        if (config.spamChat === true) {
            id = setInterval(() => {
                if (config.randomChat === true) {
                    client.write('chat', { message: `/me ` + randomstring.generate(Math.floor(Math.random() * 31) + 1) })
                } else {
                    client.write('chat', { message: `/me ` + config.spamMessages[Math.floor(Math.random() * config.spamMessages.length)] })
                }

            }, config.chatDelay);

        }
    })

    client.once('end', (data) => {
        clearInterval(id)

        console.log('Bot ended!')
    })

    client.once('error', (data) => {
        clearInterval(id)

        console.log(`Bot error!`)
    })

}