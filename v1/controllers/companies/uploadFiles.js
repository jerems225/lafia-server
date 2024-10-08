require('dotenv').config()
const { BASE_URL } = process.env;
const { v4: uuidv4 } = require('uuid');
const { validateId } = require("../businessLogic/validObjectId");
const path = require('path');
const companyModel = require('../../models/company-model');

async function uploadFiles(req, res) {
    const company_uuid = req.params.company_uuid;
    const validIdCategory = validateId(company_uuid);
    if (validIdCategory) {
        const company = await companyModel.findById(company_uuid);
        if (company) {
            const files = req.files;
            if (files) {
                const image = files.image
                if(image)
                {
                    const extension = path.extname(image.name);
                    let mimetype = image.mimetype
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
                        });

                        var imagePath = BASE_URL + savePath + image.name
                    }
                    else {
                        res.status(401).json({
                            status: 401,
                            message: "Bad Files Extension, only .png .jpg .jpeg and .webp are available !",
                            data: image.mimetype
                        })
                    }
                }


                const registrationLicense = files.registrationLicense
                mimetype = registrationLicense.mimetype
                if(registrationLicense)
                {
                    const extension = path.extname(registrationLicense.name);
                    const mimetype = registrationLicense.mimetype
                    if (mimetype == 'application/pdf') {
                        const newFileName = "company-docs-" + uuidv4() + extension;
                        registrationLicense.name = newFileName;
                        const savePath = '/files/documents/companies/';
                        const path = '.' + savePath + registrationLicense.name;
                        registrationLicense.mv(path, async (err) => {
                            if (err) {
                                res.status(500).json({
                                    status: 500,
                                    message: "Somethings Wrong on server side, please check the error!",
                                    data: err
                                })
                            }
                        });
                        var registrationLicensePath = BASE_URL + savePath + registrationLicense.name;
                    }
                    else {
                        res.status(401).json({
                            status: 401,
                            message: "Bad Files Extension, only .pdf is available !",
                            data: registrationLicense.mimetype
                        })
                    }
                }

                const updateCompany = await companyModel.updateOne({
                    _id: company_uuid} , {$set: {
                        image: imagePath,
                        registrationLicense: registrationLicensePath,
                        updatedAt: new Date(),
                    }
            });


                if (updateCompany) {
                    res.status(201).json({
                        status: 201,
                        message: "Files upload successfully !",
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
    uploadFiles: uploadFiles
}