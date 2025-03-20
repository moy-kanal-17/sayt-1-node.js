const {
  addNewWordCategory,
  getAllWordCategories,
  getWordCategoryById,
  deleteWordCategoryById,
  updateWordCategoryById,
} = require("../controllers/wordCategories.controller");

const userAdminGuard = require("../middleware/guards/user.admin.guard");
const userGuard = require("../middleware/guards/user.guard");

const router = require("express").Router();

router.post("/",userGuard,userAdminGuard, addNewWordCategory);
router.get("/", getAllWordCategories);
router.get("/:id", getWordCategoryById);
router.delete("/:id", userGuard, userAdminGuard, deleteWordCategoryById);
router.put("/:id", userGuard, userAdminGuard, updateWordCategoryById);

module.exports = router;
