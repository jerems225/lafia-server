const customerModel = require("../../models/customer-model");
const { validateId } = require("../businessLogic/validObjectId");

async function deleteCustomer(req,res)
{
    const customer_uuid = req.params.customer_uuid;
    const validId = validateId(customer_uuid);
    if(validId)
    {
        const deleteCustomer = await customerModel.remove({_id: customer_uuid});
        if(deleteCustomer)
        {
            res.status(201).json({
                status:201,
                message: "Customer delete successfully !",
                data: null
            });
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
    else
    {
        res.status(500).json({
            status: 500,
            message: "Invalid ID",
            data: null
        });
    }

}

module.exports = {
    deleteCustomer : deleteCustomer
}