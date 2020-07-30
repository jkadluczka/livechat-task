module.exports = function (app, database) {
  app.get('/chats', (req, res) => {
    res.send('hello');
  });
};
