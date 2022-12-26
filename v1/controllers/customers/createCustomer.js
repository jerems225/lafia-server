const userModel = require('../../models/user-model');
const customerModel = require('../../models/customer-model');
const { validateId } = require('../businessLogic/validObjectId');


async function createCustomer(req, res) {
    const { lastname, firstname, address, userId } = req.body;
    const validId = validateId(userId);
    if (validId) {
        const user = await userModel.findById(userId);
        if (user) {
            const customerObjet = {
                lastName: lastname,
                firstName: firstname,
                address: address,
                userId: userId,
                createdAt: new Date()
            };
            const data = new customerModel(customerObjet);
            data.save(async (err, result) => {
                if (err) {
                    res.status(500).json({
                        status: 500,
                        message: "Somethings wrong, try again or check the error message",
                        data: err.message
                    })
                }
                else {
                    res.status(201).json({
                        status: 201,
                        message: "Customer created successfully !",
                        data: result
                    })
                }
            })
        }
        else {
            res.status(401).json({
                status: 401,
                message: "User not found !",
                data: null
            })
        }
    }else
    {
        res.status(500).json({
            status: 500,
            message: "Invalid ID",
            data: null
        });
    }

}

module.exports = {
    createCustomer: createCustomer
}