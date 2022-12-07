const ownerModel = require("../../models/owner-model");

async function getOwner(req,res)
{
    const owner = await customerModel.find();
    res.status(201).json({
        status: 201,
        message: "Successfull get all owner",
        data: owner
    });
}

async function getOwner(req,res)
{
    const owner_uuid = req.params.owner_uuid;
    const owner = await ownerModel.findById(owner_uuid);
    if(owner)
    {
        res.status(201).json({
            status: 201,
            message: "Owner found successfully !",
            data: owner
        })
    }
    else
    {
        res.status(401).json({
            status: 401,
            message: "Owner not found !",
            data: null
        })
    }
}

module.exports = {
    getOwners : getOwners,
    getOwner : getOwner
}