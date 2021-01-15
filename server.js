const express = require('express')
const {spawn} = require('child_process');
const cors    = require('cors');
const multer  = require('multer');
var   path    = require('path');

const app     = express()
const port    = 80

// Function to process uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'python/input') //uploaded files are stored inside the folder ./python/input
    },
    filename: function (req, file, cb) {
        // filename example: layout-DATE-.ext
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)) 
    }
});
var upload = multer({storage: storage})


// Process JSON requests
app.use(express.json())

// Allows AJAX requests to skip the Same-origin policy and access resources from remote hosts
app.use(cors());

// Serve any static files
app.use(express.static(path.join(__dirname, '/client/build'))); // note the production path

// Router: home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html')); // note the production path
});

// Router: upload file
app.post('/upload', upload.single('file'), (req, res, next) => {
    return res.json({
        filename: req.file.filename
    });
});

// Router: optimize
app.post('/optimize', (req, res) => {
 
    var dataToSend;
    var python;
    console.log(req.body.post.optimization_type);
 
    if (req.body.post.optimization_type === "No Household") {
        // create a python process
        python = spawn('python', [__dirname +'/python/maximize_number_seats.py', 
                                    req.body.post.layout_filename, 
                                    req.body.post.social_distance]);
    }
    else { //household option
        python = spawn('python', [__dirname +'/python/fill_back_first.py', 
                                    req.body.post.layout_filename, 
                                    req.body.post.group_filename,
                                    req.body.post.social_distance]);

    }
    
    python.stdout.on('data', function (data) {
        dataToSend = data.toString().trim();
        console.log("[Printed by Python when running]: " + dataToSend)
    });

    python.on('close', (code) => {
        console.log("[Printed by Python when closed]: " + dataToSend)
        res.send(dataToSend)
    });
 
});

// Router: retrieve produced layout
app.post('/output', (req, res) => {
    file_name =  req.body.post.layout_filename
    index = file_name.lastIndexOf('.') 
    figure_path = __dirname +"/python/output/" + file_name.substr(0,index) + ".pdf"
    res.download(figure_path)
});

// Server is now running
app.listen(port, () => console.log(`Server listening on port ${port}!`))