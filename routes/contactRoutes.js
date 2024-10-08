const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();
const{
    getContents,
    createContent,
    getContent,
    updateContent,
    deleteContent
} = require('../controllers/contentController')

router.use(validateToken);
router.route("/").get(getContents ).post(createContent)

router.route("/:id").get( getContent).put( updateContent).delete(deleteContent)


module.exports = router;