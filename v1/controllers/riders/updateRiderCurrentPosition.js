const riderModel = require("../../models/rider-model");
const { validateId } = require("../businessLogic/validObjectId");

async function updateRiderCurrentPosition(req, res)
{
    const { user_uuid, current_position } = req.body;
    const validId = validateId(user_uuid);
    if(validId)
    {
        const rider = await riderModel.findByOne({ userId : user_uuid });
        if(rider)
        {
            riderModel.updateOne({ _id : rider._id }, {$set : {
                currentPosition : current_position
            }}).then((err, result) => {
                if(err)
                {
                    res.status(500).json({
                        status: 500,
                        message: "Somethings Wrong with the rider update status !",
                        data: err
                    });
                }
                else
                {
                    res.status(201).json({
                        status: 201,
                        message: "Rider current position updated successfully !"
                    })
                }
            }).catch(e => {
                res.status(500).json({
                    status: 500,
                    message: "Somethings Wrong with the rider update status !",
                    data: e
                });
            })
        }
        else
        {
            res.status(401).json({
                status: 401,
                message: "This user is not a rider",
            })
        }
    }
    else
    {
        res.status(500).json({
            status: 500,
            message: "Invalid ID"
        });
    }
}

module.exports = {
    updateRiderCurrentPosition : updateRiderCurrentPosition
}