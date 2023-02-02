const companyModel = require("../../models/company-model");
const userModel = require('../../models/user-model');
const { validateId } = require("../businessLogic/validObjectId");

async function updateCompany(req, res) {
    try {
        const company_uuid = req.params.company_uuid;
        const { name, location, country, city, department, status, categoryCompanyId } = req.body;
        const validId = validateId(company_uuid);
        if (validId) {
            const company = await companyModel.findById(company_uuid);
            if (company) {
                const updateCompany = await companyModel.updateOne({
                    _id: company_uuid
                }, {
                    $set: {
                        name: name,
                        location: location,
                        country: country,
                        city: city,
                        department: department,
                        categoryCompanyId: categoryCompanyId,
                        status: status,
                        updatedAt: new Date(),
                    }
                }
                );
                if (updateCompany) {
                    res.status(201).json({
                        status: 201,
                        message: "Company updated successfully !",
                        data: await companyModel.findById(company_uuid)
                    });
                }
                else {
                    res.status(500).json({
                        status: 201,
                        message: "Somethings wrong, try again",
                        data: null
                    });
                }
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

module.exports = {
    updateComapny: updateCompany
}