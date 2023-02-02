require('dotenv').config()
const { BASE_URL } = process.env;
const { v4: uuidv4 } = require('uuid');
const { validateId } = require("../businessLogic/validObjectId");
const path = require('path');
const ownerModel = require('../../models/owner-model');

async function uploadFiles(req, res) {
    try {
        const user_uuid = req.params.user_uuid;
        console.log(user_uuid)
        const validId = validateId(user_uuid);
        if (validId) {
            const owner = await ownerModel.findOne({ userId: user_uuid });
            if (owner) {
                const files = req.files;
                if (files) {
                    const idCardFront = files.idCardFront
                    if (idCardFront) {
                        const extension = path.extname(idCardFront.name);
                        let mimetype = idCardFront.mimetype
                        if (mimetype == "image/png" || mimetype == "image/jpg" || mimetype == "image/jpeg" || mimetype == "html/webp") {
                            const newFileName = "owner-idcardfront-image-" + uuidv4() + extension;
                            idCardFront.name = newFileName;
                            const savePath = '/files/documents/owners/';
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
                    mimetype = idCardBack.mimetype
                    if (idCardBack) {
                        const extension = path.extname(idCardBack.name);
                        const mimetype = idCardBack.mimetype
                        if (mimetype == "image/png" || mimetype == "image/jpg" || mimetype == "image/jpeg" || mimetype == "html/webp") {
                            const newFileName = "owner-idcardback-image-" + uuidv4() + extension;
                            idCardBack.name = newFileName;
                            const savePath = '/files/documents/owners/';
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

                    const updateOwner = await ownerModel.updateOne({
                        userId: user_uuid
                    }, {
                        $set: {
                            idCardFront: idCardFrontPath,
                            idCardBack: idCardBackPath,
                            updatedAt: new Date(),
                        }
                    });
                    if (updateOwner) {
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
                    message: "This user is not a owner !",
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