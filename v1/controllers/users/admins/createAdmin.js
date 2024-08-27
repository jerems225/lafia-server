const { validateId } = require('../../businessLogic/validObjectId');
const userModel = require('../../../models/user-model');
const { generatePassword, generateReferalCode } = require('../../auth/auth');
const { checkUserExist } = require('../../businessLogic/registration');
const { createCart } = require('../../carts/createCart');
const sendMail = require('../../businessLogic/emails/send');

async function createAdmin(req, res) {
    try {
        const user_uuid = req.params.user_uuid;
        const validId = validateId(user_uuid);
        if(validId)
        {
            const user = await userModel.findOne({ _id: user_uuid, role: "admin"});
            if(user)
            {
                    const { firstName, lastName, email, password, phone } = req.body
                    const AdminExist = await checkUserExist(req.body);
            
                    if (AdminExist) {
                        res.status(401).json(
                            AdminExist
                        )
                    }
                    else {
                        const admin = {
                            lastName: lastName,
                            firstName: firstName,
                            address: "",
                            email: email,
                            password: await generatePassword(password),
                            phone: phone,
                            role: "admin",
                            referalCode: await generateReferalCode(),
                            secretCode: null,
                            referrer: "",
                            createdAt: new Date(),
                        }
            
                        //add data in database
                        const data = new userModel(admin);
                        data.save(async (err, result) => {
                            if (err) {
                                res.status(500).json({
                                    status: 500,
                                    message: "Somethings wrong, try again or check the error message",
                                    data: err.message
                                });
                            }
                            else {
                                //create new cart
                                cart = await createCart(result._id);
                                await sendMail(admin.email,"GESTIONNAIRE LAFIA", `Hello ${admin.firstName +" "+ admin.lastName}, vous avez ete ajoute comme gestionnaire du tableau de bord LAFIA !`)
                                res.status(201).json({
                                    status: 201,
                                    message: "Admin created successfully",
                                    data: result
                                });
                            }
                        });
                    }
            }
            else
            {
                res.status(401).json({
                    status: 401,
                    message: "User not found !",
                    data: null
                })
            }

        }
        else
        {
            res.status(500).json({
                status: 500,
                message: "INVALID ID",
                data: null
            })
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
    createAdmin: createAdmin
}