const ownerModel = require("../../models/Owner-model");
const { validateId } = require("../businessLogic/validObjectId");

async function updateOwner(req,res)
{
    const owner_uuid = req.params.owner_uuid;
    const { lastname, firstname,address, status, userId} = req.body;
    const validId = validateId(owner_uuid);
    if(validId)
    {
        const owner = await ownerModel.findById(owner_uuid);
        if(owner)
        {
            const updateOwner = await ownerModel.updateOne({_id: owner_uuid, $set: {
                        lastName : lastname,
                        firstName : firstname,
                        address : address,
                        status: status,
                        userId : userId,
                        updatedAt : new Date()
                    }}
                );
            if(updateOwner)
            {
                res.status(201).json({
                    status: 201,
                    message: "Owner updated successfully !",
                    data: await ownerModel.findById(owner_uuid)
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
                message: "Owner not found !",
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
    updateOwner : updateOwner
}