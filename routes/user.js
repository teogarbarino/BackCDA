const User = require("../models/User");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

router.put('/:username', async (req, res) => {
  const { username } = req.params;
  const { email} = req.body;

  try {
    // Find the user by their username
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the user's email and classe fields
    user.email = email;
    user.username= username;

    // Save the updated user to the database
    await user.save();

    // Return the updated user object
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports=router