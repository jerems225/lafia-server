const customerModel = require("../../models/customer-model");

async function getCustomers(req,res)
{
    const customers = await customerModel.find();
    res.status(201).json({
        status: 201,
        message: "Successfull get all customers",
        data: customers
    });
}

async function getCustomer(req,res)
{
    const customer_uuid = req.params.customer_uuid;
    const customer = await customerModel.findById(customer_uuid);
    if(customer)
    {
        res.status(201).json({
            status: 201,
            message: "Customer found successfully !",
            data: customer
        })
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

module.exports = {
    getCustomer : getCustomer,
    getCustomers : getCustomers
}