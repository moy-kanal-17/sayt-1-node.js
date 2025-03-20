const router = require("express").Router();

const wordsRouter = require("./words.routes");
const usersRouter = require("./users.routes");
const languagesRouter = require("./languages.routes");
const etymologiesRouter = require("./etymologies.routes");
const pronunciationsRouter = require("./pronunciations.routes");
const categoriesRouter = require("./categories.routes");
const partOfSpeechsRouter = require("./partOfSpeechs.routes");
const relationTypesRouter = require("./relationTypes.routes");
const definitionsRouter = require("./definitions.routes");
const editHistoriesRouter = require("./editHistories.routes");
const discussionsRouter = require("./discussions.routes");
const relatedWordsRouter = require("./relatedWords.routes");
const translationsRouter = require("./translations.routes");
const examplesRouter = require("./examples.routes");
const wordCategoriesRouter = require("./wordCategories.routes");

router.use("/words", wordsRouter);
router.use("/users", usersRouter);
router.use("/partOfSpeechs", partOfSpeechsRouter);
router.use("/languages", languagesRouter);
router.use("/etymologies", etymologiesRouter);
router.use("/pronunciations", pronunciationsRouter);
router.use("/categories", categoriesRouter);
router.use("/relationTypes", relationTypesRouter);
router.use("/definitions", definitionsRouter);
router.use("/editHistories", editHistoriesRouter);
router.use("/discussions", discussionsRouter);
router.use("/relatedWords", relatedWordsRouter);
router.use("/translations", translationsRouter);
router.use("/examples", examplesRouter);
router.use("/wordCategories", wordCategoriesRouter);

module.exports = router;
