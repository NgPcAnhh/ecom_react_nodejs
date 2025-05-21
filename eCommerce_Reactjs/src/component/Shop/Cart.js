import React, { useState } from 'react';
import ShopCartItem from '../ShopCart/ShopCartItem';
import './Cart.scss';

function Cart({ cartItems, userId }) {
    // State lưu id các sản phẩm được chọn để thanh toán
    const [selectedIds, setSelectedIds] = useState([]);
    const [quantity, setquantity] = useState('')

    // Xử lý khi tích/huỷ tích sản phẩm
    const handleCheckboxChange = (productId) => {
        setSelectedIds(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    // Tính tổng tiền các sản phẩm đã chọn
    const total = cartItems
        .filter(item => selectedIds.includes(item.id))
        .reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className='cart-container'>
            <div className="table-responsive">
                <table className="table table-cart">
                    <thead>
                        <tr>
                            <th className="checkbox-column">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="selectAll" />
                                    <label className="custom-control-label" htmlFor="selectAll" />
                                </div>
                            </th>
                            <th>Sản phẩm</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                            <th>Thành tiền</th>
                            <th className="action-column">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems && cartItems.length > 0 ? (
                            cartItems.map(item => (
                                <ShopCartItem
                                    key={item.id}
                                    {...item}
                                    isChecked={selectedIds.includes(item.id)}
                                    onCheck={() => handleCheckboxChange(item.id)}
                                    userId={userId}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    Giỏ hàng của bạn đang trống.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="cart-summary">
                <div className="row">
                    <div className="col-lg-8 col-md-6 col-sm-12">
                        <div className="coupon-code">
                            <input type="text" placeholder="Nhập mã giảm giá của bạn" />
                            <button className="btn-apply">Áp dụng</button>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="total-amount">
                            <h3>Tổng tiền:</h3>
                            <h2>{total} VNĐ</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <button className="btn-checkout" disabled={selectedIds.length === 0}>
                            Thanh toán
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;