var Area = require('./area.js');
var Exit = require('./exit.js');
var Feature = require('./feature.js');

var worldMap = {};

worldMap.backroom = require('./areas/backroom.js');
worldMap.studio = require('./areas/studio.js');
worldMap.farmhouse = require('./areas/farmhouse.js');
worldMap.wheatfield = require('./areas/wheatfield.js');
worldMap.dirt_road = require('./areas/dirt_road.js');
worldMap.end = require('./areas/end.js');

module.exports = worldMap;
