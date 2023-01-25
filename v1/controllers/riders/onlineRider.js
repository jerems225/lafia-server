const riderModel = require("../../models/rider-model");
const { validateId } = require("../businessLogic/validObjectId");

async function onlineRider(req, res)
{
    const { user_uuid, isOnline } = req.body;
    const validId = validateId(user_uuid);
    if(validId)
    {
        riderModel.findOneAndUpdate({ userId: user_uuid}, { $set : {
            isOnline : isOnline
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
                let message = '';
                if(isOnline)
                {
                    message = "You're Online !";
                }
                else
                {
                    message = "You're Offline";
                }
                res.status(201).json({
                    status: 201,
                    message: message
                })
            }
        })
    }
    else
    {
        res.status(500).json({
            status: 500,
            message: "Invalid ID"
        })
    }
}

module.exports = {
    onlineRider : onlineRider
}