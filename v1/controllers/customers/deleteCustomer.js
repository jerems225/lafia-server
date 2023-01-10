const customerModel = require("../../models/customer-model");
const { removeUser } = require("../businessLogic/users/remove-user");
const { validateId } = require("../businessLogic/validObjectId");

async function deleteCustomer(req, res) {
    const customer_uuid = req.params.customer_uuid;
    const validId = validateId(customer_uuid);
    if (validId) {
        const customer = await customerModel.findById(customer_uuid);
        if(customer)
        {
            const deleteCustomer = await customerModel.deleteOne({ _id: customer_uuid });
            if (deleteCustomer) {
                //remove user
                await removeUser(customer.userId);

                res.status(201).json({
                    status: 201,
                    message: "Customer delete successfully !",
                    data: null
                });
            }
            else {
                res.status(401).json({
                    status: 401,
                    message: "Customer not found !",
                    data: null
                })
            }
        }
        else
        {
            res.status(401).json({
                status: 401,
                message: "Customer not found !",
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
    deleteCustomer: deleteCustomer
}