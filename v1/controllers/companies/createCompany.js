require('dotenv').config()
const { SERVICES_EMAIL } = process.env;
const companyModel = require('../../models/company-model');
const categoryCompanyModel = require('../../models/category-company-model');
const userModel = require('../../models/user-model');
const { validateId } = require('../businessLogic/validObjectId');
const { createOwner } = require('../owners/createOwner');
const ownerModel = require('../../models/owner-model');
const sendMail = require('../businessLogic/emails/send');


async function createCompany(req, res) {
    const { name, location, country, city, department, userId, categoryCompanyId } = req.body;
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
                        location: location,
                        country: country,
                        city: city,
                        department: department,
                        ownerId: userId,
                        categoryCompanyId: categoryCompanyId,
                        status: "pending",
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
                            const userAdmins = await userModel.find({ role : "admin" });
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

module.exports = {
    createCompany: createCompany
}