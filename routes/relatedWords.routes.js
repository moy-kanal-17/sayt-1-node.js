const {
  addNewRelatedWord,
  getAllRelatedWords,
  getRelatedWordById,
  deleteRelatedWordById,
  updateRelatedWordById,
} = require("../controllers/relatedWords.controller");

const userAdminGuard = require("../middleware/guards/user.admin.guard");
const userGuard = require("../middleware/guards/user.guard");

const router = require("express").Router();

router.post("/", userGuard, userAdminGuard, addNewRelatedWord);
router.get("/", getAllRelatedWords);
router.get("/:id", getRelatedWordById);
router.delete("/:id", userGuard, userAdminGuard, deleteRelatedWordById);
router.put("/:id", userGuard, userAdminGuard, updateRelatedWordById);


module.exports = router;
