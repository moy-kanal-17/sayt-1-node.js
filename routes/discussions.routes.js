const { addNewDiscussion, getAllDiscussions, getDiscussionById, deleteDiscussionById, updateDiscussionById } = require("../controllers/discussions.controller");

const userAdminGuard = require("../middleware/guards/user.admin.guard");
const userGuard = require("../middleware/guards/user.guard");

const router = require("express").Router();

router.post("/", userGuard, userAdminGuard, addNewDiscussion);
router.get("/", getAllDiscussions);
router.get("/:id", getDiscussionById);
router.delete("/:id", userGuard, userAdminGuard, deleteDiscussionById);
router.put("/:id", userGuard, userAdminGuard, updateDiscussionById);

module.exports = router;
