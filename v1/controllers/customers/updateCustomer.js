const customerModel = require("../../models/customer-model");
const { validateId } = require("../businessLogic/validObjectId");

async function updateCustomer(req,res)
{
    const customer_uuid = req.params.customer_uuid;
    const { lastname, firstname, address, userId} = req.body;
    const validId = validateId(customer_uuid);
    if (validId)
    {
        const customer = await customerModel.findById(customer_uuid);
        if(customer)
        {
            const updateCustomer = await customerModel.updateOne({_id: customer_uuid, $set: {
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
                    data: await customerModel.findById(customer_uuid)
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
    updateCustomer : updateCustomer
}