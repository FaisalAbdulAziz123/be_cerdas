import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
// PERHATIKAN: path '../controllers/backgroundController.js' harus sesuai nama file Anda
// PERHATIKAN: path '../controllers/backgroundController.js' harus sesuai nama file Anda
// PERHATIKAN: path '../controllers/backgroundController.js' harus sesuai nama file Anda
// PERHATIKAN: path '../controllers/backgroundController.js' harus sesuai nama file Anda
// PERHATIKAN: path '../controllers/backgroundController.js' harus sesuai nama file Anda
// PERHATIKAN: path '../controllers/backgroundController.js' harus sesuai nama file Anda
// PERHATIKAN: path '../controllers/backgroundController.js' harus sesuai nama file Anda
// PERHATIKAN: path '../controllers/backgroundController.js' harus sesuai nama file Anda
import { updateBackground, getBackground } from "../controllers/backgroundController.js";
const router = express.Router();

// --- AUTO-CREATE FOLDER UPLOADS ---
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

// --- KONFIGURASI MULTER ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ 
  storage: storage,
  limits: { 
    fileSize: 50 * 1024 * 1024 // 50MB dalam bytes
  }
});

// --- DEFINISI ROUTE ---
// PUT /api/background -> Untuk Upload
router.put("/", upload.single('gambar'), updateBackground);

// GET /api/background -> Untuk Ambil Data (Mobile)
router.get("/", getBackground);

export default router;