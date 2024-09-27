const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    brandName: String,
    modelName: String,
    transmission: String,
    engineType: String,
    startPrice: Number,
    endPrice: Number,
    height: Number,
    width: Number,
    length: Number,
    seatingCapacity: Number,
    fuelType: String,
    fuelCapacity: Number,
    productImage: [],
    description: String,
    modelYear: Number,
    country: String,
    engineCc: Number,
    noOfDoors: Number,
    cityMileage: String,
    engineDisplacement: String,
    noOfCylinders: Number,
    maxPower: String,
    maxTorque: String,
    transmissionType: String,
    bootSpace: String,
    fuelTankCapacity: String,
    bodyType: String,
    groundClearanceUnladen: String,
    powerSteering: Boolean,
    antiLockBrakingSystem: Boolean,
    airConditioner: Boolean,
    driverAirbag: Boolean,
    passengerAirbag: Boolean,
    automaticClimateControl: Boolean,
    alloyWheels: Boolean,
    multiFunctionSteeringWheel: Boolean,
    engineStartStopButton: Boolean,
    variant: [{
        variantName: String,
        engineCC: Number,
        kmpl: String,
        price: Number
    }],
    carType: String
}, {
    timestamps: true
});

const productModel = mongoose.model("car_data", productSchema);

module.exports = productModel;
