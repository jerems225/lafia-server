const companyModel = require("../../models/company-model");
const userModel = require('../../models/user-model');
const { validateId } = require("../businessLogic/validObjectId");

async function updateCompany(req, res) {
    try {
        const company_uuid = req.params.company_uuid;
        const { name, description, email, phone, location, country, city, department, status, categoryCompanyId, website, facebook, instagram, twitter, linkedin } = req.body;
        const validId = validateId(company_uuid);
        if (validId) {
            const company = await companyModel.findById(company_uuid);
            if (company) {
                const updateCompany = await companyModel.updateOne({
                    _id: company_uuid
                }, {
                    $set: {
                        name: name,
                        description: description,
                        email: email,
                        phone: phone,
                        location: location,
                        country: country,
                        city: city,
                        department: department,
                        categoryCompanyId: categoryCompanyId,
                        status: status,
                        website: website,
                        facebook: facebook,
                        instagram: instagram,
                        twitter: twitter,
                        linkedin: linkedin,
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

async function changeStatus(req, res)
{
    try{
        const { user_uuid, status } = req.body;
        const company_uuid = req.params.company_uuid;
        const validUserId = validateId(user_uuid);
        const validCompanyId = validateId(company_uuid);
        if(validCompanyId & validUserId)
        {
            const user = await userModel.findById(user_uuid);
            if(user)
            {
                if(user.role == "admin")
                {
                    const company = await companyModel.findById(company_uuid);
                    if(company)
                    {
                        const updateCompany = await companyModel.updateOne({ _id : company_uuid }, {$set : {
                            status : status,
                            updatedAt : new Date()
                        }});

                        if(updateCompany)
                        {
                            res.status(201).json({
                                status: 201,
                                message: `Company request has been ${status} by the lafia service !!`,
                                data: null
                            })
                        }
                        else
                        {
                            res.status(500).json({
                                status: 500,
                                message: "Somethings wrong on this process : 'Change company status' !",
                                data: null
                            })
                        }
                    }
                    else
                    {
                        res.status(401).json({
                            status: 401,
                            message: "Company not found !!",
                            data: null
                        })
                    }
                }
                else
                {
                    res.status(401).json({
                        status: 401,
                        message: "You are not authorize to perform this action !!",
                        data: null
                    })
                }
            }
            else
            {
                res.status(401).json({
                    status: 401,
                    message: "User not found !",
                    data: bull
                })
            }
        }
        else
        {
            res.status(500).json({
                status: 500,
                message: "INVALID ID",
                data: null
            })
        }
    }
    catch(e){
        res.status(500).json({
            status: 500,
            message: "An error server try occurred, Please again or check the message error !",
            data: e.message
        })
    }
}

module.exports = {
    updateComapny: updateCompany,
    changeStatus : changeStatus
}