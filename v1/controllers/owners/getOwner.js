const ownerModel = require("../../models/owner-model");
const { validateId } = require("../businessLogic/validObjectId");

async function getOwners(req,res)
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
    const validId = validateId(userId);
    if(validId)
    {
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
    getOwners : getOwners,
    getOwner : getOwner
}