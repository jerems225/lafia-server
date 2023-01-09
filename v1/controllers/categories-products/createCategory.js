const companyModel = require("../../models/company-model");
const categoryProductModel = require("../../models/category-product-model");
const { validateId } = require("../businessLogic/validObjectId")

async function createCategory(req,res)
{
    const { name, description, companyId, userId } = req.body;
    const validId = validateId(companyId);
    if(validId)
    {
        const company = await companyModel.findById(companyId);
        if(company)
        {
            if(company.ownerId == userId)
            {
                const categoryProduct = await categoryProductModel.findOne({ name : name });
                if(!categoryProduct)
                {
                    const categoryObjet = {
                        name: name,
                        description: description,
                        companyId: companyId,
                        createdAt: new Date(),
                    };
                    const data = new categoryProductModel(categoryObjet);
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
                                message: "Category Product created successfully !",
                                data: result
                            })
                        }
                    })
                }
                else
                {
                    res.status(401).json({
                        status: 401,
                        message: "This category product is already exist, try to change the name !",
                        data: null
                    });
                }
            }
            else
            {
                res.status(401).json({
                    status: 401,
                    message: "This user is not allow to perform this endpoint, you needs to be the owner of this company",
                    data: null
                });
            }
            
        }
        else
        {
            res.status(401).json({
                status: 401,
                message: "Company not found !",
                data: null
            });
        }
    }
    else
    {
        res.status(500).json({
            status: 500,
            message: "Invalid ID",
            data: null
        });
    }
}

module.exports = {
    createCategory : createCategory
}