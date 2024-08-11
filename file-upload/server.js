const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Serve static files from the parent directory
app.use(express.static(path.join(__dirname, '..')));

// Directory where uploaded files are stored
const uploadDir = path.join(__dirname, '../upload');
console.log('Absolute upload directory:', uploadDir);

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
            console.log('Created upload directory');
        }
        cb(null, uploadDir);
    },
    filename: function(req, file, cb) {
        console.log('Uploading file:', file.originalname);
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Handle file upload
app.post('/upload', upload.array('files'), (req, res) => {
    if (req.files && req.files.length > 0) {
        res.send('File uploaded successfully');
    } else {
        res.send('No file uploaded');
    }
});

// List files in the upload directory
app.get('/files', (req, res) => {
    res.sendFile(path.join(__dirname, 'files.html'));
});

// List files in the upload directory
app.get('/list-files', (req, res) => {
    fs.readdir(uploadDir, (err, files) => {
        if (err) {
            return res.status(500).send('Error reading files');
        }
        res.json(files);
    });
});

// Handle file download
app.get('/download', (req, res) => {
    const filename = req.query.filename;

    if (filename) {
        const filePath = path.join(uploadDir, filename);

        // Check if the file exists
        if (fs.existsSync(filePath)) {
            res.download(filePath, filename, (err) => {
                if (err) {
                    res.status(500).send('Error downloading file');
                }
            });
        } else {
            res.status(404).send('File not found');
        }
    } else {
        res.status(400).send('No filename provided');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}`);
});