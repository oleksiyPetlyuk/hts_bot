const { Telegraf, Markup, Stage, session } = require('telegraf')
const mongoose = require('mongoose')

require('dotenv').config()

connect()

function listen() {
    const strings = require('./strings.json')
    const saveHeatMeeterResultsScene = require('./scenes/saveHeatMeeterResults')

    const bot = new Telegraf(process.env.TELEGRAM_TOKEN)
    const stage = new Stage([saveHeatMeeterResultsScene])

    bot.use(session())
    bot.use(stage.middleware())

    bot.start(async ctx => {
        const options = Markup.inlineKeyboard([
            Markup.callbackButton(strings.saveHeatMeeterResults, 'saveHeatMeeterResults')
        ]).extra()

        await ctx.reply(strings.start, options)
    })

    bot.command('save_heat_meeter_results', Stage.enter('saveHeatMeeterResults'))

    bot.action('saveHeatMeeterResults', Stage.enter('saveHeatMeeterResults'))

    let options = {}

    if (process.env.NODE_ENV !== 'production') {
        options = {}
    } else {
        options = {
            webhook: {
                hookPath: `/${process.env.TELEGRAM_TOKEN}`,
                port: process.env.PORT
            }
        }
    }

    bot.launch(options)
}

function connect() {
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.4lvmf.mongodb.net/${process.env.DB_DATABSE}?retryWrites=true&w=majority`

    mongoose.connection
        .on('error', console.error.bind(console, 'Error: '))
        .on('disconnected', connect)
        .once('open', listen)

    return mongoose.connect(uri, {
        keepAlive: 1,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}
