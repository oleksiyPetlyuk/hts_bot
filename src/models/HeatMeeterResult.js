const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HeatMeeterResultSchema = new Schema({
    accumulatedEnergy: mongoose.Decimal128,
    accumulatedVolume: mongoose.Decimal128,
    date: Date,
    errorCode: Number,
    currentHeatPower: mongoose.Decimal128,
    currentHeatStream: mongoose.Decimal128,
    inTemperature: mongoose.Decimal128,
    outTemperature: mongoose.Decimal128,
    workingTime: Object
}, { timestamps: true })

module.exports = mongoose.model('HeatMeeterResult', HeatMeeterResultSchema)
