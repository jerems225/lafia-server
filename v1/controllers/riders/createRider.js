const riderModel = require("../../models/rider-model");
const userModel = require("../../models/user-model");
const sendMail = require("../businessLogic/emails/send");
const { validateId } = require("../businessLogic/validObjectId");

async function createRider(userId) {
    const validId = validateId(userId);
    if (validId) {
        const user = await userModel.findById(userId);
        if (user) {
            const riderObjet = {
                status: "pending",
                userId: userId,
                createdAt: new Date()
            };
            const data = new riderModel(riderObjet);
            data.save(async (err, result) => {
                if (err) {
                    res.status(500).json({
                        status: 500,
                        message: "Somethings wrong, try again or check the error message",
                        data: err.message
                    })
                }
                else {
                    await userModel.updateOne({ _id: userId }, {
                        $set: {
                            role: "rider"
                        }
                    })
                    //send email to admins
                    const userAdmins = await userModel.find({ role: "admin" });
                    let adminEmails = [];
                    userAdmins.forEach((u) => {
                        adminEmails.push(u.email);
                    })

                    message = "Vous avez une nouvelle demande de validation de livreur disponible dans votre tableau de bord LAFIA, Une consultation rapide augmente l'experience utilisateur !";
                    await sendMail(adminEmails, "Nouvelle demande de validation de livreur", message);
                    return true;
                }
            })
        }
        else {
            res.status(401).json({
                status: 401,
                message: "User not found !",
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
    createRider: createRider
}