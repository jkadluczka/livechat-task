module.exports = function (app) {
  app.get('/chats', (req, res) => {
    res.send('hello');
  });
};
