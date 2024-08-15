import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface IAlertConfirmProps {
    type: string,
    title: string,
    message: string
    id: number;
    isOpen: boolean;
    onClose: (confirm: any) => void;
}

const AlertConfirm = (props: IAlertConfirmProps) => {

    return (
        <Modal show={props.isOpen} onHide={() => props.onClose('cancel')}>
            <Modal.Header>
                <Modal.Title>You are updating the status</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.message} {props.type}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.onClose('cancel')}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={() => props.onClose('confirm')}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AlertConfirm