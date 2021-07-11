const express= require("express");

const router = express.Router();

const {
    getAllCategoryIncludePatient, 
    getCategoryById, 
    createCategory, 
    editCategory,
    getCategoryByIdIncludePatient,
    getAllDonationUrgent,
    getAllNewestDonation
} = require("../controllers/categoryControllers");

router.get("/category", getAllCategoryIncludePatient);
router.get("/category/details/:id", getCategoryById);
router.get("/category/donation", getCategoryByIdIncludePatient);
router.get("/category/urgent",getAllDonationUrgent);
router.get("/category/newest", getAllNewestDonation);
router.post("/category", createCategory);
router.put("/category", editCategory);

module.exports = router;