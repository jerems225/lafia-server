const categoryCompanyModel = require('../../models/category-company-model');
const userModel = require('../../models/user-model');
const { validateId } = require('../businessLogic/validObjectId');


async function updateCategory(req, res) {
    try {
        const category_uuid = req.params.category_uuid;
        const { name, description, userId } = req.body;
        const validId = validateId(category_uuid);
        if (validId) {
            const user = await userModel.findById(userId);
            if (user) {
                const categoryCompany = await categoryCompanyModel.findById(category_uuid);
                if (categoryCompany) {
                    const updateCategory = await categoryCompanyModel.updateOne({
                        _id: company_uuid
                    }, {
                        $set: {
                            name: name,
                            description: description,
                            updatedAt: new Date(),
                        }
                    }
                    );
                    if (updateCategory) {
                        res.status(201).json({
                            status: 201,
                            message: "Category Company updated successfully !",
                            data: await categoryCompanyModel.findById(category_uuid)
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
                        message: "Category Company not found !",
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
    catch (e) {
        res.status(500).json({
            status: 500,
            message: "An error server try occurred, Please again or check the message error !",
            data: e.message
        })
    }


}

module.exports = {
    updateCategory: updateCategory
}