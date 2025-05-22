import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const ConfirmOrderModal = (props) => {
    const { isOpen, toggle, onConfirm } = props;

    return (
        <Modal isOpen={isOpen} toggle={toggle} className="confirm-order-modal" centered>
            <ModalHeader toggle={toggle}>Xác nhận đặt hàng</ModalHeader>
            <ModalBody>
                Bạn có chắc chắn muốn đặt đơn hàng này không?
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={onConfirm}>Xác nhận</Button>{' '}
                <Button color="secondary" onClick={toggle}>Hủy</Button>
            </ModalFooter>
        </Modal>
    );
};

export default ConfirmOrderModal;
