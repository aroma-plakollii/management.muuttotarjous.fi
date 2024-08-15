import {Link, useNavigate, useParams} from "react-router-dom";
import {
    getBookingRequestProduct,
    saveBookingRequestProductDetails
} from "../../../../services/movingServiceServices/adminServices/BookingRequestProductService";
import {useEffect, useState} from "react";
import {BookingRequestProduct} from "../../../../interfaces/movingServiceInterfaces/adminInterfaces/IBokingRequestProduct";
import ImageConfirm from "../shared/ImageConfirm";
import {Loader} from "../../../../views/Loader";

const EditBookingRequestProduct = () => {
    const [state, setState] = useState({
        bookingRequestProduct: {} as BookingRequestProduct,
        loading: true,
        modalOpen: false,
        hasError: false,
    });

    const [image, setImage] = useState('');

    let { id } = useParams();
    let navigate = useNavigate();

    const handleSelectImage = (src: string) => {
        setImage(src);
    };

    const handleOpenImageConfirm = () => {
        setState({...state, modalOpen: true});
    };

    const handleCloseImageConfirm = (confirm: any) => {
        setState({...state, modalOpen: false});
        if (confirm === 'cancel') {
            setImage('');
        }
    };

    useEffect(() => {
        const __init = async () => {
            const bookingRequestProduct = await getBookingRequestProduct(id);

            setState({...state, bookingRequestProduct, loading: false});
            setImage(bookingRequestProduct.image)
        }

        __init()
    }, []);

    const onInputChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state, bookingRequestProduct: {
                ...state.bookingRequestProduct, [key]: value
            }
        });
    }

    const onSave = async (id: any) => {
        const data = {
            name: state.bookingRequestProduct.name,
            description: state.bookingRequestProduct.description,
            duration: state.bookingRequestProduct.duration,
            image: image
        }

        const res = await saveBookingRequestProductDetails(id, data);

        if (res) {
            setState({...state, loading: false})
            navigate('/booking-request-products')
        }
    };

    if (state.loading) {
        return <>
            <div className="loader-container">
                <Loader color='#3642e8' width={50}/>
            </div>
        </>
    }

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title text-uppercase">Booking Request Product Details</h3>
                                </div>

                                <div className="form-horizontal">
                                    <div className="card-body">
                                        <div className="form-group row">
                                            <label htmlFor="name" className="col-sm-3 col-form-label">Product name</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="name"
                                                       placeholder="Kaksiot" onChange={(val: any) => onInputChange('name', val)} defaultValue={state.bookingRequestProduct.name}/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="description" className="col-sm-3 col-form-label">Description</label>
                                            <div className="col-sm-9">
                                                <textarea className={`form-control`} id="description"
                                                          placeholder="Description" onChange={(val: any) => onInputChange('description', val)} defaultValue={state.bookingRequestProduct.description}/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="duration" className="col-sm-3 col-form-label">Duration</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="duration"
                                                       placeholder="1" onChange={(val: any) => onInputChange('duration', val)} defaultValue={state.bookingRequestProduct.duration}/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="image" className="col-sm-3 col-form-label">Image</label>
                                            <div className="col-sm-9">
                                                <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                                                    <input readOnly={true} type="text" className={`form-control`} style={{width: "calc(100% - 30px)"}} id="image"
                                                           placeholder="" defaultValue={image} /> <span className=" btn btn-outline-primary" onClick={handleOpenImageConfirm}><i className={"fas fa-plus"}></i></span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="card-footer">
                                        <button type="submit" className="btn btn-info" onClick={() => onSave(id)}>
                                            {state.loading ? 'Saving...' : 'Save changes'}
                                        </button>
                                        <Link to={'/booking-request-products'} className="btn btn-default float-right">Cancel</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {state.modalOpen && <ImageConfirm
                title={'Select image'}
                isOpen={state.modalOpen}
                onClose={handleCloseImageConfirm}
                onSelectImage={handleSelectImage}
            />}
        </>
    );
}

export default EditBookingRequestProduct;