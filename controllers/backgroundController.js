import db from "../db.js";

export const updateBackground = (req, res) => {
  // ✅ PERBAIKAN: Ambil dari req.body, bukan req.file
  // Karena Frontend mengirim JSON { "gambar": "data:image..." }
  const { gambar } = req.body; 
  
  if (!gambar) {
    return res.status(400).json("Tidak ada gambar diupload");
  }

  // ✅ Pastikan tabel background_app kolom 'gambar' bertipe LONGTEXT
  // agar bisa menampung teks Base64 yang sangat panjang.
  const q = "UPDATE background_app SET gambar = ? WHERE id = 1";

  db.query(q, [gambar], (err, result) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json(err);
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json("Data dengan ID 1 tidak ditemukan di database!");
    }

    return res.status(200).json("Background berhasil diperbarui secara permanen!");
  });
};

export const getBackground = (req, res) => {
  const q = "SELECT * FROM background_app WHERE id = 1";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("Data tidak ditemukan");
    
    return res.status(200).json(data[0]); 
  });
};