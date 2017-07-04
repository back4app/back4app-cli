var fs = require('fs'),
    path = require('path'),
    b4a = require('../b4a'),
    binPath = 'bin_local';

if (!fs.existsSync(binPath)) {
    fs.mkdirSync(binPath);
}

console.log("Verifying latest back4app parse-cli version...");

b4a.getLatestVersion().then(function(version) {
    var output = path.join(binPath, b4a.binaryName());
    console.log("Downloading latest back4app parse-cli " + version + " binary...");
    b4a.downloadBinary(version, fs.createWriteStream(output));
    fs.chmodSync(output, '755');
});
