import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Booking} from "../../../../interfaces/movingBoxesInterfaces/companyInterfaces/IBooking";
import {getMbCompanyId, GMAPKEY} from "../../../../config";
import {addBooking} from "../../../../services/movingBoxesServices/companyServices/BookingService";
import Autocomplete, { usePlacesWidget } from "react-google-autocomplete";
import ReactDatePicker from "react-datepicker";
import moment from "moment";
import {Loader} from "../../../../views/Loader";

const CreateBooking = () => {
    const [state, setState] = useState({
        bookingDetails: {} as Booking,
        loading: true,
        hasError: false,
    });

    const [start_address, setStart_address] = useState<string>('')
    const [end_address, setEnd_address] = useState<string>('')

    let navigate = useNavigate();

    useEffect(() => {
        const __init = async () => {
            const companyId = await getMbCompanyId()
            setState({...state, loading: false, bookingDetails: {
                ...state.bookingDetails, company_id: companyId,
            }})
        }

        __init();

    }, []);

    const onInputChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({...state, bookingDetails: {
            ...state.bookingDetails, [key]: value
        }})
    }

    const onStartAddressChange = (place: any) => {
        let city = "";
        place.address_components.forEach((addressComponent: any) => {
            if (addressComponent.types[0] === "locality") {
                city = addressComponent.long_name;
            }
        });

        console.log(place.formatted_address);
        setStart_address(place.formatted_address);
    };

    const onEndAddressChange = (place: any) => {
        let city = "";
        place.address_components.forEach((addressComponent: any) => {
            if (addressComponent.types[0] === "locality") {
                city = addressComponent.long_name;
            }
        });

        setEnd_address(place.formatted_address);
    };

    const onStartDateChange = (val: any) => {
        setState({...state, bookingDetails: {
                ...state.bookingDetails, start_date: val
        }})
    };

    const onEndDateChange = (val: any) => {
        setState({...state, bookingDetails: {
                ...state.bookingDetails, end_date: val
            }})
    };

    const onCreate = async () => {
        setState({...state, hasError: false})

        if (
            !state.bookingDetails.first_name ||
            !state.bookingDetails.last_name ||
            !state.bookingDetails.email ||
            !state.bookingDetails.phone ||
            !state.bookingDetails.start_date ||
            !state.bookingDetails.end_date ||
            !state.bookingDetails.start_door_number ||
            !state.bookingDetails.end_door_number ||
            !state.bookingDetails.start_door_code ||
            !state.bookingDetails.end_door_code ||
            !state.bookingDetails.quantity ||
            !state.bookingDetails.price ||
            !state.bookingDetails.rent_price ||
            !state.bookingDetails.start_price ||
            !state.bookingDetails.end_price
        ){
            setState({
                ...state,
                hasError: true
            })

            return;
        }

        if (!state.hasError){
            const data = {
                company_id: state.bookingDetails.company_id,
                first_name: state.bookingDetails.first_name,
                last_name: state.bookingDetails.last_name,
                email: state.bookingDetails.email,
                phone: state.bookingDetails.phone,
                start_address: start_address,
                end_address: end_address,
                start_date: moment(state.bookingDetails.start_date).format('YYYY-MM-DD'),
                end_date: moment(state.bookingDetails.end_date).format('YYYY-MM-DD'),
                start_door_number: state.bookingDetails.start_door_number,
                end_door_number: state.bookingDetails.end_door_number,
                start_door_code: state.bookingDetails.start_door_code,
                end_door_code: state.bookingDetails.end_door_code,
                quantity: state.bookingDetails.quantity,
                price: state.bookingDetails.price,
                rent_price: state.bookingDetails.rent_price,
                start_price: state.bookingDetails.start_price,
                end_price: state.bookingDetails.end_price,
                type: state.bookingDetails.type,
                start_comment: '',
                end_comment: '',
                payment_status: state.bookingDetails.payment_status,
                progress_status: state.bookingDetails.progress_status,
            }

            console.log(data)
            const res = await addBooking(data);

            if (res) {
                navigate('/day');
            }
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
                                <h3 className="card-title text-uppercase">Create Booking</h3>
                            </div>

                            <div className="form-horizontal">
                                <div className="card-body">

                                    <div className="form-group row">
                                        <label htmlFor="first_name" className="col-sm-3 col-form-label">First Name</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.bookingDetails.first_name ? 'is-invalid' : ''}`} id="first_name"
                                                   placeholder="John" onChange={(val: any) => onInputChange('first_name', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="last_name" className="col-sm-3 col-form-label">Last Name</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.bookingDetails.last_name ? 'is-invalid' : ''}`} id="last_name"
                                                   placeholder="Doe" onChange={(val: any) => onInputChange('last_name', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
                                        <div className="col-sm-9">
                                            <input type="email" className={`form-control ${state.hasError && !state.bookingDetails.email ? 'is-invalid' : ''}`} id="email"
                                                   placeholder="name@email.com" onChange={(val: any) => onInputChange('email', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="phone" className="col-sm-3 col-form-label">Phone</label>
                                        <div className="col-sm-9">
                                            <input type="email" className={`form-control ${state.hasError && !state.bookingDetails.phone ? 'is-invalid' : ''}`} id="phone"
                                                   placeholder="0451112223" onChange={(val: any) => onInputChange('phone', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="start_address" className="col-sm-3 col-form-label">Start Address</label>
                                        <div className="col-sm-9">
                                            <Autocomplete
                                                apiKey={GMAPKEY}
                                                onPlaceSelected={onStartAddressChange}
                                                options={{
                                                    types: ["address"],
                                                    componentRestrictions: { country: "fi" },
                                                }}
                                                defaultValue={start_address}
                                                id="start_address"
                                                placeholder="Esimerkikatu 1, Helsinki"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="end_address" className="col-sm-3 col-form-label">End Address</label>
                                        <div className="col-sm-9">
                                            <Autocomplete
                                                apiKey={GMAPKEY}
                                                onPlaceSelected={onEndAddressChange}
                                                options={{
                                                    types: ["address"],
                                                    componentRestrictions: { country: "fi" },
                                                }}
                                                defaultValue={end_address}
                                                id="end_address"
                                                placeholder="Esimerkikatu 1, Helsinki"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="start_door_number" className="col-sm-3 col-form-label">Start Date</label>
                                        <div className="col-sm-9">
                                            <ReactDatePicker
                                                onChange={onStartDateChange}
                                                onSelect={onStartDateChange}
                                                selected={state.bookingDetails.start_date}
                                                // value={state.date}
                                                minDate={new Date()}
                                                className={`form-control ${state.hasError && !state.bookingDetails.start_date ? 'is-invalid' : ''}`}
                                                placeholderText={'dd.mm.yyyy'}
                                                dateFormat={'d.M.Y'}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="start_door_number" className="col-sm-3 col-form-label">End Date</label>
                                        <div className="col-sm-9">
                                            <ReactDatePicker
                                                onChange={onEndDateChange}
                                                onSelect={onEndDateChange}
                                                selected={state.bookingDetails.end_date}
                                                // value={state.date}
                                                minDate={new Date()}
                                                className={`form-control ${state.hasError && !state.bookingDetails.end_date ? 'is-invalid' : ''}`}
                                                placeholderText={'dd.mm.yyyy'}
                                                dateFormat={'d.M.Y'}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="start_door_number" className="col-sm-3 col-form-label">Start Door Nr</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.bookingDetails.start_door_number ? 'is-invalid' : ''}`} id="start_door_number"
                                                   placeholder="10" onChange={(val: any) => onInputChange('start_door_number', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="end_door_number" className="col-sm-3 col-form-label">End Door Nr</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.bookingDetails.end_door_number ? 'is-invalid' : ''}`} id="end_door_number"
                                                   placeholder="10" onChange={(val: any) => onInputChange('end_door_number', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="start_door_code" className="col-sm-3 col-form-label">Start Door Code</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.bookingDetails.start_door_code ? 'is-invalid' : ''}`} id="start_door_code"
                                                   placeholder="10" onChange={(val: any) => onInputChange('start_door_code', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="end_door_code" className="col-sm-3 col-form-label">End Door Code</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.bookingDetails.end_door_code ? 'is-invalid' : ''}`} id="end_door_code"
                                                   placeholder="10" onChange={(val: any) => onInputChange('end_door_code', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="quantity" className="col-sm-3 col-form-label">Quantity</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.bookingDetails.quantity ? 'is-invalid' : ''}`} id="quantity"
                                                   placeholder="10" onChange={(val: any) => onInputChange('quantity', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="price" className="col-sm-3 col-form-label">Price</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.bookingDetails.price ? 'is-invalid' : ''}`} id="price"
                                                   placeholder="10" onChange={(val: any) => onInputChange('price', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="rent_price" className="col-sm-3 col-form-label">Rent Price</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.bookingDetails.rent_price ? 'is-invalid' : ''}`} id="rent_price"
                                                   placeholder="10" onChange={(val: any) => onInputChange('rent_price', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="start_price" className="col-sm-3 col-form-label">Start Price</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.bookingDetails.start_price ? 'is-invalid' : ''}`} id="start_price"
                                                   placeholder="10" onChange={(val: any) => onInputChange('start_price', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="end_price" className="col-sm-3 col-form-label">End Price</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.bookingDetails.end_price ? 'is-invalid' : ''}`} id="end_price"
                                                   placeholder="10" onChange={(val: any) => onInputChange('end_price', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="type" className="col-sm-3 col-form-label">Type</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.bookingDetails.type ? 'is-invalid' : ''}`} id="type"
                                                   placeholder="" onChange={(val: any) => onInputChange('type', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="payment_status" className="col-sm-3 col-form-label">Payment Status</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.bookingDetails.payment_status ? 'is-invalid' : ''}`} id="payment_status"
                                                   placeholder="10" onChange={(val: any) => onInputChange('payment_status', "unpaid")} value="unpaid"/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="progress_status" className="col-sm-3 col-form-label">Progress Status</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.bookingDetails.progress_status ? 'is-invalid' : ''}`} id="progress_status"
                                                   placeholder="10" onChange={(val: any) => onInputChange('progress_status', "to-deliver")} value="to-deliver"/>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-footer">
                                    <button type="submit" className="btn btn-info" onClick={onCreate}>
                                        {state.loading ? 'Saving...' : 'Save changes'}
                                    </button>
                                    <Link to={'/day'} className="btn btn-default float-right">Cancel</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateBooking