const userModel = require('../../models/user-model');
const customerModel = require('../../models/customer-model');


async function createCustomer(req,res)
{
    const { lastname, firstname, address, userId  } = req.body;
    const user = await userModel.findById(userId);
    if(user)
    {
        const customerObjet = {
            lastname : lastname,
            fisrtname : firstname,
            address : address,
            userId : userId,
            createdAt : new Date()
        };
        const data = new customerModel(customerObjet);
        data.save(async (err,result) => {
            if(err){
                res.status(500).json({
                    status: 500,
                    message: "Somethings wrong, try again or check the error message",
                    data: err.message
                })
            }
            else
            {
                res.status(201).json({
                    status: 201,
                    message: "Customer created successfully !",
                    data: result
                })
            }
        })
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

module.exports = {
    createCustomer : createCustomer
}