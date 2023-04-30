const bcrypt = require('bcrypt')


function hasher(passwordhash){
    const saltrounds= 10;
    const password = bcrypt.hashSync(passwordhash,saltrounds);
    return password
}

module.exports = hasher