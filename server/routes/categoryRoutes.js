const express= require("express");

const router = express.Router();

const {
    getAllCategoryIncludePatient, 
    getCategoryById, 
    createCategory, 
    editCategory,
    getCategoryByIdIncludePatient
} = require("../controllers/categoryControllers");

router.get("/category", getAllCategoryIncludePatient);
router.get("/category/details/:id", getCategoryById);
router.get("/category/:id", getCategoryByIdIncludePatient);
router.post("/category", createCategory);
router.put("/category", editCategory);

module.exports = router;