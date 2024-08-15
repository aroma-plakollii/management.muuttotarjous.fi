import {Link, useParams, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import ReactQuill from 'react-quill';
import DatePicker from "react-datepicker";
import moment from "moment";
import {getMsCompanyId, GMAPKEY} from "../../../../config";
import { usePlacesWidget } from "react-google-autocomplete";
import { getCompanyDetails } from "../../../../services/movingServiceServices/companyServices/CompaniesService";
import { getUnitsByCompany } from "../../../../services/movingServiceServices/companyServices/UnitService";
import { getProducts } from "../../../../services/movingServiceServices/companyServices/ProductsService";
import { createBooking, createBookingSendPaymentLink } from "../../../../services/movingServiceServices/companyServices/BookingService";
import { Booking } from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/IBooking";
import {Company} from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/ICompany";
import {Unit} from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/IUnit";
import {Product} from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/IProduct";
import {Loader} from "../../../../views/Loader";

const AddAJob = () => {

    const [state, setState] = useState({
        booking: {} as Booking,
        company: {} as Company,
        units: [] as Unit[],
        products: [] as Product[],
        hasError: false,
        loading: true,
    });

    const [start_address, setStart_address] = useState<string>('')
    const [end_address, setEnd_address] = useState<string>('')
    const [description, setDescription] = useState('')

    let { id } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        const __init = async () => {
            const companyId = await getMsCompanyId();
            const company = await getCompanyDetails(companyId);
            const units = await getUnitsByCompany(companyId);
            const products = await getProducts();
            setState({...state, company, units, products, loading: false})
        }

        __init();

    }, []);

    const onInputChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state, booking: {
                ...state.booking,
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

    const onSendOfferPaymentLinkWillBeSentLater = async () => {

        setState({...state, hasError: false});

        if (
            !state.booking.price ||
            !state.booking.email
        ){
            setState({
                ...state,
                hasError: true
            })

            return;
        }

        const data = {
            company_id: state.company.id,
            unit_id: state.booking.unit_id,
            product_id: state.booking.product_id,
            start_date: moment(state.booking.start_date).format('YYYY-MM-DD HH:mm:ss'),
            end_date: moment(state.booking.end_date).format('YYYY-MM-DD HH:mm:ss'),
            price: state.booking.price,
            first_name: state.booking.first_name,
            last_name: state.booking.last_name,
            email: state.booking.email,
            phone: state.booking.phone,
            start_address: start_address,
            end_address: end_address,
            start_door_number: state.booking.start_door_number,
            end_door_number: state.booking.end_door_number,
            start_door_code: state.booking.start_door_code,
            end_door_code: state.booking.end_door_code,
            start_comment: description,
            start_floor: state.booking.start_floor,
            end_floor: state.booking.end_floor,
            start_elevator: state.booking.start_elevator,
            end_elevator: state.booking.end_elevator,
            start_outdoor_distance: state.booking.start_outdoor_distance,
            end_outdoor_distance: state.booking.end_outdoor_distance,
            start_storage: state.booking.start_storage,
            end_storage: state.booking.end_storage,
            start_storage_m2: state.booking.start_storage_m2,
            end_storage_m2: state.booking.end_storage_m2,
            start_storage_floor: state.booking.start_storage_floor,
            end_storage_floor: state.booking.end_storage_floor,
            start_square_meters: state.booking.start_square_meters,
            end_square_meters: state.booking.end_square_meters,
        }

        const res = await createBooking(data);

        if (res) {
            setState({...state, loading: false});
            navigate('/month');
        }
    };

    const onSendOfferAndPaymentLink = async () => {

        setState({...state, hasError: false});

        if (
            !state.booking.price ||
            !state.booking.email
        ){
            setState({
                ...state,
                hasError: true
            })

            return;
        }

        if(!state.hasError){
            const data = {
                company_id: state.company.id,
                unit_id: state.booking.unit_id,
                product_id: state.booking.product_id,
                start_date: moment(state.booking.start_date).format('YYYY-MM-DD HH:mm:ss'),
                end_date: moment(state.booking.end_date).format('YYYY-MM-DD HH:mm:ss'),
                price: state.booking.price,
                first_name: state.booking.first_name,
                last_name: state.booking.last_name,
                email: state.booking.email,
                phone: state.booking.phone,
                start_address: start_address,
                end_address: end_address,
                start_door_number: state.booking.start_door_number,
                end_door_number: state.booking.end_door_number,
                start_door_code: state.booking.start_door_code,
                end_door_code: state.booking.end_door_code,
                start_comment: description,
                start_floor: state.booking.start_floor,
                end_floor: state.booking.end_floor,
                start_elevator: state.booking.start_elevator,
                end_elevator: state.booking.end_elevator,
                start_outdoor_distance: state.booking.start_outdoor_distance,
                end_outdoor_distance: state.booking.end_outdoor_distance,
                start_storage: state.booking.start_storage,
                end_storage: state.booking.end_storage,
                start_storage_m2: state.booking.start_storage_m2,
                end_storage_m2: state.booking.end_storage_m2,
                start_storage_floor: state.booking.start_storage_floor,
                end_storage_floor: state.booking.end_storage_floor,
                start_square_meters: state.booking.start_square_meters,
                end_square_meters: state.booking.end_square_meters,
            }

            const res = await createBookingSendPaymentLink(data);

            if (res) {
                setState({...state, loading: false});
                navigate('/month');
            }
        }
    };

    const renderUnits = () => {
        return (
            state.units.map((unit: any) => (
                <option value={unit.id} key={unit.id}>{unit.name}</option>
            ))
        );
    }

    const renderProducts = () => {
        return (
            state.products.map((product: any) => (
                <option value={product.id} key={product.id}>{product.name}</option>
            ))
        );
    }

    const onStartDateChange = async (val: any) => {
        const selectedDate = new Date(moment(val).format('yyyy-MM-DD HH:mm'));

        setState({
            ...state,
            booking: {
                ...state.booking,
                start_date: selectedDate,
            },
        });
    };

    const onEndDateChange = async (val: any) => {
        const selectedDate = new Date(moment(val).format('yyyy-MM-DD HH:mm'));

        setState({
            ...state,
            booking: {
                ...state.booking,
                end_date: selectedDate,
            },
        });
    };

    const handleChange = (value: string) => {
        setDescription(value)
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
                                    <h3 className="card-title text-uppercase">Send Offer</h3>
                                </div>

                                <div className="form-horizontal">
                                    <div className="card-body">

                                        <div className="form-group row">
                                            <label htmlFor="business_number" className="col-sm-3 col-form-label">Company Id</label>
                                            <div className="col-sm-9">
                                                <select className={`form-control`} name="company_id" id="company_id"
                                                        defaultValue={state.company.id}>
                                                    <option value={state.booking.company_id}>{state.company.name}</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="unit_id" className="col-sm-3 col-form-label">Unit Id</label>
                                            <div className="col-sm-9">
                                                <select className={`form-control`} name="unit_id" id="unit_id"
                                                        onChange={(val: any) => onInputChange('unit_id', val)} value={state.booking.unit_id}>
                                                    <option value={0}>-- Select Unit --</option>
                                                    {renderUnits()}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="product_id" className="col-sm-3 col-form-label">Product Id</label>
                                            <div className="col-sm-9">
                                                <select className={`form-control`} name="product_id" id="product_id"
                                                        onChange={(val: any) => onInputChange('product_id', val)} value={state.booking.product_id}>
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
                                                    selected={new Date(moment(state.booking.start_date).format('yyyy-MM-DD HH:mm'))}
                                                    placeholderText={'dd.mm.yyyy HH:mm'}
                                                    dateFormat={'dd.MM.yyyy HH:mm'}
                                                    minDate={new Date()}
                                                    timeFormat="HH:mm"
                                                    timeIntervals={30}
                                                    timeCaption="Time"
                                                    showTimeSelect
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="end_date" className="col-sm-3 col-form-label">End Date</label>
                                            <div className="col-sm-9">
                                                <DatePicker
                                                    className={'form-control'}
                                                    onChange={onEndDateChange}
                                                    selected={new Date(moment(state.booking.end_date).format('yyyy-MM-DD HH:mm'))}
                                                    placeholderText={'dd.mm.yyyy'}
                                                    dateFormat={'dd.MM.yyyy HH:mm'}
                                                    showTimeSelect
                                                    timeFormat="HH:mm"
                                                    timeIntervals={30}
                                                    timeCaption="Time"
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="price" className="col-sm-3 col-form-label">Price</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control ${state.hasError && !state.booking.price ? 'is-invalid' : ''}`} id="price"
                                                       placeholder="0.00" value={state.booking.price} onChange={(val: any) => onInputChange('price', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="first_name" className="col-sm-3 col-form-label">First Name</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="first_name"
                                                       placeholder="John" value={state.booking.first_name} onChange={(val: any) => onInputChange('first_name', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="last_name" className="col-sm-3 col-form-label">Last Name</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="last_name"
                                                       placeholder="Doe" value={state.booking.last_name} onChange={(val: any) => onInputChange('last_name', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control ${state.hasError && !state.booking.email ? 'is-invalid' : ''}`} id="email"
                                                       placeholder="john.doe@example.com" value={state.booking.email} onChange={(val: any) => onInputChange('email', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="phone" className="col-sm-3 col-form-label">Phone</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="phone"
                                                       placeholder="" value={state.booking.phone} onChange={(val: any) => onInputChange('phone', val)} />
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
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="start_door_number" className="col-sm-3 col-form-label">Start Door Number</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="start_door_number"
                                                       placeholder="0" value={state.booking.start_door_number} onChange={(val: any) => onInputChange('start_door_number', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="end_door_number" className="col-sm-3 col-form-label">End Door Number</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="end_door_number"
                                                       placeholder="0" value={state.booking.end_door_number} onChange={(val: any) => onInputChange('end_door_number', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="start_door_code" className="col-sm-3 col-form-label">Start Door Code</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="start_door_code"
                                                       placeholder="0" value={state.booking.start_door_code} onChange={(val: any) => onInputChange('start_door_code', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="end_door_code" className="col-sm-3 col-form-label">End Door Code</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="end_door_code"
                                                       placeholder="0" value={state.booking.end_door_code} onChange={(val: any) => onInputChange('end_door_code', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="description" className="col-sm-3 col-form-label">Description</label>
                                            <div className="col-sm-9">
                                                <ReactQuill value={description} onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="start_floor" className="col-sm-3 col-form-label">Start Floor</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="start_floor"
                                                       placeholder="0" value={state.booking.start_floor} onChange={(val: any) => onInputChange('start_floor', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="end_floor" className="col-sm-3 col-form-label">End Floor</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="end_floor"
                                                       placeholder="0" value={state.booking.end_floor} onChange={(val: any) => onInputChange('end_floor', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="start_elevator" className="col-sm-3 col-form-label">Start Elevator</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="start_elevator"
                                                       placeholder="0" value={state.booking.start_elevator} onChange={(val: any) => onInputChange('start_elevator', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="end_elevator" className="col-sm-3 col-form-label">End Elevator</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="end_elevator"
                                                       placeholder="0" value={state.booking.end_elevator} onChange={(val: any) => onInputChange('end_elevator', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="start_outdoor_distance" className="col-sm-3 col-form-label">Start Outdoor Distance</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="start_outdoor_distance"
                                                       placeholder="0" value={state.booking.start_outdoor_distance} onChange={(val: any) => onInputChange('start_outdoor_distance', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="end_outdoor_distance" className="col-sm-3 col-form-label">End Outdoor Distance</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="end_outdoor_distance"
                                                       placeholder="0" value={state.booking.end_outdoor_distance} onChange={(val: any) => onInputChange('end_outdoor_distance', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="start_storage" className="col-sm-3 col-form-label">Start Storage</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="start_storage"
                                                       placeholder="0" value={state.booking.start_storage} onChange={(val: any) => onInputChange('start_storage', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="end_storage" className="col-sm-3 col-form-label">End Storage</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="end_storage"
                                                       placeholder="0" value={state.booking.end_storage} onChange={(val: any) => onInputChange('end_storage', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="start_storage_m2" className="col-sm-3 col-form-label">Start Storage M2</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="start_storage_m2"
                                                       placeholder="0" value={state.booking.start_storage_m2} onChange={(val: any) => onInputChange('start_storage_m2', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="end_storage_m2" className="col-sm-3 col-form-label">End Storage M2</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="end_storage_m2"
                                                       placeholder="0" value={state.booking.end_storage_m2} onChange={(val: any) => onInputChange('end_storage_m2', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="start_storage_floor" className="col-sm-3 col-form-label">Start Storage Floor</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="start_storage_floor"
                                                       placeholder="0" value={state.booking.start_storage_floor} onChange={(val: any) => onInputChange('start_storage_floor', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="end_storage_floor" className="col-sm-3 col-form-label">End Storage Floor</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="end_storage_floor"
                                                       placeholder="0" value={state.booking.end_storage_floor} onChange={(val: any) => onInputChange('end_storage_floor', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="start_square_meters" className="col-sm-3 col-form-label">Start Square Meters</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="start_square_meters"
                                                       placeholder="0" value={state.booking.start_square_meters} onChange={(val: any) => onInputChange('start_square_meters', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="end_square_meters" className="col-sm-3 col-form-label">End Square Meters</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="end_square_meters"
                                                       placeholder="0" value={state.booking.end_square_meters} onChange={(val: any) => onInputChange('end_square_meters', val)} />
                                            </div>
                                        </div>

                                    </div>

                                    <div className="card-footer">
                                        <button type="submit" className="btn btn-info mr-2" onClick={onSendOfferAndPaymentLink}>
                                            Send the offer and payment link
                                        </button>
                                        <button type="submit" className="btn btn-info" onClick={onSendOfferPaymentLinkWillBeSentLater}>
                                            Send offer, payment link will be sent later
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

export default AddAJob;