const companyModel = require("../../models/company-model");
const orderModel = require("../../models/order-model");
const riderModel = require("../../models/rider-model");
const { validateId } = require("../businessLogic/validObjectId");

async function getOrdersByCompany(req, res)
{
    const company_uuid = req.params.company_uuid;
    const validId = validateId(company_uuid);
    if(validId)
    {
        const company = await companyModel.findById(company_uuid);
        if(company)
        {
            res.status(201).json({
                status: 201,
                message: "Company Orders found successfully !",
                data: await orderModel.find({ companyId : company_uuid })
            });
        }
        else
        {
            res.status(401).json({
                status: 401,
                message: "Company not found !",
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

async function getOrdersByRider(req, res)
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
                message: "Rider Orders found successfully !",
                data: await orderModel.find({ riderId : rider_uuid })
            });
        }
        else
        {
            res.status(401).json({
                status: 401,
                message: "rider not found !",
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

async function getOrder(req, res)
{
    const order_uuid = req.params.order_uuid;
    const validId = validateId(order_uuid);
    if(validId)
    {
        const order = await orderModel.findById(order_uuid);
        if(order)
        {
            res.status(201).json({
                status: 201,
                message: "Order found successfully !",
                data: order
            });
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
    getOrdersByCompany : getOrdersByCompany,
    getOrdersByRider : getOrdersByRider,
    getOrder : getOrder
}