const orderModel = require("../../models/order-model");
const { validateId } = require("../businessLogic/validObjectId");

async function cancelOrder(req, res)
{
    const order_uuid = req.params.order_uuid;
    const validId = validateId(order_uuid);
    if(validId)
    {
        const order = await orderModel.findById(order_uuid);
        if(order)
        {
            const canceledOrder = await orderModel.updateOne({_id : order_uuid}, {$set: {
                status : "canceled"
            }});

            if(canceledOrder)
            {
                res.status(201).json({
                    status: 201,
                    message: "Order canceled successfully",
                    data: await orderModel.findById(order_uuid)
                });
            }
            else
            {
                res.status(401).json({
                    status: 401,
                    message: "Something wrong with the request!",
                    data: null
                });
            }
        }
        else
        {
            res.status(401).json({
                status: 401,
                message: "Order not found !",
                data: null
            });
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
    cancelOrder : cancelOrder
}