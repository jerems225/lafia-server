require('dotenv').config()
const { BASE_URL } = process.env;
const { v4: uuidv4 } = require('uuid');
const { validateId } = require("../businessLogic/validObjectId");
const path = require('path');
const productModel = require('../../models/product-model');

async function uploadImages(req, res) {
    const product_uuid = req.params.product_uuid;
    const validIdProduct = validateId(product_uuid);
    if (validIdProduct) {
        const product = await productModel.findById(product_uuid);
        if (product) {
            const images = req.files;
            if (images) {
                    const imagesValues = Object.values(images)
                    imagesValues.forEach( async (image) => {
                        const extension = path.extname(image.name);
                        const mimetype = image.mimetype
                        if (mimetype == "image/png" || mimetype == "image/jpg" || mimetype == "image/jpeg" || mimetype == "html/webp") {
                            const newFileName = "product-image-" + uuidv4() + extension;
                            image.name = newFileName;
                            const savePath = '/files/images/products/';
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
                                    const productImages = product.images;
                                    productImages.push(BASE_URL + savePath + image.name);
                                    const updateProduct = await productModel.updateOne({
                                        _id: product_uuid, $set: {
                                            images: productImages
                                        }
                                    });
    
                                    if (updateProduct) {
                                        res.status(201).json({
                                            status: 201,
                                            message: "Product Images created successfully !",
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
                                data: mainImage.mimetype
                            })
                        }
                    })
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
                message: "Product not found !",
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