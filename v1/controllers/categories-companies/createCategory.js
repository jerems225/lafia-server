const categoryCompanyModel = require('../../models/category-company-model');
const userModel = require('../../models/user-model');
const { validateId } = require('../businessLogic/validObjectId');


async function createCategory(req, res) {
    try {
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
                        image: "https://retailvisie-1.cdn.prod.mas.media-artists.nl/image/2ca70656-7a11-41fa-bb57-d4e6326d13a8/b2665398-b88c-11e6-86a8-e38d1ad8ed1e/1200x800/category.jpg?rev=1512992443",
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
    catch (e) {
        res.status(500).json({
            status: 500,
            message: "An error server try occurred, Please again or check the message error !",
            data: e.message
        })
    }


}

module.exports = {
    createCategory: createCategory
}