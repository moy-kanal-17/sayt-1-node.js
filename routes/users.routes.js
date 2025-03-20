const {
  addNewUser,
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUserById,
  loginUser,
  logoutUser,
  refreshTokenUser,
  activateUser,
} = require("../controllers/users.controller");
const userAdminGuard = require("../middleware/guards/user.admin.guard");

const userGuard = require("../middleware/guards/user.guard");
const userSelfGuard = require("../middleware/guards/user.self.guard");

const router = require("express").Router();

router.post("/", addNewUser);
router.get("/",  getAllUsers);//userAdminGuard,userGuard,
router.get("/activate/:link", activateUser);
router.get("/:id",  getUserById);//userGuard, userSelfGuard,
router.delete("/:id", deleteUserById);
router.put("/:id", updateUserById);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/refresh", refreshTokenUser);
// router.get("/search", getAllUsersByUser);
// router.get("/Username/:Username", getByUserName);

module.exports = router;
