const express = require('express');
const bodyParser = require('body-parser');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', chatRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
