const Flight = require("../model/flight");

exports.createFlight = async (req, res, next) => {

    try {
        const flight = await Flight.create(req.body);
        res.status(201).json({
             success:true,
            flight
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}
exports.viewFlight = async (req, res, next) => {

    try {
        const flight = await Flight.findById(req.params.id);
        res.status(200).json({
            success: true,
            flight
        })
    } catch (error) {
        next(error)
    }
}

exports.updateFlight = async (req, res, next) => {

    try {
        const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
        res.status(201).json({
            success: true,
            message: "Flight Updated Successfully",
            flight
        })

    } catch (error) {
        console.log(error);
        next(error);
    }
}