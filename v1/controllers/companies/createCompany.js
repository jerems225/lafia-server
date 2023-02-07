require('dotenv').config()
const companyModel = require('../../models/company-model');
const categoryCompanyModel = require('../../models/category-company-model');
const userModel = require('../../models/user-model');
const { validateId } = require('../businessLogic/validObjectId');
const { createOwner } = require('../owners/createOwner');
const ownerModel = require('../../models/owner-model');
const sendMail = require('../businessLogic/emails/send');


async function createCompany(req, res) {
    try {
        const { name, description, email, phone, location, country, city, department, userId, categoryCompanyId, website, facebook, instagram, twitter, linkedin } = req.body;
        const validId = validateId(userId);
        if (validId) {
            const user = await userModel.findById(userId);
            if (user) {
                const categoryCompany = await categoryCompanyModel.findById(categoryCompanyId);
                if (categoryCompany) {
                    const company = await companyModel.findOne({ name: name })
                    if (!company) {
                        const companyObjet = {
                            name: name,
                            description: description,
                            email: email,
                            phone: phone,
                            location: location,
                            country: country,
                            city: city,
                            department: department,
                            ownerId: userId,
                            categoryCompanyId: categoryCompanyId,
                            registrationLicense: "",
                            status: "pending",
                            image: "https://cdn.pixabay.com/photo/2013/07/13/11/31/shop-158317_960_720.png",
                            website: website? website : "",
                            facebook: facebook? facebook : "",
                            instagram: instagram? instagram : "",
                            twitter: twitter? twitter : "",
                            linkedin: linkedin? linkedin : "",
                            createdAt: new Date(),
                        };
                        const data = new companyModel(companyObjet);
                        data.save(async (err, result) => {
                            if (err) {
                                res.status(500).json({
                                    status: 500,
                                    message: "Somethings wrong, try again or check the error message",
                                    data: err.message
                                })
                            }
                            else {
                                const owner = await ownerModel.findOne({ userId: userId });
                                if (!owner) {
                                    await createOwner(userId);
                                }

                                //send email to admins
                                const userAdmins = await userModel.find({ role: "admin" });
                                let adminEmails = [];
                                userAdmins.forEach((u) => {
                                    adminEmails.push(u.email);
                                })

                                message = "Vous avez une nouvelle demande de validation d'entreprise disponible dans votre tableau de bord LAFIA, Une consultation rapide augmente l'experience utilisateur !";
                                await sendMail(adminEmails, "Nouvelle demande de validation d'entreprise", message);

                                res.status(201).json({
                                    status: 201,
                                    message: "Company created successfully !",
                                    data: result
                                })
                            }
                        })
                    }
                    else {
                        res.status(401).json({
                            status: 401,
                            message: "Company name already Exist, try to change the name!",
                            data: null
                        })
                    }

                }
                else {
                    res.status(401).json({
                        status: 401,
                        message: "Category Company not found !",
                        data: null
                    })
                }
            }
            else {
                res.status(401).json({
                    status: 401,
                    message: "User not found !",
                    data: null
                })
            }

        } else {
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
    createCompany: createCompany
}