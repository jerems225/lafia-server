const ownerModel = require("../../models/Owner-model");

async function updateOwner(req,res)
{
    const uuid = req.params.owner_uuid;
    const owner = await ownerModel.findById(uuid);
    if(owner)
    {
        const updateOwner = await ownerModel.updateOne({_id: uuid, $set: {
                    lastname : lastname,
                    fisrtname : firstname,
                    address : address,
                    referrer: referrer,
                    status: "pending",
                    userId : userId,
                    updatedAt : new Date()
                }}
            );
        if(updateOwner)
        {
            res.status(201).json({
                status: 201,
                message: "Owner updated successfully !",
                data: await ownerModel.findById(uuid)
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

module.exports = {
    updateOwner : updateOwner
}