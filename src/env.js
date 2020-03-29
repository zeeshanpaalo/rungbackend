import minimst from "minimist";
import fs from "fs";

const argv = minimst[process.argv.slice(2)];
const configFile = argv['config'];
if (configFile) {
  const confifPath = `${process.cwd()}/${configFile}`;
  if (fs.existsSync(confifPath)) {
    console.log(`using ${configFile} File`);
    const config = require(confifPath);
    Object.keys(config).forEach(key => {
      process.env[key.toUpperCase()] = config[key];
    })
  }
}