import React, { useEffect, useState } from 'react';
import { Link, NavLink, useHistory, useParams, useLocation } from 'react-router-dom'; // Added useLocation
import { useSelector, useDispatch } from 'react-redux';
import {
    getAllAddressUserByUserIdService, createNewAddressUserrService, getAllTypeShip, createNewOrderService
    , paymentOrderService, getExchangeRate
} from '../../services/userService';
import './OrderHomePage.scss';
import AddressUsersModal from '../ShopCart/AdressUserModal';
import { ChooseTypeShipStart, getItemCartStart } from '../../action/ShopCartAction'
import { toast } from 'react-toastify';
import storeVoucherLogo from '../../../src/resources/img/storeVoucher.png'
import ShopCartItem from '../../component/ShopCart/ShopCartItem';
import VoucherModal from '../ShopCart/VoucherModal';
import CommonUtils from '../../utils/CommonUtils';
import { EXCHANGE_RATES } from '../../utils/constant'
function OrderHomePage(props) {
    const dispatch = useDispatch()
    const { userId } = useParams()
    let history = useHistory()
    const location = useLocation(); // Initialize useLocation

    // Lấy danh sách id sản phẩm được chọn từ query string
    const getSelectedIdsFromQuery = () => {
        const params = new URLSearchParams(location.search);
        const selected = params.get('selected');
        if (!selected) return [];
        // Giả sử id là số, nếu là chuỗi thì bỏ qua Number()
        return selected.split(',').map(id => Number(id));
    };
    const selectedCartItemIds = getSelectedIdsFromQuery();

    let allCartItems = useSelector(state => state.shopcart.listCartItem);
    // Lọc chỉ những sản phẩm được tích chọn để hiển thị và thanh toán
    const displayCart = allCartItems.filter(item => selectedCartItemIds.includes(item.id));

    const [dataAddressUser, setdataAddressUser] = useState([])
    const [addressUserId, setaddressUserId] = useState('')
    const [ratesData, setratesData] = useState([])
    const [priceShip, setpriceShip] = useState(0)
    let price = 0; // Sẽ được tính lại dựa trên displayCart
    let total = 0;
    const [stt, setstt] = useState(0)
    // dataCart sẽ được thay thế bằng displayCart cho logic hiển thị và đặt hàng
    // let dataCart = useSelector(state => state.shopcart.listCartItem) // Dòng này không cần nữa nếu đã có displayCart
    let dataVoucher = useSelector(state => state.shopcart.dataVoucher)
    let dataTypeShip = useSelector(state => state.shopcart.dataTypeShip)
    const [isChangeAdress, setisChangeAdress] = useState(false)
    const [isOpenModalAddressUser, setisOpenModalAddressUser] = useState(false)
    const [isOpenModal, setisOpenModal] = useState(false)
    const [typeShip, settypeShip] = useState([])
    const [activeTypePayment, setactiveTypePayment] = useState(1)
    const [activeTypeOnlPayment, setactiveTypeOnlPayment] = useState(1)
    const [note, setnote] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [pendingOrder, setPendingOrder] = useState(false);
    useEffect(() => {
        dispatch(getItemCartStart(userId)) // Vẫn fetch tất cả item trong giỏ hàng, sau đó lọc
        let fetchDataAddress = async () => {
            await loadDataAddress(userId)
        }
        fetchDataAddress()
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
        fetchExchangeRate()
        if (dataTypeShip && dataTypeShip.price) {
            setpriceShip(dataTypeShip.price)
        }

    }, [])


    let loadDataAddress = async (userId) => {
        let res = await getAllAddressUserByUserIdService(userId)
        if (res && res.errCode === 0) {
            setdataAddressUser(res.data)
            setaddressUserId(res.data[0].id)
        }
    }
    let closeModaAddressUser = () => {
        setisOpenModalAddressUser(false)
    }
    let handleOpenAddressUserModal = async () => {

        setisOpenModalAddressUser(true)
    }
    let sendDataFromModalAddress = async (data) => {
        setisOpenModalAddressUser(false)

        let res = await createNewAddressUserrService({
            shipName: data.shipName,
            shipAdress: data.shipAdress,
            shipEmail: data.shipEmail,
            shipPhonenumber: data.shipPhonenumber,
            userId: userId
        })
        if (res && res.errCode === 0) {
            toast.success("Thêm địa chỉ thành công !")
            await loadDataAddress(userId)
        } else {
            toast.error(res.errMessage)
        }
    }
    let handleOnChange = (id, index) => {
        setaddressUserId(id)
        setstt(index)
    }
    let handleOpenModal = () => {
        setisOpenModal(true)


    }
    let closeModal = () => {
        setisOpenModal(false)

    }
    let closeModalFromVoucherItem = () => {
        setisOpenModal(false)
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
    let handleChooseTypeShip = (item) => {
        dispatch(ChooseTypeShipStart(item))
        setpriceShip(item.price)
    }
    let fetchExchangeRate = async () => {
        let res = await getExchangeRate()
        if (res) setratesData(res)
    }
    let handleSaveOrder = async () => {
        // Sử dụng displayCart để tính tổng số lượng
        const totalQuantity = displayCart.reduce((sum, item) => sum + item.quantity, 0);
        if (totalQuantity > 10 && !pendingOrder) {
            setShowConfirmModal(true);
            setPendingOrder(true);
            return;
        }
        setPendingOrder(false);
        if (!dataTypeShip.id) {
            toast.error("Chưa chọn đơn vị vận chuyển")
        } else {

            let result = [];
            // Sử dụng displayCart để tạo arrDataShopCart
            displayCart.map((item, index) => {
                let object = {};
                object.productId = item.productdetailsizeId
                object.quantity = item.quantity
                object.realPrice = item.productDetail.discountPrice
                result.push(object)
            })

            // Tính lại 'price' dựa trên displayCart trước khi sử dụng cho 'total'
            let currentPrice = displayCart.reduce((sum, item) => sum + (item.quantity * item.productDetail.discountPrice), 0);

            if (activeTypePayment == 0) {
                let res = await createNewOrderService({
                    orderdate: Date.now(),
                    addressUserId: addressUserId,
                    isPaymentOnlien: activeTypePayment === 1 ? 1 : 0,
                    typeShipId: dataTypeShip.id,
                    voucherId: dataVoucher.voucherId,
                    note: note,
                    userId: userId,
                    arrDataShopCart: result
                })
                if (res && res.errCode === 0) {
                    toast.success("Đặt hàng thành công")
                    dispatch(getItemCartStart(userId)) // Cập nhật lại giỏ hàng sau khi đặt
                    setTimeout(() => {
                        window.location.href = '/user/order/' + userId
                    }, 2000)
                } else {
                    toast.error(res.errMessage)
                }
            } else {
                total = dataVoucher && dataVoucher.voucherData ? totalPriceDiscount(currentPrice, dataVoucher) + priceShip : currentPrice + (+priceShip);
                total = parseFloat((total / EXCHANGE_RATES.USD).toFixed(2))
                if (activeTypeOnlPayment === 1) {
                    let res = await paymentOrderService({
                        total: total,
                        result: result // result đã được tạo từ displayCart
                    })
                    if (res && res.errCode == 0) {
                        localStorage.setItem("orderData", JSON.stringify({
                            orderdate: Date.now(),
                            addressUserId: addressUserId,
                            isPaymentOnlien: activeTypePayment === 1 ? 1 : 0,
                            typeShipId: dataTypeShip.id,
                            voucherId: dataVoucher.voucherId,
                            note: note,
                            userId: userId,
                            arrDataShopCart: result, // result đã được tạo từ displayCart
                            total: total
                        }))
                        window.location.href = res.link
                    }
                } else {
                    history.push({
                        pathname: '/payment/vnpay',
                        orderData: {
                            orderdate: Date.now(),
                            addressUserId: addressUserId,
                            isPaymentOnlien: activeTypePayment === 1 ? 1 : 0,
                            typeShipId: dataTypeShip.id,
                            voucherId: dataVoucher.voucherId,
                            note: note,
                            userId: userId,
                            arrDataShopCart: result, // result đã được tạo từ displayCart
                            total: dataVoucher && dataVoucher.voucherData ? totalPriceDiscount(currentPrice, dataVoucher) + priceShip : currentPrice + (+priceShip)
                        },
                    })
                }
            }
        }
    }

    const handleConfirmOrder = () => {
        setShowConfirmModal(false);
        handleSaveOrder();
    };
    const handleCancelOrder = () => {
        setShowConfirmModal(false);
        setPendingOrder(false);
    };

    // Tính toán lại 'price' dựa trên 'displayCart' cho mỗi lần render
    price = displayCart.reduce((sum, item) => sum + (item.quantity * item.productDetail.discountPrice), 0);

    return (

        <>

            <div className="wrap-order">
                <div className="wrap-heading-order">
                    <NavLink to="/" className="navbar-brand logo_h">
                        <img src="/resources/img/logo.png" alt="" />
                    </NavLink>
                    <span>Thanh Toán</span>
                </div>
                <div className="wrap-address-order">
                    <div className="border-top-address-order"></div>
                    <div className="wrap-content-address">
                        <div className="content-up">
                            <div className="content-left">
                                <i className="fas fa-map-marker-alt"></i>
                                <span>Địa Chỉ Nhận Hàng</span>
                            </div>
                            {isChangeAdress === true &&
                                <div className="content-right">
                                    <div className="wrap-add-address">
                                        <i className="fas fa-plus"></i>
                                        <span onClick={() => handleOpenAddressUserModal()}>Thêm địa chỉ mới</span>
                                    </div>

                                </div>
                            }

                        </div>
                        <div className="content-down">
                            {isChangeAdress === false ?
                                <>
                                    <div className="content-left">
                                        <span>{dataAddressUser && dataAddressUser.length > 0 && dataAddressUser[stt].shipName} ({dataAddressUser && dataAddressUser.length > 0 && dataAddressUser[0].shipPhonenumber})</span>
                                    </div>
                                    <div className="content-center">
                                        <span>
                                            {dataAddressUser && dataAddressUser.length > 0 && dataAddressUser[stt].shipAdress}
                                        </span>
                                    </div>
                                </>
                                :

                                <div>
                                    {dataAddressUser && dataAddressUser.length > 0 &&
                                        dataAddressUser.map((item, index) => {

                                            return (
                                                <div key={index} className="form-check ">
                                                    <input className="form-check-input" checked={item.id === addressUserId ? true : false} onChange={() => handleOnChange(item.id, index)} type="radio" name="addressRadios" id={`addressRadios${index}`} />
                                                    <label className="form-check-label wrap-radio-address" for={`addressRadios${index}`}>
                                                        <div className="content-left">
                                                            <span>{item.shipName} ({item.shipPhonenumber})</span>
                                                        </div>
                                                        <div className="content-center">
                                                            <span>
                                                                {item.shipAdress}
                                                            </span>
                                                        </div>
                                                    </label>
                                                </div>
                                            )
                                        })
                                    }


                                </div>
                            }

                            <div className="content-right">
                                <span className="text-default">Mặc định</span>
                                {isChangeAdress === false &&
                                    <span onClick={() => setisChangeAdress(true)} className="text-change">Thay đổi</span>
                                }

                            </div>
                        </div>
                        {isChangeAdress === true &&
                            <div className="box-action">

                                <div onClick={() => setisChangeAdress(false)} className="wrap-back">
                                    <span >Trở về</span>
                                </div>
                            </div>
                        }

                    </div>
                </div>
                <div className="wrap-order-item">
                    <section className="cart_area">
                        <div className="container">
                            <div className="cart_inner">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>

                                                <th scope="col">Sản phẩm</th>
                                                <th scope="col">Giá</th>
                                                <th style={{ textAlign: 'center' }} scope="col">Số lượng</th>
                                                <th style={{ textAlign: 'center' }} scope="col">Tổng tiền</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* Sử dụng displayCart để render danh sách sản phẩm */}
                                            {displayCart && displayCart.length > 0 &&
                                                displayCart.map((item, index) => {
                                                    // 'price' tổng đã được tính ở trên, không cần cộng dồn ở đây nữa
                                                    let name = `${item.productData.name} - ${item.productDetail.nameDetail} - ${item.productdetailsizeData.sizeData.value}`
                                                    return (
                                                        <ShopCartItem isOrder={true} id={item.id} userId={userId} productdetailsizeId={item.productdetailsizeData.id} key={index} name={name} price={item.productDetail.discountPrice} quantity={item.quantity} image={item.productDetailImage[0].image} />
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
                                                    <input className="form-check-input" checked={item.id === dataTypeShip.id ? true : false} type="radio" name="typeshipRadios" id={`typeshipRadios${index}`} onChange={() => handleChooseTypeShip(item)} />
                                                    <label className="form-check-label" for={`typeshipRadios${index}`}>
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
                                        <span className="name-easier">Easier voucher</span>
                                        <span onClick={() => handleOpenModal()} className="choose-voucher">Chọn Mã</span>
                                        {dataVoucher && dataVoucher.voucherData &&
                                            <span className="choose-voucher">Mã voucher: {dataVoucher.voucherData.codeVoucher}</span>
                                        }

                                    </div>
                                    <div className="wrap-note">
                                        <span>Lời Nhắn:</span>
                                        <input value={note} onChange={(event) => setnote(event.target.value)} type="text" placeholder="Lưu ý cho Người bán..." />
                                    </div>
                                </div>
                                <div className="content-right">
                                    <div className="wrap-price">
                                        {/* Sử dụng displayCart.length cho số lượng sản phẩm */}
                                        <span className="text-total">Tổng thanh toán ({displayCart ? displayCart.length : 0} sản phẩm): </span>
                                        {/* 'price' đã được tính dựa trên displayCart */}
                                        <span className="text-price">{dataVoucher && dataVoucher.voucherData ? CommonUtils.formatter.format(totalPriceDiscount(price, dataVoucher) + priceShip) : CommonUtils.formatter.format(price + (+priceShip))}</span>
                                    </div>


                                </div>

                            </div>

                        </div>


                    </section>
                </div>
                <div className="wrap-payment">
                    <div className="content-top">

                        <div style={{ display: 'flex', gap: '10px' }}>
                            <span>Phương Thức Thanh Toán</span>
                            <div onClick={() => setactiveTypePayment(1)} className={activeTypePayment === 1 ? 'box-type-payment active' : 'box-type-payment'}>Thanh toán Online</div>

                            <div onClick={() => setactiveTypePayment(0)} className={activeTypePayment === 0 ? 'box-type-payment active' : 'box-type-payment'}>Thanh toán khi nhận hàng</div>
                        </div>
                        {activeTypePayment != 0 &&
                            <div className='box-payment'>
                                <div onClick={() => setactiveTypeOnlPayment(1)} className={activeTypeOnlPayment === 1 ? 'box-type-payment activeOnl' : 'box-type-payment'}>Thanh toán PAYPAL</div>
                                <div onClick={() => setactiveTypeOnlPayment(2)} className={activeTypeOnlPayment === 2 ? 'box-type-payment activeOnl' : 'box-type-payment'}>Thanh toán VNPAY</div>
                            </div>
                        }



                    </div>

                    <div className="content-bottom">
                        <div className="wrap-bottom">
                            <div className="box-flex">
                                <div className="head">Tổng tiền hàng</div>
                                {/* 'price' đã được tính dựa trên displayCart */}
                                <div >{CommonUtils.formatter.format(price)}</div>
                            </div>
                            <div className="box-flex">
                                <div className="head">Tổng giảm giá</div>
                                <div >{dataVoucher && dataVoucher.voucherData ? CommonUtils.formatter.format(price - totalPriceDiscount(price, dataVoucher)) : CommonUtils.formatter.format(0)}</div>
                            </div>
                            <div className="box-flex">
                                <div className="head">Phí vận chuyển</div>
                                <div >{CommonUtils.formatter.format(priceShip)}</div>
                            </div>

                            <div className="box-flex">
                                <div className="head">Tổng thanh toán:</div>
                                {/* 'price' đã được tính dựa trên displayCart */}
                                <div className="money">${dataVoucher && dataVoucher.voucherData ? CommonUtils.formatter.format(totalPriceDiscount(price, dataVoucher) + priceShip) : CommonUtils.formatter.format(price + (+priceShip))}</div>
                            </div>
                            <div className="box-flex">
                                <a onClick={() => handleSaveOrder()} className="main_btn">Đặt hàng</a>
                            </div>

                        </div>
                    </div>
                </div>
                <VoucherModal closeModalFromVoucherItem={closeModalFromVoucherItem} price={price + (+priceShip)} isOpenModal={isOpenModal}
                    closeModal={closeModal} id={userId} />
                <AddressUsersModal sendDataFromModalAddress={sendDataFromModalAddress} isOpenModal={isOpenModalAddressUser} closeModaAddressUser={closeModaAddressUser} />
            </div>
            <div style={{ width: '100%', height: '100px', backgroundColor: '#f5f5f5' }}></div>
            {showConfirmModal && (
                <div className="custom-modal-confirm-overlay">
                    <div className="custom-modal-confirm">
                        <div className="custom-modal-content">
                            <h4>Bạn có chắc chắn đặt hàng với số lượng lớn không?</h4>
                            <div className="custom-modal-actions">
                                <button className="btn-confirm" onClick={handleConfirmOrder}>Có</button>
                                <button className="btn-cancel" onClick={handleCancelOrder}>Không</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>

    );
}

export default OrderHomePage;