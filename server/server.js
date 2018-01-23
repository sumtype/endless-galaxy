const express = require('express');
const app = module.exports = exports = express();
app.use(express.static(__dirname + '/build'));
var PORT = process.env.PORT || 9000;
module.exports.server = app.listen(PORT, () => console.log('Server running on port: ' + PORT));
