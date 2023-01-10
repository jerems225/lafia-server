const ownerModel = require("../../models/owner-model");
const userModel = require("../../models/user-model");
const { validateId } = require("../businessLogic/validObjectId");

async function createOwner(userId) {
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

module.exports = {
    createOwner: createOwner
}