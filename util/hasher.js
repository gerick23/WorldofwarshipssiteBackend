const bcrypt = require('bcrypt')


function hasher(passwordhash){
    const saltrounds= 10;
    const salt = bcrypt.genSalt(saltrounds)
    const password = bcrypt.hash(passwordhash,salt);
    return password
}

export {hasher}