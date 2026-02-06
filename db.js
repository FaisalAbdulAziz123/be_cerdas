import mysql from "mysql2";

// Pakai createPool, bukan createConnection
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS, // Pastikan namanya sesuai Koyeb
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Tes koneksi (opsional, karena pool otomatis connect)
db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Gagal konek ke database:", err.message);
  } else {
    console.log("✅ Berhasil konek ke database");
    connection.release(); // Lepas koneksi setelah tes
  }
});

export default db.promise(); // Pakai promise() biar enak pakai async/await nanti