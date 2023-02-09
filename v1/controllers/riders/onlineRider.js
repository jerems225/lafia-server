const riderModel = require("../../models/rider-model");
const { validateId } = require("../businessLogic/validObjectId");

async function onlineRider(req, res)
{
    try{
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
            res.status(500).json({
                status: 500,
                message: "Invalid ID"
            })
        }
    }
    catch (e) {
        res.status(500).json({
            status: 500,
            message: `An error server try occurred, Please again or check the message error : ${e.message} !`,
            data: e.message
        })
    }

}

module.exports = {
    onlineRider : onlineRider
}