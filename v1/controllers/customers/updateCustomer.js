const customerModel = require("../../models/customer-model");
const userModel = require("../../models/user-model");

async function updateCustomer(req,res)
{
    const uuid = req.params.customer_uuid;
    const customer = await customerModel.findById(uuid);
    if(customer)
    {
        const updateCustomer = await customerModel.updateOne({_id: uuid, $set: {
                    lastname : lastname,
                    fisrtname : firstname,
                    address : address,
                    userId : userId,
                    updatedAt : new Date()
                }}
            );
        if(updateCustomer)
        {
            res.status(201).json({
                status: 201,
                message: "Customer updated successfully !",
                data: await customerModel.findById(uuid)
            });
        }
        else
        {
            res.status(500).json({
                status: 201,
                message: "Somethings wrong, try again",
                data: null
            });
        }
    }
    else
    {
        res.status(401).json({
            status: 401,
            message: "Customer not found !",
            data: null
        });
    }
}

module.exports = {
    updateCustomer : updateCustomer
}