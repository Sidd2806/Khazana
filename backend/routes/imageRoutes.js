const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Serve image file
router.get('/:filename', (req, res) => {
  try {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, '../public/pictures', filename);
    
    // Security: prevent directory traversal
    if (!filepath.startsWith(path.join(__dirname, '../public/pictures'))) {
      return res.status(403).send('Forbidden');
    }

    if (fs.existsSync(filepath)) {
      res.sendFile(filepath);
    } else {
      res.status(404).send('Image not found');
    }
  } catch (error) {
    res.status(500).send('Error serving image');
  }
});

module.exports = router;
