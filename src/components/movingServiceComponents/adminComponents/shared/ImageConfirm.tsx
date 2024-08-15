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
        {id: 1, src: 'https://movingservice.muuttotarjous.fi/assets/images/product-1.png'},
        {id: 2, src: 'https://movingservice.muuttotarjous.fi/assets/images/product-2.png'},
        {id: 3, src: 'https://movingservice.muuttotarjous.fi/assets/images/product-3.png'},
        {id: 4, src: 'https://movingservice.muuttotarjous.fi/assets/images/product-4.png'},
        {id: 5, src: 'https://movingservice.muuttotarjous.fi/assets/images/product-5.png'}
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
                <div className={'product-images'}>
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