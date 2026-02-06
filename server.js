import "dotenv/config";
import express from "express";
import cors from "cors";

// Import Routes
import authRoutes from "./routes/authRoutes.js";
import temaRoutes from "./routes/temaRoutes.js";
import kelompokDataRoutes from "./routes/kelompokDataRoutes.js";
import inputDataRoutes from "./routes/inputDataRoutes.js";
import sekilasRoutes from "./routes/sekilasRoutes.js";
import infografisRoutes from "./routes/infografisRoutes.js";
import backgroundRoutes from "./routes/backgroundRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";

const app = express();

// ==========================================
// 1. PENGATURAN LIMIT DATA (WAJIB PALING ATAS)
// ==========================================
// Ini harus dipasang SEBELUM rute apa pun agar server 
// tidak menolak paket data besar di awal koneksi.
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb", parameterLimit: 50000 }));

// ==========================================
// 2. PERBAIKAN CORS (PENTING!)
// ==========================================
app.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Static folder (Supaya gambar bisa diakses)
app.use("/uploads", express.static("uploads"));

// Root test (Untuk cek server nyala)
app.get("/", (req, res) => {
  res.send("Server Aplikasi Statistik BPS Berjalan Normal! 🚀");
});

// ==========================================
// 3. DAFTAR ROUTES
// ==========================================
app.use("/api/auth", authRoutes);
app.use("/tema", temaRoutes);
app.use("/kelompok", kelompokDataRoutes);
app.use("/api", inputDataRoutes);
app.use("/infografis", infografisRoutes);
app.use("/api", sekilasRoutes);
app.use("/api/background", backgroundRoutes);
app.use("/api/history", historyRoutes);

// ==========================================
// CONFIG PORT UNTUK KOYEB
// ==========================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server berjalan di port ${PORT}`);
});