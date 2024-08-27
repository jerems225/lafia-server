const companyModel = require("../../models/company-model");
const orderModel = require("../../models/order-model");
const riderModel = require("../../models/rider-model");
const userModel = require("../../models/user-model");
const { validateId } = require("../businessLogic/validObjectId");

async function getOrdersByCompany(req, res) {
    try {
        const company_uuid = req.params.company_uuid;
        const validId = validateId(company_uuid);
        if (validId) {
            const company = await companyModel.findById(company_uuid);
            if (company) {
                res.status(201).json({
                    status: 201,
                    message: "Company Orders found successfully !",
                    data: await orderModel.find({ companyId: company_uuid })
                });
            }
            else {
                res.status(401).json({
                    status: 401,
                    message: "Company not found !",
                    data: null
                });
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
            message: "An error server try occurred, Please again or check the message error !",
            data: e.message
        })
    }

}

async function getOrdersByRider(req, res) {
    try {
        const rider_uuid = req.params.rider_uuid;
        const validId = validateId(rider_uuid);
        if (validId) {
            const rider = await riderModel.findById(rider_uuid);
            if (rider) {
                res.status(201).json({
                    status: 201,
                    message: "Rider Orders found successfully !",
                    data: await orderModel.find({ riderId: rider_uuid })
                });
            }
            else {
                res.status(401).json({
                    status: 401,
                    message: "rider not found !",
                    data: null
                });
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
            message: "An error server try occurred, Please again or check the message error !",
            data: e.message
        })
    }
}

async function getOrdersByCustomer(req, res) {
    try {
        const user_uuid = req.params.user_uuid;
        const validId = validateId(user_uuid);
        if (validId) {
            const user = await userModel.findById(user_uuid);
            if (user) {
                res.status(201).json({
                    status: 201,
                    message: "User Orders found successfully !",
                    data: await orderModel.find({ customerId: user_uuid })
                });
            }
            else {
                res.status(401).json({
                    status: 401,
                    message: "user not found !",
                    data: null
                });
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
            message: "An error server try occurred, Please again or check the message error !",
            data: e.message
        })
    }
}

async function getOrdersByOwner(req, res) {
    try {
        const owner_uuid = req.params.owner_uuid;
        const validId = validateId(owner_uuid);
        if (validId) {
            const owner = await userModel.findOne({ _id: owner_uuid, role:"owner" });
            if (owner) {
                //Get all owner companies
                const companies = await companyModel.find({ ownerId: owner_uuid}, '_id');
                let companyIds = [];
                companies.length != 0 ? companyIds = companies.map((company) => company._id) : [];

                //Get All orders by company ids
                const orders = await orderModel.find({ companyId: {$in : companyIds} });
                res.status(201).json({
                    status: 201,
                    message: "Owner Orders found successfully  !",
                    data: orders
                })
            }
            else {
                res.status(401).json({
                    status: 401,
                    message: "Owner not found !",
                    data: null
                });
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
            message: "An error server try occurred, Please again or check the message error !",
            data: e.message
        })
    }
}

function rangeByStatus(orders, status) {
    var rangeOrders = [];
    orders.map((o) => {
        if (o.status == status) {
            rangeOrders.push(o);
        }
    });

    return rangeOrders;
}

async function getOrders(req, res) {
    const orders = await orderModel.find()
    res.status(201).json({
        status: 201,
        message: `All Orders has been found successfully range by status!`,
        data: {
            pendingOrders: rangeByStatus(orders, "pending"),
            canceledOrders: rangeByStatus(orders, "canceled"),
            acceptedOrders: rangeByStatus(orders, "accepted"),
            deliveredOrders: rangeByStatus(orders, "delivered")
        }
    });
}

async function getOrdersByStatus(req, res) {
    const status = req.query.status;
    res.status(201).json({
        status: 201,
        message: `All ${status} Orders has been found successfully!`,
        data: await orderModel.find({ status: status })
    });
}

async function getOrder(req, res) {
    try {
        const order_uuid = req.params.order_uuid;
        const validId = validateId(order_uuid);
        if (validId) {
            const order = await orderModel.findById(order_uuid);
            if (order) {
                res.status(201).json({
                    status: 201,
                    message: "Order found successfully !",
                    data: order
                });
            }
            else {
                res.status(401).json({
                    status: 401,
                    message: "Order not found !",
                    data: null
                });
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
            message: "An error server try occurred, Please again or check the message error !",
            data: e.message
        })
    }

}

module.exports = {
    getOrdersByCompany: getOrdersByCompany,
    getOrdersByRider: getOrdersByRider,
    getOrdersByOwner: getOrdersByOwner,
    getOrdersByCustomer: getOrdersByCustomer,
    getOrdersByStatus: getOrdersByStatus,
    getOrders: getOrders,
    getOrder: getOrder
}