var Area = require('./area.js');
var Exit = require('./exit.js');
var Feature = require('./feature.js');

var worldMap = {};

// worldMap.backroom = require('./areas/backroom.js');
// worldMap.studio = require('./areas/studio.js');
// worldMap.farmhouse = require('./areas/farmhouse.js');
// worldMap.wheatfield = require('./areas/wheatfield.js');
// worldMap.end = require('./areas/end.js');
worldMap.road = require('./areas/road.js');
worldMap.bridge = require('./areas/bridge.js');
worldMap.woods = require('./areas/woods.js');
worldMap.bog = require('./areas/bog.js');
worldMap.clearing = require('./areas/clearing.js');
worldMap.boulder = require('./areas/boulder.js');

module.exports = worldMap;
