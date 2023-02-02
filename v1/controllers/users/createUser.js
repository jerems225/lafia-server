const userModel = require('../../models/user-model');
const { generatePassword, generateReferalCode } = require('../auth/auth');
const { checkUserExist } = require('../businessLogic/registration');
const { createCart } = require('../carts/createCart');
const send2fa = require('./2fa/send-2fa');

async function createUser(req, res) {
    try {
        const { firstName, lastName, address, email, password, phone, referrer } = req.body
        const UserExist = await checkUserExist(req.body);

        if (UserExist) {
            res.status(401).json(
                UserExist
            )
        }
        else {
            const user = {
                lastName: lastName,
                firstName: firstName,
                address: address,
                email: email,
                password: await generatePassword(password),
                phone: phone,
                role: "user",
                referalCode: await generateReferalCode(),
                secretCode: null,
                referrer: referrer,
                createdAt: new Date(),
            }

            //add data in database
            const data = new userModel(user);
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
                    await send2fa(result._id);
                    res.status(201).json({
                        status: 201,
                        message: "user created successfully",
                        data: result
                    });
                }
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
    createUser: createUser
}