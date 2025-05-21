import React from 'react';
import './Footer.scss';

function Footer(props) {
  return (
    <footer className="custom-footer">
      <div className="footer-main container">
        <div className="row">
          <div className="col-lg-3 col-md-6 footer-about">
            <h4>ChandeShop</h4>
            <p>
              Cửa hàng quần áo thể thao chính hãng, mang đến cho bạn trải nghiệm mua sắm tốt nhất.
            </p>
            <div className="footer-social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
              <a href="mailto:support@chandeshop.com"><i className="fas fa-envelope"></i></a>
            </div>
          </div>
          <div className="col-lg-2 col-md-6 footer-links">
            <h5>Sản phẩm</h5>
            <ul>
              <li><a href="#">Áo thể thao</a></li>
              <li><a href="#">Quần thể thao</a></li>
              <li><a href="#">Giày thể thao</a></li>
              <li><a href="#">Phụ kiện</a></li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-6 footer-links">
            <h5>Hỗ trợ</h5>
            <ul>
              <li><a href="#">Chính sách đổi trả</a></li>
              <li><a href="#">Chính sách bảo mật</a></li>
              <li><a href="#">Hướng dẫn mua hàng</a></li>
              <li><a href="#">Liên hệ</a></li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-6 footer-links">
            <h5>Thông tin</h5>
            <ul>
              <li><a href="#">Về chúng tôi</a></li>
              <li><a href="#">Tin tức</a></li>
              <li><a href="#">Tuyển dụng</a></li>
              <li><a href="#">Câu hỏi thường gặp</a></li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-12 footer-contact">
            <h5>Liên hệ</h5>
            <ul>
              <li><i className="fas fa-map-marker-alt"></i> Số 36, Đường Trần Phú, Hà Đông</li>
              <li><i className="fas fa-phone"></i> 0123 456 789</li>
              <li><i className="fas fa-envelope"></i> support@chandeshop.com</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom text-center">
        <span>
          © {new Date().getFullYear()} ChandeShop. Hẹ Hẹ Hẹ Hẹ<i className="fa fa-heart-o" aria-hidden="true" />
        </span>
      </div>
    </footer>
  );
}

export default Footer;