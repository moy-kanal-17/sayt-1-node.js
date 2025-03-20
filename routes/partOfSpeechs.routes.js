const {
  addNewPartOfSpeech,
  getAllPartOfSpeechs,
  getPartOfSpeechById,
  deletePartOfSpeechById,
  updatePartOfSpeechById,
} = require("../controllers/partOfSpeechs.controller");

const userAdminGuard = require("../middleware/guards/user.admin.guard");
const userGuard = require("../middleware/guards/user.guard");

const router = require("express").Router();

router.post("/", userGuard, userAdminGuard, addNewPartOfSpeech);
router.get("/", getAllPartOfSpeechs);
router.get("/:id", getPartOfSpeechById);
router.delete("/:id", userGuard, userAdminGuard, deletePartOfSpeechById);
router.put("/:id", userGuard, userAdminGuard, updatePartOfSpeechById);


module.exports = router;
