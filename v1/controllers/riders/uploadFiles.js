require('dotenv').config()
const { BASE_URL } = process.env;
const { v4: uuidv4 } = require('uuid');
const { validateId } = require("../businessLogic/validObjectId");
const path = require('path');
const riderModel = require('../../models/rider-model');
const { createRider } = require('./createRider');

async function uploadFiles(req, res) {
    try {
        const user_uuid = req.params.user_uuid;
        console.log(user_uuid)
        const validId = validateId(user_uuid);
        if (validId) {
            const rider = await riderModel.findOne({ userId: user_uuid });
            if (rider) {
                const files = req.files;
                if (files) {
                    const idCardFront = files.idCardFront
                    if (idCardFront) {
                        const extension = path.extname(idCardFront.name);
                        let mimetype = idCardFront.mimetype
                        if (mimetype == "image/png" || mimetype == "image/jpg" || mimetype == "image/jpeg" || mimetype == "html/webp") {
                            const newFileName = "rider-idcardfront-image-" + uuidv4() + extension;
                            idCardFront.name = newFileName;
                            const savePath = '/files/documents/riders/';
                            const path = '.' + savePath + idCardFront.name;
                            idCardFront.mv(path, async (err) => {
                                if (err) {
                                    res.status(500).json({
                                        status: 500,
                                        message: "Somethings Wrong on server side, please check the error!",
                                        data: err
                                    })
                                }
                            });

                            var idCardFrontPath = BASE_URL + savePath + idCardFront.name
                        }
                        else {
                            res.status(401).json({
                                status: 401,
                                message: "Bad Files Extension, only .png .jpg .jpeg and .webp are available !",
                                data: idCardFront.mimetype
                            })
                        }
                    }
                    const idCardBack = files.idCardBack
                    if (idCardBack) {
                        const extension = path.extname(idCardBack.name);
                        const mimetype = idCardBack.mimetype
                        if (mimetype == "image/png" || mimetype == "image/jpg" || mimetype == "image/jpeg" || mimetype == "html/webp") {
                            const newFileName = "rider-idcardback-image-" + uuidv4() + extension;
                            idCardBack.name = newFileName;
                            const savePath = '/files/documents/riders/';
                            const path = '.' + savePath + idCardBack.name;
                            idCardBack.mv(path, async (err) => {
                                if (err) {
                                    res.status(500).json({
                                        status: 500,
                                        message: "Somethings Wrong on server side, please check the error!",
                                        data: err
                                    })
                                }
                            });
                            var idCardBackPath = BASE_URL + savePath + idCardBack.name;
                        }
                        else {
                            res.status(401).json({
                                status: 401,
                                message: "Bad Files Extension, only .pdf is available !",
                                data: idCardBack.mimetype
                            })
                        }
                    }

                    const driverLicenseFront = files.driverLicenseFront
                    if (driverLicenseFront) {
                        const extension = path.extname(driverLicenseFront.name);
                        const mimetype = driverLicenseFront.mimetype
                        if (mimetype == "image/png" || mimetype == "image/jpg" || mimetype == "image/jpeg" || mimetype == "html/webp") {
                            const newFileName = "rider-driverlicensefront-image-" + uuidv4() + extension;
                            driverLicenseFront.name = newFileName;
                            const savePath = '/files/documents/riders/';
                            const path = '.' + savePath + driverLicenseFront.name;
                            driverLicenseFront.mv(path, async (err) => {
                                if (err) {
                                    res.status(500).json({
                                        status: 500,
                                        message: "Somethings Wrong on server side, please check the error!",
                                        data: err
                                    })
                                }
                            });
                            var driverLicenseFrontPath = BASE_URL + savePath + driverLicenseFront.name;
                        }
                        else {
                            res.status(401).json({
                                status: 401,
                                message: "Bad Files Extension, only .pdf is available !",
                                data: driverLicenseFront.mimetype
                            })
                        }
                    }

                    const driverLicenseBack = files.driverLicenseBack
                    if (driverLicenseBack) {
                        const extension = path.extname(driverLicenseBack.name);
                        const mimetype = driverLicenseBack.mimetype
                        if (mimetype == "image/png" || mimetype == "image/jpg" || mimetype == "image/jpeg" || mimetype == "html/webp") {
                            const newFileName = "rider-driverlicenseback-image-" + uuidv4() + extension;
                            driverLicenseBack.name = newFileName;
                            const savePath = '/files/documents/riders/';
                            const path = '.' + savePath + driverLicenseBack.name;
                            driverLicenseBack.mv(path, async (err) => {
                                if (err) {
                                    res.status(500).json({
                                        status: 500,
                                        message: "Somethings Wrong on server side, please check the error!",
                                        data: err
                                    })
                                }
                            });
                            var driverLicenseBackPath = BASE_URL + savePath + driverLicenseBack.name;
                        }
                        else {
                            res.status(401).json({
                                status: 401,
                                message: "Bad Files Extension, only .pdf is available !",
                                data: driverLicenseBack.mimetype
                            })
                        }
                    }

                    const profileImage = files.profileImage
                    if (profileImage) {
                        const extension = path.extname(profileImage.name);
                        const mimetype = profileImage.mimetype
                        if (mimetype == "image/png" || mimetype == "image/jpg" || mimetype == "image/jpeg" || mimetype == "html/webp") {
                            const newFileName = "rider-profile-image-" + uuidv4() + extension;
                            profileImage.name = newFileName;
                            const savePath = '/files/documents/riders/';
                            const path = '.' + savePath + profileImage.name;
                            profileImage.mv(path, async (err) => {
                                if (err) {
                                    res.status(500).json({
                                        status: 500,
                                        message: "Somethings Wrong on server side, please check the error!",
                                        data: err
                                    })
                                }
                            });
                            var profileimagePath = BASE_URL + savePath + profileImage.name;
                        }
                        else {
                            res.status(401).json({
                                status: 401,
                                message: "Bad Files Extension, only .pdf is available !",
                                data: profileImage.mimetype
                            })
                        }
                    }

                    const updateRider = await riderModel.updateOne({
                        userId: user_uuid
                    }, {
                        $set: {
                            idCardFront: idCardFrontPath,
                            idCardBack: idCardBackPath,
                            driverLicenseFront: driverLicenseFrontPath,
                            driverLicenseBack: driverLicenseBackPath,
                            profileImage: profileimagePath,
                            updatedAt: new Date(),
                        }
                    });
                    if (updateRider) {
                        await createRider(user_uuid);
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
                    message: "This user is not a rider !",
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
    uploadFiles: uploadFiles
}