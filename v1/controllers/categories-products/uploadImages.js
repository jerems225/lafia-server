require('dotenv').config()
const { BASE_URL } = process.env;
const { v4: uuidv4 } = require('uuid');
const { validateId } = require("../businessLogic/validObjectId");
const path = require('path');
const categoryProductModel = require('../../models/category-product-model');

async function uploadImages(req, res) {
    const category_uuid = req.params.category_uuid;
    const validIdCategory = validateId(category_uuid);
    if (validIdCategory) {
        const category = await categoryProductModel.findById(category_uuid);
        if (category) {
            const files = req.files;
            if (files) {
                const image = files.image
                const extension = path.extname(image.name);
                const mimetype = image.mimetype
                if (mimetype == "image/png" || mimetype == "image/jpg" || mimetype == "image/jpeg" || mimetype == "html/webp") {
                    const newFileName = "category-product-image-" + uuidv4() + extension;
                    image.name = newFileName;
                    const savePath = '/files/images/categories-products/';
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
                            const updateCategory = await  categoryProductModel.updateOne({
                                _id: category_uuid}, {$set: {
                                    image: BASE_URL + savePath + image.name
                                }
                            });

                            if (updateCategory) {
                                res.status(201).json({
                                    status: 201,
                                    message: "Category Product Image created successfully !",
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
                        data: image.mimetype
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

module.exports = {
    uploadImages: uploadImages
}