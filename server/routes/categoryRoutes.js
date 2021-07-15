const express= require("express");

const router = express.Router();

const {
    getAllCategoryIncludeDonation, 
    getCategoryById, 
    createCategory, 
    editCategory,
    getCategoryIdAndDonationTypeId,
    getAllDonationUrgent,
    getAllNewestDonation,
    getDonationByTitle
} = require("../controllers/categoryControllers");

router.get("/category", getAllCategoryIncludeDonation);
router.get("/category/details/:id", getCategoryById);
router.get("/category/donation", getCategoryIdAndDonationTypeId);
router.get("/category/urgent",getAllDonationUrgent);
router.get("/category/newest", getAllNewestDonation);
router.get("/category/donationTitle", getDonationByTitle)
router.post("/category", createCategory);
router.put("/category", editCategory);

module.exports = router;