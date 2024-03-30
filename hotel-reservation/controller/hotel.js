const Hotel = require("../model/hotel");

exports.createReservation = async (req, res, next) => {

    try {
        const reservation = await Hotel.create(req.body);
        res.status(201).json({
             success:true,
            reservation
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}
exports.viewReservation = async (req, res, next) => {

    try {
        const reservation = await Hotel.findById(req.params.id);
        res.status(200).json({
            success: true,
            reservation
        })
    } catch (error) {
        next(error)
    }
}

exports.updateReservation = async (req, res, next) => {

    try {
        const reservation = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
        res.status(201).json({
            success: true,
            message: "Reservation Updated Successfully",
            reservation
        })

    } catch (error) {
        console.log(error);
        next(error);
    }
}