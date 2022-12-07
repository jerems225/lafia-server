const riderModel = require("../../models/Rider-model");

async function updateRider(req,res)
{
    const uuid = req.params.rider_uuid;
    const rider = await riderModel.findById(uuid);
    if(rider)
    {
        const updateRider = await riderModel.updateOne({_id: uuid, $set: {
                    lastname : lastname,
                    fisrtname : firstname,
                    status: "pending",
                    userId : userId,
                    updatedAt : new Date()
                }}
            );
        if(updateRider)
        {
            res.status(201).json({
                status: 201,
                message: "Rider updated successfully !",
                data: await riderModel.findById(uuid)
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
            message: "Rider not found !",
            data: null
        });
    }
}

module.exports = {
    updateRider : updateRider
}