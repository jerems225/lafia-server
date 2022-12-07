const riderModel = require("../../models/rider-model");

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
    const rider = await riderModel.findById(rider_uuid);
    if(rider)
    {
        res.status(201).json({
            status: 201,
            message: "Rider found successfully !",
            data: Rider
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

module.exports = {
    getRiders : getRiders,
    getRider : getRider
}