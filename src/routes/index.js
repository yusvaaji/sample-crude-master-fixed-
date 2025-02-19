const fs = require('fs');
const path = require('path');

const routes = {};

fs.readdirSync(__dirname).forEach((file) => {
    if (file !== 'index.js' && file.endsWith('.js')) {
        console.log(file);

        const moduleName = path.basename(file, '.js');
        console.log(moduleName);
        
        routes[moduleName] = require(path.join(__dirname, file));
    }
});

module.exports = routes;
