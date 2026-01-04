# 📚 My BookStore - Ứng Dụng Quản Lý Sách

![Project Status](https://img.shields.io/badge/Status-Completed-success)
![Docker](https://img.shields.io/badge/Docker-Enabled-blue)

Chào mừng đến với **My BookStore**! Đây là một ứng dụng Fullstack web đơn giản giúp bạn quản lý kho sách cá nhân, bao gồm tính năng xem danh sách và thêm sách mới với giao diện màu hồng pastel thân thiện.

---

## 🚀 Công Nghệ Sử Dụng

Dự án được xây dựng dựa trên mô hình Client-Server và đóng gói bằng Docker:

* **Frontend:** React (Vite), CSS3 (Flexbox/Grid), React Router, Toastify.
* **Backend:** Node.js, Express.
* **Database:** MySQL 8.0.
* **DevOps:** Docker, Docker Compose, Nginx.

---

## ✨ Tính Năng Chính

1.  **Trang Chủ (Danh Sách Sách):**
    * Hiển thị danh sách sách dạng lưới (Grid), tự động chia 5 cột trên màn hình lớn.
    * Giao diện thẻ (Card) đẹp mắt với ảnh bìa, tên sách, tác giả và giá tiền.

2.  **Thêm Sách Mới:**
    * Form nhập liệu với validate chi tiết (bắt buộc nhập Tên, Tác giả, Giá).
    * Ngăn chặn nhập trùng tên sách (Backend check).
    * Thông báo trạng thái (Toast Notification) đẹp mắt thay vì Alert truyền thống.

3.  **Hệ Thống:**
    * Cơ chế **Auto-Reconnect**: Backend tự động thử kết nối lại nếu Database chưa khởi động xong.
    * Docker hóa toàn bộ môi trường (chỉ cần 1 lệnh để chạy).

---

## 🛠️ Hướng Dẫn Cài Đặt & Chạy (Khuyên Dùng Docker)

Cách đơn giản nhất để chạy dự án mà không cần cài Node.js hay MySQL thủ công.

### Yêu cầu
* Máy tính đã cài đặt [Docker Desktop](https://www.docker.com/products/docker-desktop).

### Các bước thực hiện

1.  **Clone hoặc tải dự án về máy:**
    ```bash
    git clone https://github.com/ttrang-2005/simple-book-manager-docker.git
    cd simple-book-manager-docker
    ```

2.  **Chạy dự án bằng Docker Compose:**
    Mở terminal tại thư mục gốc và chạy lệnh:
    ```bash
    docker-compose up -d --build
    ```
    *(Lệnh này sẽ tự động tải MySQL, cài thư viện cho Node.js, build React và khởi chạy tất cả)*.

3.  **Truy cập ứng dụng:**
    * Mở trình duyệt và vào địa chỉ: [http://localhost:5173](http://localhost:5173)

4.  **Dừng ứng dụng:**
    ```bash
    docker-compose down
    ```

---

## ⚙️ Hướng Dẫn Chạy Thủ Công (Dành cho Dev)

Nếu bạn muốn chạy từng phần để debug (không dùng Docker), hãy làm theo các bước sau:

**1. Database (MySQL):**
* Tạo database tên `quanlysach`.
* Import file `database.sql` vào MySQL.

**2. Backend (Node.js):**
```bash
cd backend
npm install
# Lưu ý: Cấu hình lại user/pass database trong file index.js nếu cần
node index.js
```
*Server sẽ chạy tại: http://localhost:3000*

**3. Frontend (React):**
```bash
cd books
npm install
npm run dev
```
*Client sẽ chạy tại: http://localhost:5173*

---

## 📂 Cấu Trúc Thư Mục

```
simple-book-manager-docker/
├── books/                 # Mã nguồn Frontend (React)
│   ├── src/                # Components, CSS
│   ├── Dockerfile          # Cấu hình build Docker cho Client
│   └── nginx.conf          # Cấu hình Nginx server
├── backend/                 # Mã nguồn Backend (Node.js)
│   ├── index.js            # Logic API & Kết nối DB
│   └── Dockerfile          # Cấu hình build Docker cho Server
├── database.sql            # Script tạo bảng và dữ liệu mẫu
├── docker-compose.yml      # File cấu hình chạy toàn bộ dự án
└── README.md               # Hướng dẫn sử dụng
```

---

## 🐛 Troubleshooting (Khắc phục lỗi thường gặp)

* **Lỗi kết nối Database (`ECONNREFUSED`):**
    * Đây là hiện tượng bình thường khi khởi động Docker lần đầu. Backend sẽ tự động thử kết nối lại sau mỗi 5 giây cho đến khi MySQL sẵn sàng. Bạn chỉ cần chờ khoảng 10-15s là xong.

* **Lỗi trùng cổng (Port already in use):**
    * Đảm bảo không có ứng dụng nào khác đang chạy chiếm dụng cổng `3000`, `5173` hoặc `3306` trước khi chạy lệnh `docker-compose up`.

---

## 👩‍💻 Tác Giả

* **Lê Thị Thu Trang** - *Developer*
* Dự án môn học: Công Nghệ Web
