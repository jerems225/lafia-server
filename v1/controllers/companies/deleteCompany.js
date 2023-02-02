const companyModel = require("../../models/company-model");
const { validateId } = require("../businessLogic/validObjectId");

async function deleteCompany(req, res) {
    try {
        const company_uuid = req.params.company_uuid;
        const validId = validateId(company_uuid);
        if (validId) {
            const company = await companyModel.findById(company_uuid);
            if (company) {
                const deleteCompany = await companyModel.deleteOne({ _id: company_uuid });
                if (deleteCompany) {
                    res.status(201).json({
                        status: 201,
                        message: "Company delete successfully !",
                        data: null
                    });
                }
                else {
                    res.status(401).json({
                        status: 401,
                        message: "Company not found !",
                        data: null
                    })
                }
            }
            else {
                res.status(401).json({
                    status: 401,
                    message: "Company not found !",
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
            message: "An error server try occurred, Please again or check the message error !",
            data: e.message
        })
    }

}

module.exports = {
    deleteCompany: deleteCompany
}