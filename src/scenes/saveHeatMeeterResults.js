const WizardScene = require('telegraf/scenes/wizard/index')
const strings = require('../strings.json')

const params = {
    accumulatedEnergy: null,
    accumulatedVolume: null,
    date: null,
    errorCode: null,
    currentHeatPower: null,
    currentHeatStream: null,
    inTemperature: null,
    outTemperature: null,
    workingTime: {
        d: null,
        D: null
    }
}

const step1 = async (ctx) => {
    await ctx.replyWithMarkdown(strings.saveHeatMeeterResultsQuestions.init)

    await ctx.replyWithMarkdown(strings.saveHeatMeeterResultsQuestions.accumulatedEnergy)

    return ctx.wizard.next()
}

const step2 = async (ctx) => {
    params.accumulatedEnergy = ctx.message.text

    await ctx.reply(strings.saveHeatMeeterResultsQuestions.accumulatedVolume)

    return ctx.wizard.next()
}

const step3 = async (ctx) => {
    params.accumulatedVolume = ctx.message.text

    await ctx.reply(strings.saveHeatMeeterResultsQuestions.date)

    return ctx.wizard.next()
}

const step4 = async (ctx) => {
    params.date = ctx.message.text

    await ctx.reply(strings.saveHeatMeeterResultsQuestions.errorCode)

    return ctx.wizard.next()
}

const step5 = async (ctx) => {
    params.errorCode = ctx.message.text

    await ctx.reply(strings.saveHeatMeeterResultsQuestions.currentHeatPower)

    return ctx.wizard.next()
}

const step6 = async (ctx) => {
    params.currentHeatPower = ctx.message.text

    await ctx.reply(strings.saveHeatMeeterResultsQuestions.currentHeatStream)

    return ctx.wizard.next()
}

const step7 = async (ctx) => {
    params.currentHeatStream = ctx.message.text

    await ctx.reply(strings.saveHeatMeeterResultsQuestions.inTemperature)

    return ctx.wizard.next()
}

const step8 = async (ctx) => {
    params.inTemperature = ctx.message.text

    await ctx.reply(strings.saveHeatMeeterResultsQuestions.outTemperature)

    return ctx.wizard.next()
}

const step9 = async (ctx) => {
    params.outTemperature = ctx.message.text

    await ctx.reply(strings.saveHeatMeeterResultsQuestions.workingTime.step1)

    return ctx.wizard.next()
}

const step10 = async (ctx) => {
    params.workingTime.d = ctx.message.text

    await ctx.reply(strings.saveHeatMeeterResultsQuestions.workingTime.step2)

    return ctx.wizard.next()
}

const step11 = async (ctx) => {
    params.workingTime.D = ctx.message.text

    let message = `*${strings.params.accumulatedEnergy}:* ${params.accumulatedEnergy}\n`
    message += `*${strings.params.accumulatedVolume}:* ${params.accumulatedVolume}\n`
    message += `*${strings.params.date}:* ${params.date}\n`
    message += `*${strings.params.errorCode}:* ${params.errorCode}\n`
    message += `*${strings.params.currentHeatPower}:* ${params.currentHeatPower}\n`
    message += `*${strings.params.currentHeatStream}:* ${params.currentHeatStream}\n`
    message += `*${strings.params.inTemperature}:* ${params.inTemperature}\n`
    message += `*${strings.params.outTemperature}:* ${params.outTemperature}\n`
    message += `*${strings.params.workingTime.d}:* ${params.workingTime.d}\n`
    message += `*${strings.params.workingTime.D}:* ${params.workingTime.D}\n`

    await ctx.replyWithMarkdown(message)

    return ctx.scene.leave()
}

const scene = new WizardScene(
    'saveHeatMeeterResults',
    (ctx) => step1(ctx),
    (ctx) => step2(ctx),
    (ctx) => step3(ctx),
    (ctx) => step4(ctx),
    (ctx) => step5(ctx),
    (ctx) => step6(ctx),
    (ctx) => step7(ctx),
    (ctx) => step8(ctx),
    (ctx) => step9(ctx),
    (ctx) => step10(ctx),
    (ctx) => step11(ctx)
)

scene.command('cancel', async ctx => {
    await ctx.reply('Bye!')

    return ctx.scene.leave()
})

module.exports = scene
