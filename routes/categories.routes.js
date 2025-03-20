const { addNewCategory, getAllCategories, getCategoryById, deleteCategoryById, updateCategoryById } = require("../controllers/categories.controller");
const userAdminGuard = require("../middleware/guards/user.admin.guard");
const userGuard = require("../middleware/guards/user.guard");

const router = require("express").Router();

router.post("/", userGuard, userAdminGuard, addNewCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.delete("/:id", userGuard, userAdminGuard, deleteCategoryById);
router.put("/:id", userGuard, userAdminGuard, updateCategoryById);
module.exports = router;
