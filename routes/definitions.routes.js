const {
  addNewDefinition,
  getAllDefinitions,
  getDefinitionById,
  deleteDefinitionById,
  updateDefinitionById,
} = require("../controllers/definitions.controller");

const userAdminGuard = require("../middleware/guards/user.admin.guard");
const userGuard = require("../middleware/guards/user.guard");

const router = require("express").Router();

router.post("/", userGuard, userAdminGuard, addNewDefinition);
router.get("/", getAllDefinitions);
router.get("/:id", getDefinitionById);
router.delete("/:id", userGuard, userAdminGuard, deleteDefinitionById);
router.put("/:id", userGuard, userAdminGuard, updateDefinitionById);

module.exports = router;
