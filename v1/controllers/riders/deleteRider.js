const riderModel = require("../../models/rider-model");
const { removeUser } = require("../businessLogic/users/remove-user");
const { validateId } = require("../businessLogic/validObjectId");

async function deleteRider(req, res) {
    try {
        const user_uuid = req.params.user_uuid;
        const validId = validateId(user_uuid);
        if (validId) {
            const rider = await riderModel.findOne({ userId: user_uuid });
            if (rider) {
                const deleteRider = await riderModel.deleteOne({ _id: user_uuid });
                if (deleteRider) {
                    //remove user
                    await removeUser(rider.userId);

                    res.status(201).json({
                        status: 201,
                        message: "Rider delete successfully !",
                        data: null
                    });
                }
                else {
                    res.status(401).json({
                        status: 401,
                        message: "Rider not found !",
                        data: null
                    })
                }
            }
            else {
                res.status(401).json({
                    status: 401,
                    message: "This user is not a rider !",
                    data: null
                })
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
    catch (e) {
        res.status(500).json({
            status: 500,
            message: `An error server try occurred, Please again or check the message error : ${e.message} !`,
            data: e.message
        })
    }
}

module.exports = {
    deleteRider: deleteRider
}