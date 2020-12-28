const { Telegraf, Markup, Stage, session } = require('telegraf')
const strings = require('./strings.json')

require('dotenv').config()

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

bot.launch()
