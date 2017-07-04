var os = require('os'),
    request = require('request');

var _headers = {
    "User-Agent": "back4app/back4app-cli",
}

module.exports = {
    getLatestVersion: function() {
        return new Promise((resolve, reject) => {
            request({
                uri: "https://parsecli.back4app.com/supported?version=latest",
                headers: _headers,
            }, (error, response, body) => {
                var jsonData = JSON.parse(body);
                resolve(jsonData.version);
            });
        });
    },
    binaryName: function() {
        var platform = os.platform();
        switch (platform) {
            case "darwin":
                return "b4a";
            case "win32":
                return "b4a.exe"
            default:
                return "b4a_linux";
        }
    },
    downloadBinary: function(version, stream) {
        var path = "/back4app/parse-cli/releases/download/release_" + version + "/";
        request({
            uri: "https://github.com" + path + this.binaryName(),
            headers: _headers,
            followRedirect: true,
        }).pipe(stream);
    },
}
