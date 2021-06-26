const express= require("express");

const router = express.Router();

const categoryController = require("../controllers/categoryControllers");

router.get("/category", categoryController.getAllCategoryIncludePatient);
router.get("/category/:id", categoryController.getCategoryById);
router.post("/category", categoryController.createCategory);
router.put("/category", categoryController.editCategory);

module.exports = router;