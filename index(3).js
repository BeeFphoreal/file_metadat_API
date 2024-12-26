var express = require('express');
var cors = require('cors');
const multer = require('multer');
require('dotenv').config()

var app = express();
const upload = multer({dest : 'uploads/' })

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse/', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    console.log('error', err)
    res.status(404).json({ error : 'no file uploaded'});
  }


const metadata = {
  name: req.file.originalname,
  type: req.file.mimetype,
  size: req.file.size
};

console.log(metadata);

return res.json(metadata);

})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
