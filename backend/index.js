const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// --- PHẦN SỬA ĐỔI: TỰ ĐỘNG KẾT NỐI LẠI ---
let db;

const connectDB = () => {
    console.log("Đang thử kết nối đến MySQL...");
    
    db = mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: 'root',
        password: process.env.DB_PASSWORD || '',
        database: 'quanlysach'
    });

    db.connect(err => {
        if (err) {
            console.error('Lỗi kết nối CSDL:', err.code);
            console.log('Sẽ thử lại sau 5 giây...');
            setTimeout(connectDB, 5000); // Đợi 5s rồi gọi lại hàm này
        } else {
            console.log('✅ Đã kết nối MySQL thành công!');
        }
    });

    // Xử lý trường hợp đang chạy mà bị rớt mạng
    db.on('error', function(err) {
        console.log('Lỗi Database, đang kết nối lại...');
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            connectDB();
        } else {
            throw err;
        }
    });
};

// Gọi hàm kết nối lần đầu
connectDB();
// ------------------------------------------

// API 1: Lấy danh sách sách
app.get('/books', (req, res) => {
    // Kiểm tra xem DB đã kết nối chưa trước khi query
    if (!db || db.state === 'disconnected') {
        return res.status(500).json("Database chưa sẵn sàng, vui lòng thử lại sau.");
    }

    const sql = "SELECT * FROM books ORDER BY created_at DESC";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// API 2: Thêm sách mới
app.post('/books', (req, res) => {
    const { title, author, price, image_url } = req.body;
    const sql = "INSERT INTO books (title, author, price, image_url) VALUES (?)";
    const values = [title, author, price, image_url];

    db.query(sql, [values], (err, data) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ message: "Sách này đã tồn tại trong kho!" });
            }
            return res.status(500).json(err);
        }
        return res.status(200).json("Đã thêm sách thành công!");
    });
});

app.listen(3000, () => {
    console.log("Backend đang chạy tại cổng 3000...");
});