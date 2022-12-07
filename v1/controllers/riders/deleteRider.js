const riderModel = require("../../models/rider-model");
const { validateId } = require("../businessLogic/validObjectId");

async function deleteRider(req,res)
{
    const rider_uuid = req.params.rider_uuid;
    const validId = validateId(rider_uuid);
    if(validId)
    {
        const deleteRider = await riderModel.remove({_id: rider_uuid});
        if(deleteRider)
        {
            res.status(201).json({
                status:201,
                message: "Rider delete successfully !",
                data: null
            });
        }
        else
        {
            res.status(401).json({
                status: 401,
                message: "Rider not found !",
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
    deleteRider : deleteRider
}