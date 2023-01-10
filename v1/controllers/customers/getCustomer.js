const customerModel = require("../../models/customer-model");
const { validateId } = require("../businessLogic/validObjectId");

async function getCustomers(req, res) {
    const customers = await customerModel.find();
    res.status(201).json({
        status: 201,
        message: "Successfull get all customers",
        data: customers
    });
}

async function getCustomer(req, res) {
    const customer_uuid = req.params.customer_uuid;
    const validId = validateId(customer_uuid);
    if (validId) {
        const customer = await customerModel.findById(customer_uuid);
        if (customer) {
            res.status(201).json({
                status: 201,
                message: "Customer found successfully !",
                data: customer
            });
        }
        else {
            res.status(401).json({
                status: 401,
                message: "Customer not found !",
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
    getCustomer: getCustomer,
    getCustomers: getCustomers
}