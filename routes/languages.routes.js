const {
  addNewLanguage,
  getAllLanguages,
  getLanguageById,
  deleteLanguageById,
  updateLanguageById,
} = require("../controllers/languages.controller");

const userAdminGuard = require("../middleware/guards/user.admin.guard");
const userGuard = require("../middleware/guards/user.guard");

const router = require("express").Router();

router.post("/", userGuard, userAdminGuard, addNewLanguage);
router.get("/", getAllLanguages);
router.get("/:id", getLanguageById);
router.delete("/:id", userGuard, userAdminGuard, deleteLanguageById);
router.put("/:id", userGuard, userAdminGuard, updateLanguageById);

module.exports = router;
