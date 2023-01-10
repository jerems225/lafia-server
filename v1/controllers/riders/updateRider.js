const riderModel = require("../../models/rider-model");
const { validateId } = require("../businessLogic/validObjectId");

async function updateRider(req, res) {
    const rider_uuid = req.params.rider_uuid;
    const { lastname, firstname, status, userId } = req.body;
    const validId = validateId(rider_uuid);
    if (validId) {
        const rider = await riderModel.findById(rider_uuid);
        if (rider) {
            const updateRider = await riderModel.updateOne({
                _id: rider_uuid, $set: {
                    lastName: lastname,
                    firstName: firstname,
                    status: status,
                    userId: userId,
                    updatedAt: new Date()
                }
            }
            );
            if (updateRider) {
                res.status(201).json({
                    status: 201,
                    message: "Rider updated successfully !",
                    data: await riderModel.findById(rider_uuid)
                });
            }
            else {
                res.status(500).json({
                    status: 201,
                    message: "Somethings wrong, try again",
                    data: null
                });
            }
        }
        else {
            res.status(401).json({
                status: 401,
                message: "Rider not found !",
                data: null
            });
        }
    }
    else {
        res.status(500).json({
            status: 500,
            message: "Invalid ID",
            data: null
        });
    }

}

module.exports = {
    updateRider: updateRider
}