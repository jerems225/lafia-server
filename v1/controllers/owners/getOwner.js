const ownerModel = require("../../models/owner-model");
const userModel = require("../../models/user-model");
const { validateId } = require("../businessLogic/validObjectId");

async function getOwners(req, res) {
    const owner = await ownerModel.find();
    res.status(201).json({
        status: 201,
        message: "Successfull get all owner",
        data: owner
    });
}

async function getOwner(req, res) {
    const user_uuid = req.params.user_uuid;
    const validId = validateId(user_uuid);
    if (validId) {
        const owner = await ownerModel.findOne({ userId: user_uuid });
        if (owner) {
            const user = await userModel.findById(owner.userId);
            res.status(201).json({
                status: 201,
                message: "Owner found successfully !",
                data: {
                    owner: owner,
                    user: user
                }
            })
        }
        else {
            res.status(401).json({
                status: 401,
                message: "This user is not a Owner!",
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

module.exports = {
    getOwners: getOwners,
    getOwner: getOwner
}