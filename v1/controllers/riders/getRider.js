const riderModel = require("../../models/rider-model");
const { validateId } = require("../businessLogic/validObjectId");

async function getRiders(req, res) {
    const rider = await riderModel.find();
    res.status(201).json({
        status: 201,
        message: "Successfull get all Rider",
        data: rider
    });
}

async function getRider(req, res) {
    try {
        const user_uuid = req.params.user_uuid;
        const validId = validateId(user_uuid);
        if (validId) {
            const rider = await riderModel.findOne({ userId: user_uuid });
            if (rider) {
                res.status(201).json({
                    status: 201,
                    message: "Rider found successfully !",
                    data: rider
                })
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
            message: "An error server try occurred, Please again or check the message error !",
            data: e.message
        })
    }


}

module.exports = {
    getRiders: getRiders,
    getRider: getRider
}