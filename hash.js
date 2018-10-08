const bcrypt = require("bcrypt");

async function runSalt() {

    let salt = await bcrypt.genSalt(10);
    console.log(salt);
    let hashed = await bcrypt.hash("1234", salt);
    console.log(hashed);
}

runSalt();