SET NAMES 'utf8mb4';
-- 1. Xóa database cũ (nếu có) để làm mới hoàn toàn
DROP DATABASE IF EXISTS quanlysach;

-- 2. Tạo database mới
CREATE DATABASE quanlysach;
USE quanlysach;

-- 3. Tạo bảng books (Có ràng buộc UNIQUE ở cột title để chống trùng tên)
CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL UNIQUE, -- KHÔNG ĐƯỢC TRÙNG TÊN
    author VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Thêm 10 dữ liệu mẫu (Sách Tiếng Việt & Quốc Tế)
INSERT INTO books (title, author, price, image_url) VALUES
('Mắt Biếc', 'Nguyễn Nhật Ánh', 110000, 'https://cdn1.fahasa.com/media/catalog/product/n/x/nxbtre_full_06402022_014041_1.jpg'),
('Đắc Nhân Tâm', 'Dale Carnegie', 86000, 'https://maybanhang.net/wp-content/uploads/2017/04/dacnhantam4x5.jpg'),
('Nhà Giả Kim', 'Paulo Coelho', 79000, 'https://bizweb.dktcdn.net/thumb/1024x1024/100/363/455/products/nhagiakimnew03.jpg?v=1705552576547'),
('Hoàng Tử Bé', 'Antoine de Saint-Exupéry', 75000, 'https://nhasachmienphi.com/images/thumbnail/nhasachmienphi-hoang-tu-be.jpg'),
('Rừng Na Uy', 'Haruki Murakami', 125000, 'https://nhasachmienphi.com/images/thumbnail/nhasachmienphi-rung-na-uy.jpg'),
('Dế Mèn Phiêu Lưu Ký', 'Tô Hoài', 50000, 'https://sachmoi.net/wp-content/uploads/2024/03/ebook-de-men-phieu-luu-ky-epub-pdf.jpg'),
('Số Đỏ', 'Vũ Trọng Phụng', 60000, 'https://www.sachhayonline.com/data/book-photos/21.jpg'),
('Harry Potter và Hòn Đá Phù Thủy', 'J.K. Rowling', 150000, 'https://isach.info/images/story/cover/harry_potter_va_hon_da_phu_thuy__j_k_rowling.jpg'),
('Tuổi Trẻ Đáng Giá Bao Nhiêu', 'Rosie Nguyễn', 85000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGOlR-glVJlKkWlWSCp7TZlddfYnfnAYjWcA&s'),
('Tắt Đèn', 'Ngô Tất Tố', 45000, 'https://cdn1.fahasa.com/media/flashmagazine/images/page_images/tat_den_tai_ban_2022/2022_06_27_11_52_02_1-390x510.jpg');