import React, { useState } from 'react';

function ImgDetailProduct(props) {
    // Giả sử props.images là mảng các url ảnh sản phẩm
    const images = props.images || [
        "https://technext.github.io/eiser/img/product/single-product/s-product-1.jpg",
        "https://technext.github.io/eiser/img/product/single-product/s-product-1.jpg",
        "https://technext.github.io/eiser/img/product/single-product/s-product-1.jpg"
    ];
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="col-lg-6">
            <div className="s_product_img" style={{ textAlign: 'center' }}>
                {/* Ảnh lớn */}
                <div style={{ marginBottom: 20 }}>
                    <img
                        className="d-block"
                        src={images[activeIndex]}
                        alt="Ảnh bị lỗi"
                        style={{
                            width: '80%',
                            maxWidth: 400,
                            height: 'auto',
                            objectFit: 'contain',
                            borderRadius: 8,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                        }}
                    />
                </div>
                {/* Dãy ảnh nhỏ phía dưới ảnh lớn */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
                    {images.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt=""
                            style={{
                                width: 64,
                                height: 64,
                                objectFit: 'cover',
                                border: idx === activeIndex ? '2px solid #007bff' : '1px solid #eee',
                                borderRadius: 4,
                                cursor: 'pointer',
                                boxShadow: idx === activeIndex ? '0 2px 8px rgba(0,123,255,0.15)' : 'none'
                            }}
                            onClick={() => setActiveIndex(idx)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ImgDetailProduct;