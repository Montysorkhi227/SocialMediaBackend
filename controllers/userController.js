const User = require("../models/User");
const user = require("../models/User");


//Follow User
exports.followUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);
    if (!userToFollow) {
      return res.status(404).json({ message: "User not found" });
    }
    if (currentUser.following.includes(userToFollow._id)) {
      return res
        .status(400)
        .json({ message: "You are already following this user" });
    }
    currentUser.following.push(userToFollow._id);
    await currentUser.save();
    userToFollow.followers.push(currentUser._id);
    await userToFollow.save();
    return res.status(200).json({ message: "User followed successfully" });
  } catch (error) {
    console.log(error);
     return res.status(500).json({ message: "an unknown Error Occured in catch block" });
  }
};


//Unfollow User
exports.unfollowUser = async (req, res) => {
  const { id } = req.params;

  try {
    const userToUnfollow = await User.findById(id);
    const currentUser = await User.findById(req.user._id);

    if (!userToUnfollow) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!currentUser.following.includes(userToUnfollow._id)) {
      return res
        .status(400)
        .json({ message: "You are not following this user" });
    }

    // Use $pull to remove references
    await User.findByIdAndUpdate(currentUser._id, {
      $pull: { following: userToUnfollow._id }
    });

    await User.findByIdAndUpdate(userToUnfollow._id, {
      $pull: { followers: currentUser._id }
    });

    return res.status(200).json({ message: "User unfollowed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An unknown error occurred", error: error.message });
  }
};


