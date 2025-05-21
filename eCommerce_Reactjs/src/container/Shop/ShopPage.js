import React, { useState, useRef, useEffect } from 'react';
import MainShop from '../../component/Shop/MainShop';
import Category from '../../component/Shop/Category';
import Brand from '../../component/Shop/Brand';
import Pagination from '../../component/Shop/Pagination';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
function ShopPage(props) {

    useEffect(async () => {
        window.scrollTo(0, 0);
    }, [])


    const [categoryId, setcategoryId] = useState('')
    const [brandId, setbrandId] = useState('')
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [filterPrice, setFilterPrice] = useState({ min: '', max: '' }); // Thêm state để lưu giá trị lọc
    const [priceError, setPriceError] = useState(''); // Thêm state cho thông báo lỗi
    const myRef = useRef(null)
    let handleRecevieDataCategory = (code) => {
        setcategoryId(code)
    }
    let handleRecevieDataBrand = (code) => {

        setbrandId(code)
    }

    // Hàm xử lý khi nhấn nút lọc
    const handleFilterPrice = () => {
        // Nếu không nhập cả giá tối thiểu và giá tối đa thì hiển thị toàn bộ sản phẩm
        if (minPrice === '' && maxPrice === '') {
            setPriceError('');
            setFilterPrice({ min: '', max: '' });
            return;
        }

        let min = minPrice === '' ? 0 : Number(minPrice);
        let max = maxPrice === '' ? null : Number(maxPrice);

        if (max === null) {
            setPriceError('Vui lòng nhập giá tối đa.');
            return;
        }
        if (min > max) {
            setPriceError('Giá tối thiểu không được lớn hơn giá tối đa.');
            return;
        }
        setPriceError('');
        setFilterPrice({
            min: min,
            max: max
        });
    };

    return (
        <div>
            <section ref={myRef} className="banner_area">
                <div className="banner_inner d-flex align-items-center">
                    <div className="container">
                        <div className="banner_content d-md-flex justify-content-between align-items-center">
                            <div className="mb-3 mb-md-0">
                                <h2>Danh mục cửa hàng</h2>
                                <p>Hãy lựa chọn sản phẩm phù hợp cho chính mình</p>
                            </div>
                            <div className="page_link">
                                <Link to={"/"}>Trang chủ</Link>
                                <Link to={"/shop"}>Cửa hàng</Link>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="cat_product_area section_gap">
                <div className="container">
                    <div className="row flex-row-reverse">
                        <MainShop 
                            categoryId={categoryId} 
                            brandId={brandId} 
                            myRef={myRef}
                            minPrice={filterPrice.min}
                            maxPrice={filterPrice.max}
                        />
                        <div className="col-lg-3">
                            <div className="left_sidebar_area">
                                {/* Đưa box lọc giá lên đầu */}
                                <div className="price_filter_box mb-4 p-3 border rounded">
                                    <h5 className="mb-3">Lọc theo giá</h5>
                                    <div className="form-group mb-2">
                                        <label>Giá tối thiểu</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={minPrice}
                                            min={0}
                                            onChange={e => setMinPrice(e.target.value)}
                                            placeholder="Từ..."
                                        />
                                    </div>
                                    <div className="form-group mb-2">
                                        <label>Giá tối đa</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={maxPrice}
                                            min={0}
                                            onChange={e => setMaxPrice(e.target.value)}
                                            placeholder="Đến..."
                                        />
                                    </div>
                                    <button
                                        className="btn w-100"
                                        onClick={handleFilterPrice}
                                        style={{
                                            marginTop: '8px',
                                            backgroundColor: '#32CD32',
                                            color: 'black',
                                            border: 'none'
                                        }}
                                    >
                                        Lọc
                                    </button>
                                    {priceError && (
                                        <div style={{ color: 'red', marginTop: '8px', fontSize: '0.95em' }}>
                                            {priceError}
                                        </div>
                                    )}
                                </div>
                                <Category handleRecevieDataCategory={handleRecevieDataCategory} />
                                <Brand handleRecevieDataBrand={handleRecevieDataBrand} />
                                {/* Box lọc giá */}
                            </div>
                        </div>
                    </div>
                    {/* <Pagination amountPage={3}
                        myFunction={{ changePage: handleChangePage, changePerPage: handleChangePage }}></Pagination> */}
                </div>

            </section>
            {/* <Footer /> */}
        </div>



    );
}

export default ShopPage;