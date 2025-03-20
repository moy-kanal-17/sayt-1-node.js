const {
  addNewWord,
  getAllWords,
  deleteWordById,
  getAllWordsByWord,
  getWordById,
  updateWordById,
} = require("../controllers/words.controller");
const roleGuard = require("../middleware/guards/role.guard");
const userAdminGuard = require("../middleware/guards/user.admin.guard");
const userGuard = require("../middleware/guards/user.guard");

const router = require("express").Router();

router.post("/",userGuard,roleGuard(["admin","superadmin"]), addNewWord);
router.get("/",userGuard, getAllWords);
router.get("/search", roleGuard(["user","admin", "superadmin"]), getAllWordsByWord);
router.get("/:id", getWordById);
router.delete("/:id", roleGuard(["superadmin"]), deleteWordById);
router.put("/:id", roleGuard(["admin","superadmin"]), updateWordById
);

module.exports = router;
