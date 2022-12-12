const chokidar = require('chokidar');
const { exec } = require("child_process");
const prompt = require('prompt');
const express = require('express');
const path = require('path');

const app = express();
const port = 8000;

let buildingNow = false;
prompt.start();

const buildBundle = () => {
    buildingNow = true;
    exec("npm run build", (error, stdout, stderr) => {
        if (error || stderr) {
            console.log(`Build Error: ${error.message ?? stderr}`);
            buildingNow = false;
            return;
        }

        buildingNow = false;
        console.log(`stdout: ${stdout}`);
    });
}

// One-liner for current directory
console.log("Starting watcher...");
chokidar.watch('./src').on('all', (event, path) => {

    console.log(event, 'event occured on file:' ,path);

    if (buildingNow == false) buildBundle();
});


prompt.get(['command'], function (err, result) {
    if (err)  return onErr(err);

    console.log('Command-line input: ' + result.command);

    switch (result.command) {
        case "r":
            buildBundle()
            return;
    
        default: return;
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'bundle', 'anmojs-bundle.js'),)
})

app.listen(port, () => {
    console.log(`Serving build on port http://localhost:${port}`)
})