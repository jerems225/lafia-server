const companyModel = require("../../models/company-model");
const userModel = require("../../models/user-model");
const { validateId } = require("../businessLogic/validObjectId");

async function getCompanies(req, res) {
    const status = req.query.status;
    const companies = await companyModel.find({ status: status?status:'accepted' });
    res.status(201).json({
        status: 201,
        message: `Successfull get all ${status} companies`,
        data: companies
    });
}


async function getCompaniesByOwner(req, res) {
    try {
        const owner_uuid = req.params.owner_uuid;
        const validId = validateId(owner_uuid);
        if (validId) {
            const owner = await userModel.findOne({_id: owner_uuid, role : "owner"});
            if (owner) {
                res.status(201).json({
                    status: 201,
                    message: "Owner's Companies found successfully !",
                    data: await companyModel.find({ ownerId : owner_uuid })
                });
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

async function getCompany(req, res) {
    try {
        const company_uuid = req.params.company_uuid;
        const validId = validateId(company_uuid);
        if (validId) {
            const company = await companyModel.findById(company_uuid);
            if (company) {
                res.status(201).json({
                    status: 201,
                    message: "Company found successfully !",
                    data: company
                });
            }
            else {
                res.status(401).json({
                    status: 401,
                    message: "company not found !",
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
    getCompanies: getCompanies,
    getCompany: getCompany,
    getCompaniesByOwner: getCompaniesByOwner,
}