const ownerModel = require("../../models/owner-model");
const { validateId } = require("../businessLogic/validObjectId");

async function updateOwner(req, res) {
    try {
        const user_uuid = req.params.user_uuid;
        const { lastname, firstname, address } = req.body;
        const validId = validateId(user_uuid);
        if (validId) {
            const owner = await ownerModel.findOne({ userId: user_uuid });
            if (owner) {
                const updateOwner = await ownerModel.updateOne({
                    _id: owner._id
                }, {
                    $set: {
                        lastName: lastname,
                        firstName: firstname,
                        address: address,
                        updatedAt: new Date()
                    }
                }
                );
                if (updateOwner) {
                    res.status(201).json({
                        status: 201,
                        message: "Owner updated successfully !",
                        data: await ownerModel.findById(owner._id)
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
                    message: "This user is not a Owner !",
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
    catch (e) {
        res.status(500).json({
            status: 500,
            message: "An error server try occurred, Please again or check the message error !",
            data: e.message
        })
    }


}

module.exports = {
    updateOwner: updateOwner
}