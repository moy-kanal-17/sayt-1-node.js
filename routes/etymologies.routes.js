const {
  addNewEtymology,
  getAllEtymologies,
  getEtymologyById,
  deleteEtymologyById,
  updateEtymologyById,
} = require("../controllers/etymologies.controller");

const userAdminGuard = require("../middleware/guards/user.admin.guard");
const userGuard = require("../middleware/guards/user.guard");

const router = require("express").Router();

router.post("/", userGuard, userAdminGuard, addNewEtymology);
router.get("/", getAllEtymologies);
router.get("/:id", getEtymologyById);
router.delete("/:id", userGuard, userAdminGuard, deleteEtymologyById);
router.put("/:id", userGuard, userAdminGuard, updateEtymologyById);

module.exports = router;
