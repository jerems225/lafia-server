const riderModel = require("../../models/rider-model");
const { validateId } = require("../businessLogic/validObjectId");

async function updateRider(req, res) {
    const user_uuid = req.params.user_uuid;
    const { status } = req.body;
    const validId = validateId(user_uuid);
    if (validId) {
        const rider = await riderModel.findOne({ userId: user_uuid });
        if (rider) {
            const updateRider = await riderModel.updateOne({
                _id: rider_uuid}, {$set: {
                    status: status,
                    updatedAt: new Date()
                }
            }
            );
            if (updateRider) {
                res.status(201).json({
                    status: 201,
                    message: "Rider updated successfully !",
                    data: await riderModel.findOne({ userId: user_uuid })
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