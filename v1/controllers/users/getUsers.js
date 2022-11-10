async function getUsers(req,res, next){
    const uuid = req.uuid;
    //call access control function for authorised rule to perfum this middleware
    //if true send datas
    const users = [];

    res.json({
        status: 200,
        message: "Success",
        data: users
    })
}

module.exports = {
    getUsers
}