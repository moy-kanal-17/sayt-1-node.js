const {
  addNewEditHistory,
  getAllEditHistories,
  getEditHistoryById,
  deleteEditHistoryById,
  updateEditHistoryById,
} = require("../controllers/editHistories.controller");

const userAdminGuard = require("../middleware/guards/user.admin.guard");
const userGuard = require("../middleware/guards/user.guard");

const router = require("express").Router();

router.post("/", userGuard, userAdminGuard, addNewEditHistory);
router.get("/", getAllEditHistories);
router.get("/:id", getEditHistoryById);
router.delete("/:id", userGuard, userAdminGuard, deleteEditHistoryById);
router.put("/:id", userGuard, userAdminGuard, updateEditHistoryById);

module.exports = router;
