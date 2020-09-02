const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/DemodaraAsapuwaApp-FrontEnd'))
app.get('*', (req, res) => {
  res.sendFile('.dist/DemodaraAsapuwaApp-FrontEnd/index.html');
});
app.listen(process.env.PORT || 8080);
