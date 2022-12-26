const riderModel = require("../../models/rider-model");
const userModel = require("../../models/user-model");
const { validateId } = require("../businessLogic/validObjectId");

async function createRider(req,res)
{
    const { lastname, firstname, userId  } = req.body;
    const validId = validateId(userId);
    if(validId)
    {
        const user = await userModel.findById(userId);
        if(user)
        {
            const riderObjet = {
                lastName : lastname,
                firstName : firstname,
                status: "pending",
                userId : userId,
                createdAt : new Date()
            };
            const data = new riderModel(riderObjet);
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
                        message: "Rider created successfully !",
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
    createRider : createRider
}