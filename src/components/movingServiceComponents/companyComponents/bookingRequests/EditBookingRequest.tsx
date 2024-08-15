import {Link, useParams, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import {GMAPKEY} from "../../../../config";
import { usePlacesWidget } from "react-google-autocomplete";
import {getBookingRequestDetails, saveBookingRequestDetails} from "../../../../services/movingServiceServices/companyServices/BookingRequest";
import { getProducts } from "../../../../services/movingServiceServices/companyServices/ProductsService";
import {BookingRequest} from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/IBookingRequest";
import {Product} from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/IProduct";
import {Loader} from "../../../../views/Loader";

const EditBookingRequest = () => {
    const [state, setState] = useState({
        bookingRequest: {} as BookingRequest,
        products: [] as Product[],
        id: 0,
        hasError: false,
        loading: true,
    });

    const [start_address, setStart_address] = useState<string>('')
    const [end_address, setEnd_address] = useState<string>('')

    let { id } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        const __init = async () => {
            const bookingRequest = await getBookingRequestDetails(id);
            const products = await getProducts();
            setState({...state, bookingRequest, products, loading: false});
            setStart_address(bookingRequest.start_address);
            setEnd_address(bookingRequest.end_address);
        }

        __init();

    }, []);

    const onInputChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state, bookingRequest: {
                ...state.bookingRequest,
                [key]: value
            }
        })
    }

    const onStartAddressChange = async (place: any) => {
        let city = "";
        place.address_components.forEach((addressComponent: any) => {
            if (addressComponent.types[0] === "locality") {
                city = addressComponent.long_name;
            }
        });

        setStart_address(place.formatted_address)
    };

    const onEndAddressChange = async (place: any) => {
        let city = "";
        place.address_components.forEach((addressComponent: any) => {
            if (addressComponent.types[0] === "locality") {
                city = addressComponent.long_name;
            }
        });

        setEnd_address(place.formatted_address)
    };

    const {ref: startAddressRef}: any = usePlacesWidget({
        apiKey: GMAPKEY,
        onPlaceSelected: (place: any) => onStartAddressChange(place),
        options: {
            types: ["address"],
            componentRestrictions: { country: "fi" },
        },
    } as any);

    const { ref: endAddressRef }: any = usePlacesWidget({
        apiKey: GMAPKEY,
        onPlaceSelected: (place: any) => onEndAddressChange(place),
        options: {
            types: ["address"],
            componentRestrictions: { country: "fi" },
        }
    } as any);

    const onSave = async (id: any) => {

        const data = {
            product_id: state.bookingRequest.product_id,
            start_date: moment(state.bookingRequest.start_date).format('YYYY-MM-DD'),
            end_date: moment(state.bookingRequest.end_date).format('YYYY-MM-DD'),
            first_name: state.bookingRequest.first_name,
            last_name: state.bookingRequest.last_name,
            email: state.bookingRequest.email,
            phone: state.bookingRequest.phone,
            start_address: start_address,
            end_address: end_address,
            start_door_number: state.bookingRequest.start_door_number,
            end_door_number: state.bookingRequest.end_door_number,
            start_door_code: state.bookingRequest.start_door_code,
            end_door_code: state.bookingRequest.end_door_code,
            start_floor: state.bookingRequest.start_floor,
            end_floor: state.bookingRequest.end_floor,
            start_elevator: state.bookingRequest.start_elevator,
            end_elevator: state.bookingRequest.end_elevator,
            start_outdoor_distance: state.bookingRequest.start_outdoor_distance,
            end_outdoor_distance: state.bookingRequest.end_outdoor_distance,
            start_storage: state.bookingRequest.start_storage,
            end_storage: state.bookingRequest.end_storage,
            start_storage_m2: state.bookingRequest.start_storage_m2,
            end_storage_m2: state.bookingRequest.end_storage_m2,
            start_storage_floor: state.bookingRequest.start_storage_floor,
            end_storage_floor: state.bookingRequest.end_storage_floor,
            start_square_meters: state.bookingRequest.start_square_meters,
            end_square_meters: state.bookingRequest.end_square_meters,
        }

        const res = await saveBookingRequestDetails(id, data);

        if (res) {
            setState({...state, loading: false});
            navigate('/booking-request-month');
        }
    };

    const renderProducts = () => {
        return (
            state.products.map((product: any) => (
                <option value={product.id} key={product.id}>{product.name}</option>
            ))
        );
    }

    const onStartDateChange = async (val: any) => {
        const selectedDate = new Date(moment(val).format('yyyy-MM-DD'));

        setState({
            ...state,
            bookingRequest: {
                ...state.bookingRequest,
                start_date: selectedDate,
            },
        });
    };

    const onEndDateChange = async (val: any) => {
        const selectedDate = new Date(moment(val).format('yyyy-MM-DD'));

        setState({
            ...state,
            bookingRequest: {
                ...state.bookingRequest,
                end_date: selectedDate,
            },
        });
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
                        <div className={`col-md-12`}>
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title text-uppercase">Booking Request Details</h3>
                                </div>

                                <div className="form-horizontal">
                                    <div className="card-body">

                                        <div className="form-group row">
                                            <label htmlFor="product_id" className="col-sm-3 col-form-label">Product Id</label>
                                            <div className="col-sm-9">
                                                <select disabled className={`form-control`} name="product_id" id="product_id"
                                                        onChange={(val: any) => onInputChange('product_id', val)} value={state.bookingRequest.product_id}>
                                                    <option value={0}>-- Select Product --</option>
                                                    {renderProducts()}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="start_date" className="col-sm-3 col-form-label">Start Date</label>
                                            <div className="col-sm-9">
                                                <DatePicker
                                                    className={'form-control'}
                                                    onChange={onStartDateChange}
                                                    selected={new Date(moment(state.bookingRequest.start_date).format('yyyy-MM-DD'))}
                                                    minDate={new Date()}
                                                    placeholderText={'dd.mm.yyyy'}
                                                    dateFormat={'dd.MM.yyyy'}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="end_date" className="col-sm-3 col-form-label">End Date</label>
                                            <div className="col-sm-9">
                                                <DatePicker
                                                    className={'form-control'}
                                                    onChange={onEndDateChange}
                                                    selected={new Date(moment(state.bookingRequest.end_date).format('yyyy-MM-DD'))}
                                                    placeholderText={'dd.mm.yyyy'}
                                                    dateFormat={'dd.MM.yyyy'}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="first_name" className="col-sm-3 col-form-label">First Name</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="first_name"
                                                       placeholder="John" defaultValue={state.bookingRequest.first_name} onChange={(val: any) => onInputChange('first_name', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="last_name" className="col-sm-3 col-form-label">Last Name</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="last_name"
                                                       placeholder="Doe" defaultValue={state.bookingRequest.last_name} onChange={(val: any) => onInputChange('last_name', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="email"
                                                       placeholder="john.doe@example.com" defaultValue={state.bookingRequest.email} onChange={(val: any) => onInputChange('email', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="phone" className="col-sm-3 col-form-label">Phone</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control ${state.hasError && !state.bookingRequest.phone ? 'is-invalid' : ''}`} id="phone"
                                                       placeholder="" defaultValue={state.bookingRequest.phone} onChange={(val: any) => onInputChange('phone', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="start_address" className="col-sm-3 col-form-label">Start Address</label>
                                            <div className="col-sm-9">
                                                <input
                                                    className={`form-control`}
                                                    type="text"
                                                    id="start_address"
                                                    placeholder="Esimerkikatu 1, Helsinki"
                                                    ref={startAddressRef}
                                                    defaultValue={start_address}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="end_address" className="col-sm-3 col-form-label">End Address</label>
                                            <div className="col-sm-9">
                                                <input
                                                    className={`form-control`}
                                                    type="text"
                                                    id="start_address"
                                                    placeholder="Esimerkikatu 1, Helsinki"
                                                    ref={endAddressRef}
                                                    defaultValue={end_address}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="start_door_number" className="col-sm-3 col-form-label">Start Door Number</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="start_door_number"
                                                       placeholder="0" defaultValue={state.bookingRequest.start_door_number} onChange={(val: any) => onInputChange('start_door_number', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="end_door_number" className="col-sm-3 col-form-label">End Door Number</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="end_door_number"
                                                       placeholder="0" defaultValue={state.bookingRequest.end_door_number} onChange={(val: any) => onInputChange('end_door_number', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="start_door_code" className="col-sm-3 col-form-label">Start Door Code</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="start_door_code"
                                                       placeholder="0" defaultValue={state.bookingRequest.start_door_code} onChange={(val: any) => onInputChange('start_door_code', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="end_door_code" className="col-sm-3 col-form-label">End Door Code</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="end_door_code"
                                                       placeholder="0" defaultValue={state.bookingRequest.end_door_code} onChange={(val: any) => onInputChange('end_door_code', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="start_floor" className="col-sm-3 col-form-label">Start Floor</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="start_floor"
                                                       placeholder="0" defaultValue={state.bookingRequest.start_floor} onChange={(val: any) => onInputChange('start_floor', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="end_floor" className="col-sm-3 col-form-label">End Floor</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="end_floor"
                                                       placeholder="0" defaultValue={state.bookingRequest.end_floor} onChange={(val: any) => onInputChange('end_floor', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="start_elevator" className="col-sm-3 col-form-label">Start Elevator</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="start_elevator"
                                                       placeholder="0" defaultValue={state.bookingRequest.start_elevator} onChange={(val: any) => onInputChange('start_elevator', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="end_elevator" className="col-sm-3 col-form-label">End Elevator</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="end_elevator"
                                                       placeholder="0" defaultValue={state.bookingRequest.end_elevator} onChange={(val: any) => onInputChange('end_elevator', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="start_outdoor_distance" className="col-sm-3 col-form-label">Start Outdoor Distance</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="start_outdoor_distance"
                                                       placeholder="0" defaultValue={state.bookingRequest.start_outdoor_distance} onChange={(val: any) => onInputChange('start_outdoor_distance', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="end_outdoor_distance" className="col-sm-3 col-form-label">End Outdoor Distance</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="end_outdoor_distance"
                                                       placeholder="0" defaultValue={state.bookingRequest.end_outdoor_distance} onChange={(val: any) => onInputChange('end_outdoor_distance', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="start_storage" className="col-sm-3 col-form-label">Start Storage</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="start_storage"
                                                       placeholder="0" defaultValue={state.bookingRequest.start_storage} onChange={(val: any) => onInputChange('start_storage', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="end_storage" className="col-sm-3 col-form-label">End Storage</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="end_storage"
                                                       placeholder="0" defaultValue={state.bookingRequest.end_storage} onChange={(val: any) => onInputChange('end_storage', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="start_storage_m2" className="col-sm-3 col-form-label">Start Storage M2</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="start_storage_m2"
                                                       placeholder="0" defaultValue={state.bookingRequest.start_storage_m2} onChange={(val: any) => onInputChange('start_storage_m2', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="end_storage_m2" className="col-sm-3 col-form-label">End Storage M2</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="end_storage_m2"
                                                       placeholder="0" defaultValue={state.bookingRequest.end_storage_m2} onChange={(val: any) => onInputChange('end_storage_m2', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="start_storage_floor" className="col-sm-3 col-form-label">Start Storage Floor</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="start_storage_floor"
                                                       placeholder="0" defaultValue={state.bookingRequest.start_storage_floor} onChange={(val: any) => onInputChange('start_storage_floor', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="end_storage_floor" className="col-sm-3 col-form-label">End Storage Floor</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="end_storage_floor"
                                                       placeholder="0" defaultValue={state.bookingRequest.end_storage_floor} onChange={(val: any) => onInputChange('end_storage_floor', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="start_square_meters" className="col-sm-3 col-form-label">Start Square Meters</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="start_square_meters"
                                                       placeholder="0" defaultValue={state.bookingRequest.start_square_meters} onChange={(val: any) => onInputChange('start_square_meters', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="end_square_meters" className="col-sm-3 col-form-label">End Square Meters</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="end_square_meters"
                                                       placeholder="0" defaultValue={state.bookingRequest.end_square_meters} onChange={(val: any) => onInputChange('end_square_meters', val)} />
                                            </div>
                                        </div>

                                    </div>

                                    <div className="card-footer">
                                        <button type="submit" className="btn btn-info" onClick={() => onSave(id)}>
                                            {state.loading ? 'Saving...' : 'Save changes'}
                                        </button>

                                        <Link to={'/month'} className="btn btn-default float-right">Cancel</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditBookingRequest