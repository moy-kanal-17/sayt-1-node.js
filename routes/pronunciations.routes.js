const {
  addNewPronunciation,
  getAllPronunciations,
  getPronunciationById,
  deletePronunciationById,
  updatePronunciationById,
} = require("../controllers/pronunciations.controller");

const userAdminGuard = require("../middleware/guards/user.admin.guard");
const userGuard = require("../middleware/guards/user.guard");

const router = require("express").Router();

router.post("/", userGuard, userAdminGuard, addNewPronunciation);
router.get("/", getAllPronunciations);
router.get("/:id", getPronunciationById);
router.delete("/:id", userGuard, userAdminGuard, deletePronunciationById);
router.put("/:id", userGuard, userAdminGuard, updatePronunciationById);

module.exports = router;
