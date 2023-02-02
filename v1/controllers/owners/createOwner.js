const ownerModel = require("../../models/owner-model");
const userModel = require("../../models/user-model");
const { validateId } = require("../businessLogic/validObjectId");

async function createOwner(userId) {
    try {
        const validId = validateId(userId);
        if (validId) {
            const user = await userModel.findById(userId);
            if (user) {
                const ownerObjet = {
                    status: "pending",
                    userId: userId,
                    createdAt: new Date()
                };
                const data = new ownerModel(ownerObjet);
                data.save(async (err, result) => {
                    if (err) {
                        console.log({
                            status: 500,
                            message: "Somethings wrong, try again or check the error message",
                            data: err.message
                        })
                    }
                    else {
                        await userModel.updateOne({ _id: userId }, {
                            $set: {
                                role: "owner"
                            }
                        })
                        console.log('Owner Created succesfully !!')
                    }
                })
            }
            else {
                console.log({
                    message: "User not found !",
                })
            }
        }
        else {
            console.log({
                message: "Invalid ID",
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
    createOwner: createOwner
}