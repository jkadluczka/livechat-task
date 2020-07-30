const chatRoutes = require("./chat_routes");

module.exports = function (app, database) {
  chatRoutes(app, database);
};
