import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from 'reactstrap';
import { toast } from 'react-toastify';
import './ConfirmLargeOrderModal.scss';

const ConfirmLargeOrderModal = (props) => {
    const { isOpen, toggle, onConfirm } = props;
    const [verificationCode, setVerificationCode] = useState('');
    const [userInput, setUserInput] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);

    // Tạo mã xác nhận ngẫu nhiên khi modal mở
    useEffect(() => {
        if (isOpen) {
            // Tạo mã xác nhận 4 số ngẫu nhiên
            const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
            setVerificationCode(randomCode);
            setUserInput('');
            setIsCorrect(false);
        }
    }, [isOpen]);

    // Xử lý khi người dùng nhập mã xác nhận
    const handleInputChange = (e) => {
        setUserInput(e.target.value);
        
        // Tự động kiểm tra khi đã nhập đủ 4 số
        if (e.target.value.length === 4) {
            if (e.target.value === verificationCode) {
                setIsCorrect(true);
            }
        } else {
            setIsCorrect(false);
        }
    };

    // Xử lý khi người dùng xác nhận
    const handleConfirm = () => {
        if (userInput === verificationCode) {
            onConfirm();
        } else {
            toast.error('Mã xác nhận không chính xác!');
        }
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle} className="confirm-large-order-modal" centered>
            <ModalHeader toggle={toggle}>Xác nhận đơn hàng lớn</ModalHeader>
            <ModalBody>
                <div className="confirmation-message">
                    Đơn hàng của bạn có số lượng lớn. Vui lòng xác nhận bằng cách nhập mã số dưới đây:
                </div>
                
                <div className="verification-code">
                    <span>{verificationCode}</span>
                </div>
                
                <div className="input-container">
                    <label>Nhập mã xác nhận:</label>
                    <Input 
                        type="text" 
                        maxLength="4" 
                        value={userInput} 
                        onChange={handleInputChange}
                        placeholder="Nhập 4 số hiển thị ở trên"
                        className={userInput.length === 4 ? (isCorrect ? "is-valid" : "is-invalid") : ""}
                    />
                    {userInput.length === 4 && !isCorrect && 
                        <div className="invalid-feedback">Mã xác nhận không chính xác</div>
                    }
                </div>
            </ModalBody>
            <ModalFooter>
                <Button 
                    color="primary" 
                    onClick={handleConfirm}
                    disabled={!isCorrect}
                >
                    Xác nhận
                </Button>{' '}
                <Button color="secondary" onClick={toggle}>Hủy</Button>
            </ModalFooter>
        </Modal>
    );
};

export default ConfirmLargeOrderModal;
