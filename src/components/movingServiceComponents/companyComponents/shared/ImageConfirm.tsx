import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useState} from "react";

interface IAlertConfirmProps {
    title: string,
    message?: string
    isOpen: boolean;
    onClose: (confirm: any) => void;
    onSelectImage: (src: string) => void;
}

const ImageConfirm = (props: IAlertConfirmProps) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const images = [
        {id: 1, src: 'https://movingservice.muuttotarjous.fi/assets/images/vehicle_type_1.jpg'},
        {id: 2, src: 'https://movingservice.muuttotarjous.fi/assets/images/vehicle_type_2.jpg'},
        {id: 3, src: 'https://movingservice.muuttotarjous.fi/assets/images/vehicle_type_3.jpg'},
        {id: 4, src: 'https://movingservice.muuttotarjous.fi/assets/images/vehicle_type_4.jpg'}
    ];
    const handleClick = (index: number) => {
        setActiveIndex(index);
    };

    const handleConfirm = () => {
        if (activeIndex !== null) {
            const selectedImage = images[activeIndex];
            props.onSelectImage(selectedImage.src);
        }
    };

    return (
        <Modal show={props.isOpen} onHide={() => props.onClose('cancel')}>
            <Modal.Header>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.message}
                <div className={'unit-images'}>
                    {images.map((image, index) => (
                        <img
                            key={image.id}
                            src={image.src}
                            alt={`Image ${image.id}`}
                            className={index === activeIndex ? 'active' : ''}
                            onClick={() => handleClick(index)}
                        />
                    ))}
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

export default ImageConfirm