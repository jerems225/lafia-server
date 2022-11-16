const bcrypt = require('bcrypt');

async function generatePassword(plainTextPassword)
{
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(plainTextPassword, salt);
}


module.exports = {
    generatePassword : generatePassword
}
  