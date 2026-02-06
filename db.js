import mysql from "mysql2";
import "dotenv/config";

// GANTI createConnection MENJADI createPool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, // Pastikan ini sesuai dengan nama di Koyeb (DB_PASSWORD atau DB_PASS)
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Tes koneksi awal (opsional, tapi bagus untuk cek log)
db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database Error:", err.message);
  } else {
    console.log("✅ Database Connected (Pool Mode)");
    connection.release(); // Penting: Lepas koneksi setelah dicek
  }
});

export default db;