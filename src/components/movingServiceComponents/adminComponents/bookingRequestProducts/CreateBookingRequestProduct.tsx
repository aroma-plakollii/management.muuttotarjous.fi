import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {addBookingRequestProduct} from "../../../../services/movingServiceServices/adminServices/BookingRequestProductService";
import {BookingRequestProduct} from "../../../../interfaces/movingServiceInterfaces/adminInterfaces/IBokingRequestProduct";
import ImageConfirm from "../shared/ImageConfirm";

const CreateBookingRequestProduct = () => {
    const [state, setState] = useState({
        bookingRequestProductDetails: {} as BookingRequestProduct,
        loading: false,
        modalOpen: false,
        hasError: false,
    });

    const [image, setImage] = useState('');

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

    const onInputChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state, bookingRequestProductDetails: {
                ...state.bookingRequestProductDetails, [key]: value
            }
        })
    }

    const onCreate = async () => {
        setState({...state, hasError: false});

        if (
            !state.bookingRequestProductDetails.name ||
            !state.bookingRequestProductDetails.description ||
            !state.bookingRequestProductDetails.duration
        ){
            setState({
                ...state,
                hasError: true
            })

            return;
        }

        if (!state.hasError){

            const data = {
                name: state.bookingRequestProductDetails.name,
                description: state.bookingRequestProductDetails.description,
                duration: state.bookingRequestProductDetails.duration,
                image: image
            }

            const res = await addBookingRequestProduct(data);

            if (res) {
                navigate('/booking-request-products');
            }
        }
    };

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
                                            <label htmlFor="name" className="col-sm-3 col-form-label">Product Name</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control ${state.hasError && !state.bookingRequestProductDetails.name ? 'is-invalid' : ''}`} id="name"
                                                       placeholder="Kaksiot" onChange={(val: any) => onInputChange('name', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="description" className="col-sm-3 col-form-label">Description</label>
                                            <div className="col-sm-9">
                                                <textarea className={`form-control ${state.hasError && !state.bookingRequestProductDetails.description ? 'is-invalid' : ''}`} id="description"
                                                          placeholder="Description" onChange={(val: any) => onInputChange('description', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="duration" className="col-sm-3 col-form-label">Duration</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control ${state.hasError && !state.bookingRequestProductDetails.duration ? 'is-invalid' : ''}`} id="duration"
                                                       placeholder="duration" onChange={(val: any) => onInputChange('duration', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="image" className="col-sm-3 col-form-label">Image</label>
                                            <div className="col-sm-9">
                                                <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                                                    <input readOnly={true} type="text" className={`form-control ${state.hasError && !state.bookingRequestProductDetails.image ? 'is-invalid' : ''}`} style={{width: "calc(100% - 30px)"}} id="image"
                                                           placeholder="" value={image} /> <span className=" btn btn-outline-primary" onClick={handleOpenImageConfirm}><i className={"fas fa-plus"}></i></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card-footer">
                                        <button type="submit" className="btn btn-info" onClick={onCreate}>
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

export default CreateBookingRequestProduct