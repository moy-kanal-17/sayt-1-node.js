const {
  addNewRelationType,
  getAllRelationTypes,
  getRelationTypeById,
  deleteRelationTypeById,
  updateRelationTypeById,
} = require("../controllers/relationTypes.controller");

const userAdminGuard = require("../middleware/guards/user.admin.guard");
const userGuard = require("../middleware/guards/user.guard");

const router = require("express").Router();

router.post("/", userGuard, userAdminGuard, addNewRelationType);
router.get("/", getAllRelationTypes);
router.get("/:id", getRelationTypeById);
router.delete("/:id", userGuard, userAdminGuard, deleteRelationTypeById);
router.put("/:id", userGuard, userAdminGuard, updateRelationTypeById);

module.exports = router;
