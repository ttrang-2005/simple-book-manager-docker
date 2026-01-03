import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import './App.css';

// --- TRANG 1: DANH SÁCH SÁCH ---
function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/books')
      .then(res => setBooks(res.data))
      .catch(err => toast.error("Lỗi kết nối Server!"));
  }, []);

  return (
    <div>
      <h2 style={{fontSize: '1.5rem'}}>Kho Truyện </h2>
      <div className="grid-container">
        {books.map((book) => (
          <div className="card" key={book.id}>
            <img src={book.image_url || 'https://via.placeholder.com/200x280?text=No+Cover'} alt={book.title} />
            <div className="card-body">
              <h3 className="card-title">{book.title}</h3>
              <p className="card-author">{book.author}</p>
              <p className="card-price">{Number(book.price).toLocaleString()} đ</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- TRANG 2: FORM THÊM MỚI (Đã thêm validate chi tiết) ---
function AddBook() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '', author: '', price: '', image_url: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // --- KIỂM TRA DỮ LIỆU (VALIDATION) ---
    // Kiểm tra từng trường, nếu thiếu thì báo Toast và dừng hàm (return)
    if (!formData.title.trim()) {
      return toast.warning("⚠️ Vui lòng nhập Tên sách!", { position: "top-center" });
    }
    if (!formData.author.trim()) {
      return toast.warning("✍️ Vui lòng nhập Tên tác giả!", { position: "top-center" });
    }
    if (!formData.price) {
      return toast.warning("💰 Vui lòng nhập Giá tiền!", { position: "top-center" });
    }
    // (Ảnh bìa có thể để trống, không bắt buộc)

    // Nếu đủ dữ liệu thì mới gọi API
    try {
      await axios.post('http://localhost:3000/books', formData);
      
      toast.success('💕 Đã thêm sách mới thành công!', {
        position: "top-right",
        autoClose: 2000, 
      });
      
      setTimeout(() => navigate('/'), 2100);

    } catch (err) {
      if (err.response && err.response.status === 409) {
        toast.error("⛔ Sách này đã tồn tại trong kho!", { position: "top-center" });
      } else {
        toast.error('Có lỗi xảy ra, vui lòng thử lại!', { position: "top-center" });
      }
    }
  };

  // Lưu ý: Đã XÓA thuộc tính 'required' trong các thẻ input dưới đây
  return (
    <div className="form-card">
      <h2>✨ Thêm Sách Mới ✨</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tên sách / Truyện (*)</label>
          <input className="form-control" type="text" name="title" 
                 value={formData.title} onChange={handleChange} placeholder="VD: Mắt Biếc..." />
        </div>
        <div className="form-group">
          <label>Tác giả (*)</label>
          <input className="form-control" type="text" name="author" 
                 value={formData.author} onChange={handleChange} placeholder="VD: Nguyễn Nhật Ánh..." />
        </div>
        <div className="form-group">
          <label>Giá bán (VNĐ) (*)</label>
          <input className="form-control" type="number" name="price" 
                 value={formData.price} onChange={handleChange} placeholder="0" />
        </div>
        <div className="form-group">
          <label>Link Ảnh Bìa (Tùy chọn)</label>
          <input className="form-control" type="text" name="image_url" 
                 value={formData.image_url} onChange={handleChange} placeholder="https://..." />
        </div>
        <button type="submit" className="btn-submit">Lưu Vào Kho</button>
      </form>
    </div>
  );
}

// --- ỨNG DỤNG CHÍNH ---
function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <ToastContainer />
        
        {/* Menu đã sửa CSS để hiển thị dọc */}
        <nav>
          <Link to="/" className="nav-brand">My BookStore</Link>
          <div className="nav-links">
            <Link to="/">Danh Sách Books</Link>
            <Link to="/add">Thêm Sách Mới</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/add" element={<AddBook />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;