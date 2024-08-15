import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useState} from "react";

interface ISendOfferConfirmProps {
    title: string;
    name: string;
    isOpen: boolean;
    company_id: number;
    bookingRequest_id: number;
    onSelectedData: (data: any) => void;
    onClose: (confirm: any) => void;
}

const SendOfferConfirm = (props: ISendOfferConfirmProps) => {

    const [data, setData] = useState({
        company_id: props.company_id,
        name: props.name,
        booking_request_id: props.bookingRequest_id,
        price: ''
    })

    const onInputChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setData({
            ...data,
            [key]: value
        })
    }

    const handleConfirm = () => {
        console.log(data)
        props.onSelectedData(data);
    };

    return (
        <Modal show={props.isOpen} onHide={() => props.onClose('cancel')}>
            <Modal.Header>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group row">
                    <label htmlFor="price" className="col-sm-3 col-form-label">Price</label>
                    <div className="col-sm-9">
                        <input type="text" className={`form-control`} id="price"
                               placeholder="0.00" defaultValue={data.price} onChange={(val: any) => onInputChange('price', val)} />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.onClose('cancel')}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={() => { handleConfirm(); props.onClose('confirm')}}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default SendOfferConfirm