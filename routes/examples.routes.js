const {
  addNewExample,
  getAllExamples,
  getExampleById,
  deleteExampleById,
  updateExampleById,
} = require("../controllers/examples.controller");

const userAdminGuard = require("../middleware/guards/user.admin.guard");
const userGuard = require("../middleware/guards/user.guard");

const router = require("express").Router();

router.post("/", userGuard, userAdminGuard, addNewExample);
router.get("/", getAllExamples);
router.get("/:id", getExampleById);
router.delete("/:id", userGuard, userAdminGuard, deleteExampleById);
router.put("/:id", userGuard, userAdminGuard, updateExampleById);

module.exports = router;
