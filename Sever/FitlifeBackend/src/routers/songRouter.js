const express = require("express");
const router = express.Router();
const songController = require("../controllers/Song/songController");
const upload = require("../middlewares/upLoadSong");
const {isAdmin, verifyToken} = require("../middlewares/authMiddleware");

//Thêm bài hát (chỉ Admin)
router.post("/admin/addSong", verifyToken,isAdmin, upload.single("audio"),songController.addSong);

//Xem, sửa, xóa (chỉ Admin)
router.get("/admin/getAllSong", verifyToken,isAdmin,songController.getAllSongs);
router.delete("/admin/delete/:id",verifyToken,isAdmin,songController.deleteSong);
router.put("/admin/song/:id", verifyToken,isAdmin,songController.updateSong);

//Xem tất cả bài hát (User)
router.get("/song", songController.getAllSongs);

module.exports = router;