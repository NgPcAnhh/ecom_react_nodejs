import React from 'react';
import { useEffect, useState } from 'react';
import { getAllOrder } from '../../../services/userService';
import moment from 'moment';
import { toast } from 'react-toastify';
import { PAGINATION } from '../../../utils/constant';
import ReactPaginate from 'react-paginate';
import { useFetchAllcode } from '../../customize/fetch';
import CommonUtils from '../../../utils/CommonUtils';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
const ManageOrder = () => {

    const [dataOrder, setdataOrder] = useState([])
    const [count, setCount] = useState('')
    const [numberPage, setnumberPage] = useState('')
    const { data: dataStatusOrder } = useFetchAllcode('STATUS-ORDER');
    const [StatusId, setStatusId] = useState('ALL')
    const [filterQuantity, setFilterQuantity] = useState(false)
    useEffect(() => {
        loadOrderData('ALL')

    }, [])
    let loadOrderData = (statusId, sortQuantity = false) => {
        try {
            let fetchData = async () => {
                let params = {
                    limit: PAGINATION.pagerow,
                    offset: 0
                }
                
                if (sortQuantity) {
                    params.sort = 'quantity_gt_10'
                    params.statusId = 'S3' // Chỉ lấy đơn hàng có trạng thái chờ xác nhận (S3)
                } else {
                    params.statusId = statusId
                }
                
                let arrData = await getAllOrder(params)
                if (arrData && arrData.errCode === 0) {
                    setdataOrder(arrData.data)
                    setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
                }
            }
            fetchData();
        } catch (error) {
            console.log(error)
        }
    }
    
    let handleOnchangeStatus = (event) => {
        const value = event.target.value;
        if (value === 'QUANTITY_GT_10') {
            setFilterQuantity(true)
            setStatusId('S3') // Cập nhật state để thể hiện đang lọc trạng thái S3
            loadOrderData('S3', true) // Truyền S3 và true để lọc theo cả trạng thái và số lượng
        } else {
            setFilterQuantity(false)
            setStatusId(value)
            loadOrderData(value, false)
        }
    }
    
    let handleChangePage = async (number) => {
        setnumberPage(number.selected)
        let params = {
            limit: PAGINATION.pagerow,
            offset: number.selected * PAGINATION.pagerow
        }
        
        if (filterQuantity) {
            params.sort = 'quantity_gt_10'
            params.statusId = 'S3' // Đảm bảo đúng trạng thái khi phân trang
        } else {
            params.statusId = StatusId
        }
        
        let arrData = await getAllOrder(params)
        if (arrData && arrData.errCode === 0) {
            setdataOrder(arrData.data)
        }
    }
    let handleOnClickExport = async () => {
        let res = await getAllOrder({

            limit: '',
            offset: '',
            statusId: 'ALL'
        })
        if (res && res.errCode == 0) {
            await CommonUtils.exportExcel(res.data, "Danh sách đơn hàng", "ListOrder")
        }

    }
    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Quản lý đơn đặt hàng</h1>


            <div className="card mb-4">
                <div className="card-header">
                    <i className="fas fa-table me-1" />
                    Danh sách đơn đặt hàng
                </div>
                <select
                    onChange={handleOnchangeStatus}
                    className="form-select col-3 ml-3 mt-3"
                    value={filterQuantity ? 'QUANTITY_GT_10' : StatusId}
                >
                    <option value={'ALL'}>Trạng thái đơn hàng</option>
                    {
                        dataStatusOrder && dataStatusOrder.length > 0 &&
                        dataStatusOrder.map((item, index) => {
                            return (
                                <option value={item.code} key={item.code}>{item.value}</option>
                            )
                        })
                    }
                    <option value="QUANTITY_GT_10">Đơn hàng có SL &gt; 10</option>
                </select>
                <div className="card-body">
                    <div className='row'>

                        <div className='col-12 mb-2'>
                            <button style={{ float: 'right' }} onClick={() => handleOnClickExport()} className="btn btn-success" >Xuất excel <i class="fa-solid fa-file-excel"></i></button>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-bordered" style={{ border: '1' }} width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>Mã đơn</th>
                                    <th>SDT</th>
                                    <th>Email</th>
                                    <th>Ngày đặt</th>
                                    <th>Loại ship</th>
                                    <th>Mã voucher</th>
                                    <th>Hình thức</th>
                                    <th>Trạng thái</th>
                                    <th>Shipper</th>
                                    <th>SL</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>

                            <tbody>
                                {dataOrder && dataOrder.length > 0 &&
                                    dataOrder.map((item, index) => {
                                        let date = moment.unix(item.orderdate / 1000).format('DD/MM/YYYY')
                                        return (
                                            <tr key={index}>
                                                <td>{item.id}</td>
                                                <td>{item.userData.phonenumber}</td>
                                                <td>{item.userData.email}</td>
                                                <td>{moment.utc(item.createdAt).local().format('DD/MM/YYYY HH:mm:ss')}</td>
                                                <td>{item.typeShipData.type}</td>
                                                <td>{item.voucherData.codeVoucher}</td>
                                                <td>{item.isPaymentOnlien == 0 ? 'Thanh toán tiền mặt' : 'Thanh toán online'}</td>
                                                <td>{item.statusOrderData.value}</td>
                                                <td>{item.shipperData && item.shipperData.firstName + " " + item.shipperData.lastName + " - " + item.shipperData.phonenumber}</td>
                                                <td>{item.quantity}</td>
                                                <td>
                                                    <Link to={`/admin/order-detail/${item.id}`}>Xem chi tiết</Link>


                                                </td>
                                            </tr>
                                        )
                                    })
                                }


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <ReactPaginate
                previousLabel={'Quay lại'}
                nextLabel={'Tiếp'}
                breakLabel={'...'}
                pageCount={count}
                marginPagesDisplayed={3}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakLinkClassName={"page-link"}
                breakClassName={"page-item"}
                activeClassName={"active"}
                onPageChange={handleChangePage}
            />
        </div>
    )
}
export default ManageOrder;