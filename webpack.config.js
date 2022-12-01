const path = require('path');

module.exports = {
    entry: './build/Anmo.js',
    mode: 'production',
    output: {
        filename: 'anmojs-bundle.js',
        path: path.resolve(__dirname, 'bundle'),
        library: {
            name: 'Anmo',
            type: 'var',
            export: 'default',
        },
    }
}
