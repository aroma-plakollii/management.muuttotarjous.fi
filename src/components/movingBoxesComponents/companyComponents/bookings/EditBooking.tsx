import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import { GMAPKEY } from "../../../../config";
import { usePlacesWidget } from "react-google-autocomplete";
import Autocomplete from "react-google-autocomplete";
import {getAdditionalDays, getBookingDetails, saveBookingDetails, deleteAdditionalDays} from "../../../../services/movingBoxesServices/companyServices/BookingService";
import {Booking} from "../../../../interfaces/movingBoxesInterfaces/companyInterfaces/IBooking";
import DatePicker from "react-datepicker";
import moment from "moment";
import {Loader} from "../../../../views/Loader";

const EditBooking = () => {
    const [state, setState] = useState({
        booking: {} as Booking,
        additional_days: [],
        companies: [],
        additionalDayIsDeleted: false,
        loading: true,
        hasError: false,
    });

    const [start_address, setStart_address] = useState<string>('')
    const [end_address, setEnd_address] = useState<string>('')

    let { id } = useParams();
    let navigate = useNavigate();

    const onDelete = async (id: number) => {
        const isDeleted = await deleteAdditionalDays(id);

        if (isDeleted){
            setState({...state, additionalDayIsDeleted: true});
        }

        console.log(state.additionalDayIsDeleted)
    };

    useEffect(() => {
        const __init = async () => {
            const booking = await getBookingDetails(id);
            const additionalDays = await getAdditionalDays(id);

            setState({...state, booking, additional_days: additionalDays, loading: false})
            setStart_address(booking.start_address)
            setEnd_address(booking.end_address)
        }

        __init()
    }, [state.additionalDayIsDeleted]);

    const onInputChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state, booking: {
                ...state.booking, [key]: value
            }
        });
    }

    // const onStartAddressChange = async (place: any) => {
    //     let city = "";
    //     place.address_components.forEach((addressComponent: any) => {
    //         if (addressComponent.types[0] === "locality") {
    //             city = addressComponent.long_name;
    //         }
    //     });
    //
    //     console.log(place.formatted_address)
    //     setStart_address(place.formatted_address)
    // };
    //
    // const onEndAddressChange = async (place: any) => {
    //     let city = "";
    //     place.address_components.forEach((addressComponent: any) => {
    //         if (addressComponent.types[0] === "locality") {
    //             city = addressComponent.long_name;
    //         }
    //     });
    //
    //     setEnd_address(place.formatted_address)
    // };
    //
    // const {ref: start}: any = usePlacesWidget({
    //     apiKey: GMAPKEY,
    //     onPlaceSelected: (place: any) => onStartAddressChange(place),
    //     options: {
    //         types: ["address"],
    //         componentRestrictions: { country: "fi" },
    //     },
    // } as any);
    //
    // const { ref : end }: any = usePlacesWidget({
    //     apiKey: GMAPKEY,
    //     onPlaceSelected: (place: any) => onEndAddressChange(place),
    //     options: {
    //         types: ["address"],
    //         componentRestrictions: { country: "fi" },
    //     }
    // } as any);

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

    const onSave = async (id: any) => {
        setState({...state, hasError: false, loading: true,
            booking: {
                ...state.booking,
                start_date: moment(state.booking.start_date).format('yyyy-MM-DD'),
                end_date: moment(state.booking.end_date).format('yyyy-MM-DD')
            }});

        if (
            !state.booking.email ||
            !state.booking.first_name ||
            !state.booking.last_name ||
            !state.booking.phone ||
            !state.booking.start_date ||
            !state.booking.end_date ||
            !state.booking.quantity ||
            !state.booking.price ||
            !state.booking.start_price ||
            !state.booking.end_price ||
            !state.booking.rent_price ||
            !state.booking.type
        ){
            setState({
                ...state,
                hasError: true
            })
            console.log(state.booking)
            return;
        }


        if (!state.hasError){
            const data = {
                first_name: state.booking.first_name,
                last_name: state.booking.last_name,
                email: state.booking.email,
                phone: state.booking.phone,
                start_address: start_address,
                end_address: end_address,
                start_date: moment(state.booking.start_date).format('yyyy-MM-DD hh:mm:ss'),
                end_date: moment(state.booking.end_date).format('yyyy-MM-DD hh:mm:ss'),
                start_door_number: state.booking.start_door_number,
                end_door_number: state.booking.end_door_number,
                start_door_code: state.booking.start_door_code,
                end_door_code: state.booking.end_door_code,
                quantity: state.booking.quantity,
                price: state.booking.price,
                rent_price: state.booking.rent_price,
                start_price: state.booking.start_price,
                end_price: state.booking.end_price,
                progress_status: state.booking.progress_status,
                start_comment: state.booking.start_comment,
                end_comment: state.booking.end_comment,
                payment_status: state.booking.payment_status,
            }

            const res = await saveBookingDetails(id, data);

            if (res) {
                setState({...state, loading: false})

                navigate('/day')
            }
        }
    };

    const onStartDateChange = async (val: any) => {
        setState({
            ...state, booking: {
                ...state.booking,
                start_date: new Date(moment(val).format('yyyy-MM-DD'))
            }
        });
    };

    const onEndDateChange = async (val: any) => {
        setState({
            ...state, booking: {
                ...state.booking,
                end_date: new Date(moment(val).format('yyyy-MM-DD'))
            }
        });
    };

    const getDate = (date: any) => {
        return moment(date).format('DD.MM.YYYY')
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
                    <div className={`${state.additional_days.length ===  0 ? 'col-md-12' : 'col-md-7'}`}>
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title text-uppercase">Booking Details</h3>
                            </div>

                            <div className="form-horizontal">
                                <div className="card-body">
                                    <div className="form-group row">
                                        <label htmlFor="first_name" className="col-sm-3 col-form-label">Booking Number</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.booking.booking_number ? 'is-invalid' : ''}`} id="booking_number"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('booking_number', val)} defaultValue={state.booking.booking_number} disabled={true}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="first_name" className="col-sm-3 col-form-label">First name</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.booking.first_name ? 'is-invalid' : ''}`} id="first_name"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('first_name', val)} defaultValue={state.booking.first_name}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="first_name" className="col-sm-3 col-form-label">Last name</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.booking.last_name ? 'is-invalid' : ''}`} id="last_name"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('last_name', val)} defaultValue={state.booking.last_name}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="first_name" className="col-sm-3 col-form-label">Email</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.booking.email ? 'is-invalid' : ''}`} id="email"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('email', val)} defaultValue={state.booking.email}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="first_name" className="col-sm-3 col-form-label">Phone</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.booking.phone ? 'is-invalid' : ''}`} id="phone"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('phone', val)} defaultValue={state.booking.phone}/>
                                        </div>
                                    </div>

                                    {/*<div className="form-group row">*/}
                                    {/*    <label htmlFor="start_address" className="col-sm-3 col-form-label">Start Address</label>*/}
                                    {/*    <div className="col-sm-9">*/}
                                    {/*        <input*/}
                                    {/*            className={`form-control`}*/}
                                    {/*            type="text"*/}
                                    {/*            id="start_address"*/}
                                    {/*            placeholder="Esimerkikatu 1, Helsinki"*/}
                                    {/*            ref={start}*/}
                                    {/*            defaultValue={start_address}*/}
                                    {/*        />*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}

                                    {/*<div className="form-group row">*/}
                                    {/*    <label htmlFor="end_address" className="col-sm-3 col-form-label">End Address</label>*/}
                                    {/*    <div className="col-sm-9">*/}
                                    {/*        <input*/}
                                    {/*            className={`form-control`}*/}
                                    {/*            type="text"*/}
                                    {/*            id="end_address"*/}
                                    {/*            placeholder="Esimerkikatu 1, Helsinki"*/}
                                    {/*            ref={end}*/}
                                    {/*            defaultValue={end_address}*/}
                                    {/*        />*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}

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
                                        <label htmlFor="first_name" className="col-sm-3 col-form-label">Start Date</label>
                                        <div className="col-sm-9">
                                            <DatePicker
                                                className={'form-control'}
                                                onChange={onStartDateChange}
                                                onSelect={onStartDateChange}
                                                selected={new Date(moment(state.booking.start_date).format('yyyy-MM-DD'))}
                                                dateFormat={'dd.MM.yyyy'}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="first_name" className="col-sm-3 col-form-label">End Date</label>
                                        <div className="col-sm-9">
                                            <DatePicker
                                                className={'form-control'}
                                                onChange={onEndDateChange}
                                                onSelect={onEndDateChange}
                                                selected={new Date(moment(state.booking.end_date).format('yyyy-MM-DD'))}
                                                dateFormat={'dd.MM.yyyy'}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="first_name" className="col-sm-3 col-form-label">Start Door Number</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control`} id="start_door_number"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('start_door_number', val)} defaultValue={state.booking.start_door_number}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="first_name" className="col-sm-3 col-form-label">Start Door Code</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control`} id="start_door_code"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('start_door_code', val)} defaultValue={state.booking.start_door_code}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="first_name" className="col-sm-3 col-form-label">End Door Number</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control`} id="end_door_number"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('end_door_number', val)} defaultValue={state.booking.end_door_number}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="first_name" className="col-sm-3 col-form-label">End Door Code</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control`} id="end_door_code"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('end_door_code', val)} defaultValue={state.booking.end_door_code}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="first_name" className="col-sm-3 col-form-label">Quantity</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.booking.quantity ? 'is-invalid' : ''}`} id="quantity"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('quantity', val)} defaultValue={state.booking.quantity}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="first_name" className="col-sm-3 col-form-label">Price</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.booking.price ? 'is-invalid' : ''}`} id="price"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('price', val)} defaultValue={state.booking.price}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="first_name" className="col-sm-3 col-form-label">Start Price</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.booking.start_price ? 'is-invalid' : ''}`} id="start_price"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('start_price', val)} defaultValue={state.booking.start_price}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="first_name" className="col-sm-3 col-form-label">End Price</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.booking.end_price ? 'is-invalid' : ''}`} id="end_price"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('end_price', val)} defaultValue={state.booking.end_price}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="first_name" className="col-sm-3 col-form-label">Rent Price</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.booking.rent_price ? 'is-invalid' : ''}`} id="rent_price"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('rent_price', val)} defaultValue={state.booking.rent_price}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="first_name" className="col-sm-3 col-form-label">Payment Status</label>
                                        <div className="col-sm-9">
                                            <select
                                                name="payment_status"
                                                id="payment_status"
                                                className={`form-control ${state.hasError && !state.booking.payment_status ? 'is-invalid' : ''}`}
                                                onChange={(val: any) => onInputChange('payment_status', val)}
                                                value={state.booking.payment_status}
                                            >
                                                <option value="paid">Paid</option>
                                                <option value="unpaid">Unpaid</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="first_name" className="col-sm-3 col-form-label">Progress Status</label>
                                        <div className="col-sm-9">
                                            <select
                                                name="progress_status"
                                                id="progress_status"
                                                className={`form-control ${state.hasError && !state.booking.progress_status ? 'is-invalid' : ''}`}
                                                onChange={(val: any) => onInputChange('progress_status', val)}
                                                value={state.booking.progress_status}
                                            >
                                                <option value="to-deliver">To Deliver</option>
                                                <option value="to-collect">To Collect</option>
                                                <option value="done">Done</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-footer">
                                    <button type="submit" className="btn btn-info" onClick={() => onSave(id)}>
                                        {state.loading ? 'Saving...' : 'Save changes'}
                                    </button>
                                    <Link to={'/day'} className="btn btn-default float-right">Cancel</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {state.additional_days.length === 0 ? '' : (<div className="col-md-5">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title text-uppercase">Additional Day Details</h3>
                            </div>

                            <div className="card-body table-responsive p-0">
                                <table className="table table-hover text-nowrap">
                                    <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Payment Status</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {state.additional_days.map((day: any) => {
                                        return <tr>
                                            <td>{getDate(day.date)}</td>
                                            <td>{day.price}</td>
                                            <td>{day.quantity}</td>
                                            <td>{day.payment_status}</td>
                                            <td>
                                                <div className="btn-group btn-group-sm">
                                                    <a href="javascript:void(0)" className="btn btn-danger" onClick={() => onDelete(day.id)}><i className="fas fa-trash"></i></a>
                                                </div>
                                            </td>
                                        </tr>
                                    })}

                                    </tbody>
                                </table>
                            </div>

                            <div className="card-footer"></div>
                        </div>
                    </div>)}
                </div>
            </div>
        </div>
    );
}

export default EditBooking;