const bcrypt = require("bcrypt");
const hash = bcrypt.hashSync("abc123", 10);
console.log(hash);