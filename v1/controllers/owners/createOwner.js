const ownerModel = require("../../models/owner-model");
const userModel = require("../../models/user-model");

async function createOwner(req,res)
{
    const { lastname, firstname, address, referrer, userId  } = req.body;
    const user = await userModel.findById(userId);
    if(user)
    {
        const ownerObjet = {
            lastname : lastname,
            fisrtname : firstname,
            address : address,
            referrer: referrer,
            status: "pending",
            userId : userId,
            createdAt : new Date()
        };
        const data = new ownerModel(ownerObjet);
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
                    message: "owner created successfully !",
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
    createOwner : createOwner
}