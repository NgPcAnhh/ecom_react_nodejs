import React, { useEffect, useState } from 'react';
import ShopCartItem from '../../component/ShopCart/ShopCartItem';
import { useSelector, useDispatch } from 'react-redux';
import { ChooseTypeShipStart, getItemCartStart } from '../../action/ShopCartAction'
import storeVoucherLogo from '../../../src/resources/img/storeVoucher.png'
import { getAllTypeShip, getAllAddressUserByUserIdService, createNewAddressUserrService } from '../../services/userService';
import './ShopCartPage.scss';
import VoucherModal from './VoucherModal';
import { Link, useHistory, useLocation } from 'react-router-dom';
import AddressUsersModal from './AdressUserModal';
import { toast } from 'react-toastify';
import CommonUtils from '../../utils/CommonUtils';
function ShopCartPage(props) {
    const dispatch = useDispatch()
    let history = useHistory();
    const location = useLocation();

    // Lấy danh sách id sản phẩm được chọn từ query string
    const getSelectedIdsFromQuery = () => {
        const params = new URLSearchParams(location.search);
        const selected = params.get('selected');
        if (!selected) return [];
        return selected.split(',').map(id => Number(id));
    };
    const selectedCartItemIds = getSelectedIdsFromQuery();

    const dataCart = useSelector(state => state.shopcart.listCartItem);
    // Lọc chỉ những sản phẩm được tích
    const displayCart = dataCart.filter(item => selectedCartItemIds.includes(item.id));

    const [isOpenModal, setisOpenModal] = useState(false)
    const [isOpenModalAddressUser, setisOpenModalAddressUser] = useState(false)
    const [user, setuser] = useState()
    const [typeShip, settypeShip] = useState([])
    let dataTypeShip = useSelector(state => state.shopcart.dataTypeShip)
    let dataVoucher = useSelector(state => state.shopcart.dataVoucher)
    const [priceShip, setpriceShip] = useState(0)

    // Lấy query params
    const getQueryParams = () => {
        const params = new URLSearchParams(location.search);
        return {
            buyNow: params.get('buyNow'),
            productId: params.get('productId'),
            quantity: params.get('quantity'),
            productDetailSizeId: params.get('productDetailSizeId'),
            highlightProductDetailSizeId: params.get('highlightProductDetailSizeId')
        };
    };

    const query = getQueryParams();

    // Nếu là mua ngay, chỉ lấy sản phẩm phù hợp
    // let displayCart = dataCart;
    // if (query.buyNow === '1' && query.productId && query.productDetailSizeId) {
    //     displayCart = dataCart.filter(
    //         item =>
    //             String(item.productData.id) === String(query.productId) &&
    //             String(item.productdetailsizeData.id) === String(query.productDetailSizeId)
    //     ).map(item => ({
    //         ...item,
    //         quantity: query.quantity ? Number(query.quantity) : 1
    //     }));
    // }

    // State lưu id các sản phẩm được chọn để thanh toán
    const [selectedIds, setSelectedIds] = useState([]);

    // Khi dataCart hoặc location.search thay đổi, xử lý tích sẵn sản phẩm vừa xem (highlightProductDetailSizeId)
    useEffect(() => {
        if (query.highlightProductDetailSizeId && dataCart && dataCart.length > 0) {
            // Tìm sản phẩm có productdetailsizeData.id trùng với highlightProductDetailSizeId
            const found = dataCart.find(item => String(item.productdetailsizeData.id) === String(query.highlightProductDetailSizeId));
            setSelectedIds(found ? [found.id] : []);
        } else if (query.buyNow === '1' && displayCart.length > 0) {
            setSelectedIds([displayCart[0].id]);
        } else {
            setSelectedIds([]);
        }
    }, [dataCart, location.search]);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        setuser(userData)
        if (userData) {
            dispatch(getItemCartStart(userData.id))
        } else {
            toast.error("Hãy đăng nhập để mua hàng")
            return;
        }


        let fetchTypeShip = async () => {
            let res = await getAllTypeShip({
                limit: '',
                offset: '',
                keyword: ''
            })
            if (res && res.errCode === 0) {
                settypeShip(res.data)
            }
        }
        fetchTypeShip()
        if (dataTypeShip && dataTypeShip.price) {
            setpriceShip(dataTypeShip.price)
        }


    }, [])

    // Khi dataCart thay đổi (thêm/xóa sản phẩm), reset selectedIds về rỗng
    useEffect(() => {
        setSelectedIds([]);
    }, [dataCart]);

    let price = 0;
    let closeModal = () => {
        setisOpenModal(false)

    }
    let closeModaAddressUser = () => {
        setisOpenModalAddressUser(false)

    }
    let handleOpenModal = () => {
        setisOpenModal(true)

    }
    let handleOpenAddressUserModal = async () => {
        if (user && user.id) {
            let res = await getAllAddressUserByUserIdService(user.id)
            if (res && res.errCode === 0 && res.data.length > 0) {
                history.push(`/order/${user.id}`);
            } else {
                setisOpenModalAddressUser(true)
            }
        } else {
            toast.error("Hãy đăng nhập để mua hàng")
        }
    }
    let totalPriceDiscount = (price, discount) => {

        if (discount.voucherData.typeVoucherOfVoucherData.typeVoucher === "percent") {

            if (((price * discount.voucherData.typeVoucherOfVoucherData.value) / 100) > discount.voucherData.typeVoucherOfVoucherData.maxValue) {

                return price - discount.voucherData.typeVoucherOfVoucherData.maxValue
            } else {
                return price - ((price * discount.voucherData.typeVoucherOfVoucherData.value) / 100)
            }
        } else {
            return price - discount.voucherData.typeVoucherOfVoucherData.maxValue
        }

    }

    let sendDataFromModalAddress = async (data) => {
        setisOpenModalAddressUser(false)

        let res = await createNewAddressUserrService({
            shipName: data.shipName,
            shipAdress: data.shipAdress,
            shipEmail: data.shipEmail,
            shipPhonenumber: data.shipPhonenumber,
            userId: user.id
        })
        if (res && res.errCode === 0) {
            toast.success("Thêm địa chỉ thành công !")
            history.push(`/order/${user.id}`);
        } else {
            toast.error(res.errMessage)
        }
    }
    let closeModalFromVoucherItem = () => {
        setisOpenModal(false)
    }
    let hanldeOnChangeTypeShip = (item) => {
        setpriceShip(item.price)
        dispatch(ChooseTypeShipStart(item))
    }

    // Xử lý khi tích/huỷ tích sản phẩm
    const handleCheckboxChange = (productId) => {
        setSelectedIds(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    // Tính tổng tiền các sản phẩm đã chọn
    let totalSelectedPrice = 0;
    let totalSelectedCount = 0;
    const selectedCartItems = displayCart.filter(item => selectedIds.includes(item.id));
    totalSelectedPrice = selectedCartItems.reduce((sum, item) => sum + item.quantity * item.productDetail.discountPrice, 0);
    totalSelectedCount = selectedCartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <section className="cart_area">
            <div className="container">
                <div className="cart_inner">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Chọn</th>
                                    <th scope="col">Sản phẩm</th>
                                    <th scope="col">Giá</th>
                                    <th style={{ textAlign: 'center' }} scope="col">Số lượng</th>
                                    <th style={{ textAlign: 'center' }} scope="col">Tổng tiền</th>
                                    <th scope="col">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayCart && displayCart.length > 0 &&
                                    displayCart.map((item, index) => {
                                        price += item.quantity * item.productDetail.discountPrice;
                                        let name = `${item.productData.name} - ${item.productDetail.nameDetail} - ${item.productdetailsizeData.sizeData.value}`;
                                        return (
                                            <ShopCartItem
                                                isOrder={true}
                                                id={item.id}
                                                userId={user && user.id}
                                                productdetailsizeId={item.productdetailsizeData.id}
                                                key={index}
                                                name={name}
                                                price={item.productDetail.discountPrice}
                                                quantity={item.quantity}
                                                image={item.productDetailImage[0].image}
                                            />
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="box-shipping">


                    <h6>
                        Chọn đơn vị vận chuyển
                    </h6>
                    <div>
                        {typeShip && typeShip.length > 0 &&
                            typeShip.map((item, index) => {
                                return (
                                    <div key={index} className="form-check">
                                        <input className="form-check-input" checked={item.id === dataTypeShip.id ? true : false} type="radio" name="exampleRadios" id="exampleRadios1" onChange={() => hanldeOnChangeTypeShip(item)} />
                                        <label className="form-check-label" for="exampleRadios1">
                                            {item.type} - {CommonUtils.formatter.format(item.price)}
                                        </label>
                                    </div>
                                )
                            })
                        }


                    </div>



                </div>
                <div className="box-shopcart-bottom">
                    <div className="content-left">
                        <div className="wrap-voucher">
                            <img width="20px" height="20px" style={{ marginLeft: "-3px" }} src={storeVoucherLogo}></img>
                            <span className="name-easier">Chande voucher</span>
                            <span onClick={() => handleOpenModal()} className="choose-voucher">Chọn Hoặc Nhập Mã</span>
                            {dataVoucher && dataVoucher.voucherData &&
                                <span className="choose-voucher">Mã voucher: {dataVoucher.voucherData.codeVoucher}</span>
                            }

                        </div>
                    </div>
                    <div className="content-right">
                        <div className="wrap-price">
                            <span className="text-total">Tổng thanh toán ({displayCart && displayCart.length} sản phẩm): </span>
                            <span className="text-price">
                                {dataVoucher && dataVoucher.voucherData
                                    ? CommonUtils.formatter.format(totalPriceDiscount(price, dataVoucher) + priceShip)
                                    : CommonUtils.formatter.format(price + (+priceShip))
                                }
                            </span>
                        </div>

                        <div className="checkout_btn_inner">
                            <a
                                onClick={() => handleOpenAddressUserModal()}
                                className={`main_btn${selectedIds.length === 0 ? ' disabled' : ''}`}
                                style={{ pointerEvents: selectedIds.length === 0 ? 'none' : 'auto', opacity: selectedIds.length === 0 ? 0.6 : 1 }}
                            >
                                Đi đến thanh toán
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <VoucherModal closeModalFromVoucherItem={closeModalFromVoucherItem} price={price + (+priceShip)} isOpenModal={isOpenModal}
                closeModal={closeModal} id={user && user.id} />
            <AddressUsersModal sendDataFromModalAddress={sendDataFromModalAddress} isOpenModal={isOpenModalAddressUser} closeModaAddressUser={closeModaAddressUser} />
        </section>
    );
}

export default ShopCartPage;