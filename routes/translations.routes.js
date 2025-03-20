const {
  addNewTranslation,
  getAllTranslations,
  getTranslationById,
  deleteTranslationById,
  updateTranslationById,
} = require("../controllers/translations.controller");

const userAdminGuard = require("../middleware/guards/user.admin.guard");
const userGuard = require("../middleware/guards/user.guard");

const router = require("express").Router();

router.post("/", userGuard, userAdminGuard, addNewTranslation);
router.get("/", getAllTranslations);
router.get("/:id", getTranslationById);
router.delete("/:id", userGuard, userAdminGuard, deleteTranslationById);
router.put("/:id", userGuard, userAdminGuard, updateTranslationById);

module.exports = router;
