const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

// Data Produk
let produk = [
    { id: "P001", nama: "Laptop", harga: 7500000, stok: 10 },
    { id: "P002", nama: "Mouse", harga: 150000, stok: 25 },
    { id: "P003", nama: "Keyboard", harga: 300000, stok: 15 },
    { id: "P004", nama: "Headset", harga: 450000, stok: 12 },
    { id: "P005", nama: "Webcam", harga: 600000, stok: 8 }
];

// GET semua produk
app.get('/produk', (req, res) => {
    res.json(produk);
});

// GET produk berdasarkan ID
app.get('/produk/:id', (req, res) => {
    const id = req.params.id;
    const dataProduk = produk.find(p => p.id === id);

    if (!dataProduk) {
        return res.status(404).json({
            message: "Produk tidak ditemukan"
        });
    }

    res.json(dataProduk);
});

// POST menambahkan produk
app.post('/produk', (req, res) => {
    const produkBaru = req.body;

    produk.push(produkBaru);

    res.status(201).json(produkBaru);
});

// PATCH mengubah data produk
app.patch('/produk/:id', (req, res) => {
    const id = req.params.id;
    const dataProduk = produk.find(p => p.id === id);

    if (!dataProduk) {
        return res.status(404).json({
            message: "Produk tidak ditemukan"
        });
    }

    Object.assign(dataProduk, req.body);

    res.json(dataProduk);
});

// DELETE menghapus produk
app.delete('/produk/:id', (req, res) => {
    const id = req.params.id;
    const index = produk.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Produk tidak ditemukan"
        });
    }

    const produkDihapus = produk.splice(index, 1);

    res.json(produkDihapus[0]);
});

// Menjalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});