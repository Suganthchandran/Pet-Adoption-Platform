// server/routes/users.js
const express = require('express');
const admin = require('../../firebase'); // Firebase Admin SDK
const router = express.Router();

router.get('/users', async (req, res) => {
  try {
    const usersList = [];
    const listUsers = async (nextPageToken) => {
      const result = await admin.auth().listUsers(1000, nextPageToken);
      usersList.push(...result.users);

      if (result.pageToken) {
        await listUsers(result.pageToken); // Recursively fetch the next page of users
      }
    };

    await listUsers();
    res.json(usersList); // Send back the list of users
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to load users' });
  }
});

module.exports = router;
