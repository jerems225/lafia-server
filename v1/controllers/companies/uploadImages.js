require('dotenv').config()
const { BASE_URL } = process.env;
const { v4: uuidv4 } = require('uuid');
const { validateId } = require("../businessLogic/validObjectId");
const path = require('path');
const companyModel = require('../../models/company-model');

async function uploadImages(req, res) {
    const company_uuid = req.params.company_uuid;
    const validIdCategory = validateId(company_uuid);
    if (validIdCategory) {
        const company = await companyModel.findById(company_uuid);
        if (company) {
            const files = req.files;
            if (files) {
                const image = files.image
                const extension = path.extname(image.name);
                const mimetype = image.mimetype
                if (mimetype == "image/png" || mimetype == "image/jpg" || mimetype == "image/jpeg" || mimetype == "html/webp") {
                    const newFileName = "company-image-" + uuidv4() + extension;
                    image.name = newFileName;
                    const savePath = '/files/images/companies/';
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
                            const updateCompany = await  companyModel.updateOne({
                                _id: company_uuid, $set: {
                                    image: BASE_URL + savePath + image.name
                                }
                            });

                            if (updateCompany) {
                                res.status(201).json({
                                    status: 201,
                                    message: "Company Image created successfully !",
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

module.exports = {
    uploadImages: uploadImages
}