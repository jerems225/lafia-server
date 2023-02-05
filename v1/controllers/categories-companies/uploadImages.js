require('dotenv').config()
const { BASE_URL } = process.env;
const { v4: uuidv4 } = require('uuid');
const { validateId } = require("../businessLogic/validObjectId");
const path = require('path');
const categoryCompanyModel = require('../../models/category-company-model');

async function uploadImages(req, res) {
    try {
        const category_uuid = req.params.category_uuid;
        const validIdCategory = validateId(category_uuid);
        if (validIdCategory) {
            const category = await categoryCompanyModel.findById(category_uuid);
            if (category) {
                const files = req.files;
                // process.exit()
                if (files) {
                    const image = files.image
                    console.log(image);
                    const extension = path.extname(image.name);
                    if (extension == ".png" || extension == ".jpg" || extension == ".jpeg") {
                        const newFileName = "category-company-image-" + uuidv4() + extension;
                        image.name = newFileName;
                        const savePath = '/files/images/categories-companies/';
                        const path = '.' + savePath + image.name;
                        image.mv(path, async (err) => {
                            if (err) {
                                res.status(500).json({
                                    status: 500,
                                    message: "Somethings Wrong on server side, please check the error!",
                                    data: err
                                })
                            }
                            else {
                                const updateCategory = await categoryCompanyModel.updateOne({
                                    _id: category_uuid
                                }, {
                                    $set: {
                                        image: BASE_URL + savePath + image.name
                                    }
                                });

                                if (updateCategory) {
                                    res.status(201).json({
                                        status: 201,
                                        message: "Category Company Image created successfully !",
                                    })
                                }
                                else {
                                    res.status(500).json({
                                        status: 500,
                                        message: "Somethings Wrong on server side, please check the error!",
                                        data: null
                                    })
                                }

                            }
                        });
                    }
                    else {
                        res.status(401).json({
                            status: 401,
                            message: "Bad Files Extension, only png/jpg/jpeg/webp are available !",
                            data: extension
                        })
                    }
                }
                else {
                    res.status(401).json({
                        status: 401,
                        message: "No file uploaded",
                        data: null
                    });
                }
            }
            else {
                res.status(401).json({
                    status: 401,
                    message: "Category not found !",
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
    uploadImages: uploadImages
}