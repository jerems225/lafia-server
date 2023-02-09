const riderModel = require("../../models/rider-model");
const userModel = require("../../models/user-model");
const { validateId } = require("../businessLogic/validObjectId");

async function getRidersByStatus(req, res) {
    let status = req.query.status
    status = status ? status : 'accepted';
    const riders = await riderModel.find({ status: status });
    var count = 0;
    var new_riders = [];
    riders.forEach((rider) => {
        userModel.findById(rider.userId).then((result, err) => {
            new_riders.push({
                rider: rider,
                user: result
            });

            count++;
            if( count == riders.length)
            {
                res.status(201).json({
                    status: 201,
                    message: `${status} riders found successfully !`,
                    data: new_riders
                });
            }
        })
    });

    if(riders.length == 0)
    {
        res.status(201).json({
            status: 201,
            message: `${status} riders found successfully !`,
            data: riders
        });
    }

}

function rangeByStatus(riders, status)
{
    var rangeRiders = [];
    riders.map((r) => {
        if(r.rider.status == status)
        {
            rangeRiders.push(r);
        }
    });

    return rangeRiders;
}

async function getRiders(req, res) {
    const riders = await riderModel.find();

    var count = 0;
    var new_riders = [];
    riders.forEach((rider) => {
        userModel.findById(rider.userId).then((result, err) => {
            new_riders.push({
                rider: rider,
                user: result
            });

            count++;
            if( count == riders.length)
            {
                res.status(201).json({
                    status: 201,
                    message: `All riders found successfully !`,
                    data: {
                        pendingRiders : rangeByStatus(new_riders, "pending"),
                        rejectedRiders: rangeByStatus(new_riders, "rejected"),
                        activatedRiders: rangeByStatus(new_riders, "accepted"),
                        desactivatedRiders: rangeByStatus(new_riders, "desactivated")
                    }
                });
            }
        })
    });

    if(riders.length == 0)
    {
        res.status(201).json({
            status: 201,
            message: `All riders found successfully !`,
            data: riders
        });
    }

}

async function getRider(req, res) {
    try {
        const user_uuid = req.params.user_uuid;
        const validId = validateId(user_uuid);
        if (validId) {
            const rider = await riderModel.findOne({ userId: user_uuid });
            if (rider) {
                res.status(201).json({
                    status: 201,
                    message: "Rider found successfully !",
                    data: {
                        rider : rider,
                        user : await userModel.findById(user_uuid)
                    }
                })
            }
            else {
                res.status(401).json({
                    status: 401,
                    message: "Rider not found !",
                    data: null
                })
            }
        }
        else {
            res.status(500).json({
                status: 500,
                message: "Invalid ID",
                data: null
            });
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
    getRiders : getRiders,
    getRidersByStatus: getRidersByStatus,
    getRider: getRider
}