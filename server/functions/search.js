const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust the path as needed

// Route to handle user search
router.get('/users/search', async (req, res) => {
  try {
    const { searchInput } = req.query;

    // Use a regular expression for a case-insensitive search
    const regex = new RegExp(searchInput, 'i');

    // Find users whose first or last name matches the search input
    const searchResults = await User.find({
      $or: [
        { firstName: regex },
        { lastName: regex },
      ],
    });

    res.json(searchResults);
  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
