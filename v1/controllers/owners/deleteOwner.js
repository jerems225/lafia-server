const ownerModel = require("../../models/owner-model");
const { validateId } = require("../businessLogic/validObjectId");

async function deleteOwner(req,res)
{
    const owner_uuid = req.params.owner_uuid;
    const validId = validateId(owner_uuid);
    if(validId)
    {
        const deleteOwner = await ownerModel.remove({_id: owner_uuid});
        if(deleteOwner)
        {
            res.status(201).json({
                status:201,
                message: "Owner delete successfully !",
                data: null
            });
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
    deleteOwner : deleteOwner
}