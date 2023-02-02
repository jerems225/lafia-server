const companyModel = require("../../models/company-model");
const { validateId } = require("../businessLogic/validObjectId");

async function getCompanies(req, res) {
    const companies = await companyModel.find({ status: "accepted" });
    res.status(201).json({
        status: 201,
        message: "Successfull get all companies",
        data: companies
    });
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
    getCompany: getCompany
}