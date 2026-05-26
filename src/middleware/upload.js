const multer = require('multer');

const path = require('path');

const fs = require('fs');

const { v4: uuidv4 } = require('uuid');

// ROOT UPLOAD FOLDER
const uploadDir =
  path.join(process.cwd(), 'uploads');

// CREATE uploads FOLDER
if (!fs.existsSync(uploadDir)) {

  fs.mkdirSync(uploadDir, {
    recursive: true
  });

}

// STORAGE CONFIG
const storage =
  multer.diskStorage({

    destination: (req, file, cb) => {

      // CREATE AGAIN FOR SAFETY
      if (!fs.existsSync(uploadDir)) {

        fs.mkdirSync(uploadDir, {
          recursive: true
        });

      }

      cb(null, uploadDir);

    },

    filename: (req, file, cb) => {

      const uniqueName =
        `${uuidv4()}${path.extname(file.originalname)}`;

      cb(null, uniqueName);

    }

  });

// FILE FILTER
const fileFilter =
  (req, file, cb) => {

    const allowed =
      [
        '.jpg',
        '.jpeg',
        '.png',
        '.pdf',
        '.doc',
        '.docx'
      ];

    const ext =
      path.extname(file.originalname)
        .toLowerCase();

    if (!allowed.includes(ext)) {

      return cb(
        new Error('Invalid file type')
      );

    }

    cb(null, true);

  };

// MULTER INSTANCE
const upload = multer({

  storage,

  fileFilter,

  limits: {

    fileSize:
      10 * 1024 * 1024 // 10MB

  }

});

module.exports = upload;