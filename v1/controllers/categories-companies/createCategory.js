const categoryCompanyModel = require('../../models/category-company-model');
const userModel = require('../../models/user-model');
const { validateId } = require('../businessLogic/validObjectId');


async function createCategory(req, res) {
    const { name, description, userId } = req.body;
    const validId = validateId(userId);
    if (validId) {
        const user = await userModel.findById(userId);
        if (user) {
            const categoryCompany = await categoryCompanyModel.findOne({ name: name });
            if (!categoryCompany) {
                const categoryObjet = {
                    name: name,
                    description: description,
                    createdAt: new Date(),
                };
                const data = new categoryCompanyModel(categoryObjet);
                data.save(async (err, result) => {
                    if (err) {
                        res.status(500).json({
                            status: 500,
                            message: "Somethings wrong, try again or check the error message",
                            data: err.message
                        })
                    }
                    else {
                        res.status(201).json({
                            status: 201,
                            message: "Category Company created successfully !",
                            data: result
                        })
                    }
                })
            }
            else {
                res.status(401).json({
                    status: 401,
                    message: "Category Company already exist !",
                    data: null
                })
            }


        }
        else {
            res.status(401).json({
                status: 401,
                message: "User not found!",
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
    createCategory: createCategory
}