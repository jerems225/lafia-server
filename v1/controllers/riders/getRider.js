const riderModel = require("../../models/rider-model");
const { validateId } = require("../businessLogic/validObjectId");

async function getRiders(req,res)
{
    const rider = await riderModel.find();
    res.status(201).json({
        status: 201,
        message: "Successfull get all Rider",
        data: rider
    });
}

async function getRider(req,res)
{
    const rider_uuid = req.params.rider_uuid;
    const validId = validateId(rider_uuid);
    if(validId)
    {
        const rider = await riderModel.findById(rider_uuid);
        if(rider)
        {
            res.status(201).json({
                status: 201,
                message: "Rider found successfully !",
                data: rider
            })
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
    getRiders : getRiders,
    getRider : getRider
}