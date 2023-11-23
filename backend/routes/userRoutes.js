const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetail,
  updatePassword,
  updateProfile,
  getallUsers,
  getSingleUser,
  deleteProfile,
  updateRoles,
} = require("../controllers/userController");
const { isUserAuthenticated, isAdmin } = require("../middleware/auth");
const router = express.Router();

//create user route
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isUserAuthenticated, getUserDetail);
router.route("/password/update").put(isUserAuthenticated, updatePassword);
router.route("/me/update").put(isUserAuthenticated, updateProfile);
router
  .route("/admin/users")
  .get(isUserAuthenticated, isAdmin("admin"), getallUsers);
router
  .route("/admin/user/:id")
  .get(isUserAuthenticated, isAdmin("admin"), getSingleUser);
router
  .route("/admin/user/delete/:id")
  .delete(isUserAuthenticated, isAdmin("admin"), deleteProfile);
router
  .route("/admin/user/:id")
  .put(isUserAuthenticated, isAdmin("admin"), updateRoles);

module.exports = router;
