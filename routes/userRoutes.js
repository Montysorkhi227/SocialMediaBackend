const express=require(
"express")
const router =express.Router();
const authMiddleware=require("../middleware/authmiddleware")
const {followUser,unfollowUser}=require("../controllers/userController"
);
router.post('/:id/follow',authMiddleware,followUser);
router.post('/:id/unfollow',authMiddleware,unfollowUser);

module.exports=router;