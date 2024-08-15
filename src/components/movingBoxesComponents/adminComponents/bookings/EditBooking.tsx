import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getBookingDetails} from "../../../../services/movingBoxesServices/adminServices/BookingService";
import {getCompanies} from "../../../../services/movingBoxesServices/adminServices/CompaniesService";
import {Loader} from "../../../../views/Loader";

const EditBooking = () => {
    const [state, setState] = useState({
        bookingDetails: {
            id: '',
            booking_number: '',
            company_id: '',
            email: '',
            first_name: '',
            last_name: '',
            start_address: '',
            end_address: '',
            end_comment: '',
            start_date: '',
            end_date: '',
            end_door_code: '',
            end_door_number: '',
            phone: '',
            progress_status: '',
            quantity: '',
            price: '',
            start_price: '',
            end_price: '',
            rent_price: '',
            start_comment: '',
            start_door_code: '',
            start_door_number: '',
            payment_status: '',
            type: '',
            // additional_days: AdditionalDays[];
            created_at: '',
            updated_at: '',
        },
        loading: true,
        hasError: false,
    });
    let { id } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        const __init = async () => {
            const booking = await getBookingDetails(id);

            setState({...state, bookingDetails: booking, loading: false})
        }

        __init()
    }, []);

    const onInputChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state, bookingDetails: {
                ...state.bookingDetails, [key]: value
            }
        });
    }

    const onSave = async (id: any) => {
        setState({...state, hasError: false, loading: true});

        if (
            !state.bookingDetails.email ||
            !state.bookingDetails.first_name ||
            !state.bookingDetails.last_name ||
            !state.bookingDetails.phone ||
            !state.bookingDetails.start_address ||
            !state.bookingDetails.end_address ||
            !state.bookingDetails.start_date ||
            !state.bookingDetails.end_date ||
            !state.bookingDetails.end_door_code ||
            !state.bookingDetails.end_door_number ||
            !state.bookingDetails.quantity ||
            !state.bookingDetails.price ||
            !state.bookingDetails.start_price ||
            !state.bookingDetails.end_price ||
            !state.bookingDetails.rent_price ||
            !state.bookingDetails.type
        ){
            setState({
                ...state,
                hasError: true
            })

            return;
        }

        if (!state.hasError){
            //const res = await saveBookingDetails(id, state.bookingDetails);

            // if (res) {
            //     setState({...state, loading: false})
            // }
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
        <div className="content-header">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title text-uppercase">Booking Details</h3>
                            </div>

                            <div className="form-horizontal">
                                <div className="card-body">
                                    <div className="form-group row">
                                        <label htmlFor="first_name" className="col-sm-3 col-form-label">Booking Number</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.bookingDetails.booking_number ? 'is-invalid' : ''}`} id="booking_number"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('booking_number', val)} defaultValue={state.bookingDetails.booking_number} disabled={true}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="first_name" className="col-sm-3 col-form-label">First name</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.bookingDetails.first_name ? 'is-invalid' : ''}`} id="first_name"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('first_name', val)} defaultValue={state.bookingDetails.first_name}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="first_name" className="col-sm-3 col-form-label">Last name</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.bookingDetails.last_name ? 'is-invalid' : ''}`} id="last_name"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('last_name', val)} defaultValue={state.bookingDetails.last_name}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="first_name" className="col-sm-3 col-form-label">Email</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.bookingDetails.email ? 'is-invalid' : ''}`} id="email"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('email', val)} defaultValue={state.bookingDetails.email}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="first_name" className="col-sm-3 col-form-label">Phone</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.bookingDetails.phone ? 'is-invalid' : ''}`} id="phone"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('phone', val)} defaultValue={state.bookingDetails.phone}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="first_name" className="col-sm-3 col-form-label">Start Address</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.bookingDetails.start_address ? 'is-invalid' : ''}`} id="start_address"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('start_address', val)} defaultValue={state.bookingDetails.start_address}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="first_name" className="col-sm-3 col-form-label">End Address</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.bookingDetails.end_address ? 'is-invalid' : ''}`} id="end_address"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('end_address', val)} defaultValue={state.bookingDetails.end_address}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="first_name" className="col-sm-3 col-form-label">Start Date</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.bookingDetails.start_date ? 'is-invalid' : ''}`} id="start_date"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('start_date', val)} defaultValue={state.bookingDetails.start_date}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="first_name" className="col-sm-3 col-form-label">End Date</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.bookingDetails.end_date ? 'is-invalid' : ''}`} id="end_date"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('end_date', val)} defaultValue={state.bookingDetails.end_date}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="first_name" className="col-sm-3 col-form-label">Start Door Number</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.bookingDetails.start_door_number ? 'is-invalid' : ''}`} id="start_door_number"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('start_door_number', val)} defaultValue={state.bookingDetails.start_door_number}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="first_name" className="col-sm-3 col-form-label">Start Door Code</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.bookingDetails.start_door_code ? 'is-invalid' : ''}`} id="start_door_code"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('start_door_code', val)} defaultValue={state.bookingDetails.start_door_code}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="first_name" className="col-sm-3 col-form-label">End Door Number</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.bookingDetails.end_door_number ? 'is-invalid' : ''}`} id="end_door_number"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('end_door_number', val)} defaultValue={state.bookingDetails.end_door_number}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="first_name" className="col-sm-3 col-form-label">End Door Code</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.bookingDetails.end_door_code ? 'is-invalid' : ''}`} id="end_door_code"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('end_door_code', val)} defaultValue={state.bookingDetails.end_door_code}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="first_name" className="col-sm-3 col-form-label">Quantity</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.bookingDetails.quantity ? 'is-invalid' : ''}`} id="quantity"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('quantity', val)} defaultValue={state.bookingDetails.quantity}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="first_name" className="col-sm-3 col-form-label">Price</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.bookingDetails.price ? 'is-invalid' : ''}`} id="price"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('price', val)} defaultValue={state.bookingDetails.price}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="first_name" className="col-sm-3 col-form-label">Start Price</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.bookingDetails.start_price ? 'is-invalid' : ''}`} id="start_price"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('start_price', val)} defaultValue={state.bookingDetails.start_price}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="first_name" className="col-sm-3 col-form-label">End Price</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.bookingDetails.end_price ? 'is-invalid' : ''}`} id="end_price"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('end_price', val)} defaultValue={state.bookingDetails.end_price}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="first_name" className="col-sm-3 col-form-label">Rent Price</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.bookingDetails.rent_price ? 'is-invalid' : ''}`} id="rent_price"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('rent_price', val)} defaultValue={state.bookingDetails.rent_price}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="first_name" className="col-sm-3 col-form-label">Payment Status</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.bookingDetails.payment_status ? 'is-invalid' : ''}`} id="payment_status"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('payment_status', val)} defaultValue={state.bookingDetails.payment_status}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="first_name" className="col-sm-3 col-form-label">Progress Status</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.bookingDetails.progress_status ? 'is-invalid' : ''}`} id="progress_status"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('payment_status', val)} defaultValue={state.bookingDetails.progress_status}/>
                                        </div>
                                    </div>

                                </div>

                                <div className="card-footer">
                                    {/*<button type="submit" className="btn btn-info" onClick={() => onSave(id)}>*/}
                                    {/*    {state.loading ? 'Saving...' : 'Save changes'}*/}
                                    {/*</button>*/}
                                    <Link to={'/month'} className="btn btn-default float-right">Cancel</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditBooking;