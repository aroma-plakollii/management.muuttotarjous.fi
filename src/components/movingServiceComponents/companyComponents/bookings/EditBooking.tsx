import {Link, useParams, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import {getMsCompanyId, GMAPKEY} from "../../../../config";
import { usePlacesWidget } from "react-google-autocomplete";
import { getBookingDetails} from "../../../../services/movingServiceServices/companyServices/BookingService";
import { getCompanyDetails } from "../../../../services/movingServiceServices/companyServices/CompaniesService";
import { getUnitsByCompany } from "../../../../services/movingServiceServices/companyServices/UnitService";
import { getProducts } from "../../../../services/movingServiceServices/companyServices/ProductsService";
import { saveBookingDetails, sendPaymentEmail, getExtraServices } from "../../../../services/movingServiceServices/companyServices/BookingService";
import AlertConfirm from "../shared/AlertConfirm";
import { Booking } from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/IBooking";
import {Company} from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/ICompany";
import {Unit} from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/IUnit";
import {Product} from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/IProduct";
import {IExtraService} from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/IExtraService";
import {Loader} from "../../../../views/Loader";


const EditBooking = () => {
    const [state, setState] = useState({
        booking: {} as Booking,
        company: {} as Company,
        units: [] as Unit[],
        products: [] as Product[],
        extraServices: [] as IExtraService[],
        id: 0,
        hasError: false,
        loading: true,
    });

    const [start_address, setStart_address] = useState<string>('')
    const [end_address, setEnd_address] = useState<string>('')
    const [alertConfirm, setAlertConfirm] = useState<boolean>(false);
    const [onSendCalled, setOnSendCalled] = useState<boolean>(false);

    let { id } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        const __init = async () => {
            const booking = await getBookingDetails(id);
            const extraServices = await getExtraServices(id)
            const companyId = await getMsCompanyId();
            const company = await getCompanyDetails(companyId);
            const units = await getUnitsByCompany(companyId);
            const products = await getProducts();
            setState({...state, booking, company, units, products, extraServices, loading: false})
            setStart_address(booking.start_address)
            setEnd_address(booking.end_address)
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

    const onSave = async (id: any) => {

        const data = {
            company_id: state.company.id,
            unit_id: state.booking.unit_id,
            product_id: state.booking.product_id,
            booking_number: state.booking.booking_number,
            start_date: moment(state.booking.start_date).format('YYYY-MM-DD'),
            end_date: moment(state.booking.end_date).format('YYYY-MM-DD'),
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
            start_comment: state.booking.start_comment,
            end_comment: state.booking.end_comment,
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
            payment_status: state.booking.payment_status,
            progress_status: state.booking.progress_status,
            start_time: moment(state.booking.start_date).format('HH:mm'),
            end_time: moment(state.booking.end_date).format('HH:mm')
        }

        const res = await saveBookingDetails(id, data);

        if (res) {
            setState({...state, loading: false});
            navigate('/month');
        }
    };

    // const onSend = async (confirm: any) => {
    //     setState({...state, hasError: false});
    //
    //     if (confirm === 'confirm'){
    //         const res = await sendPaymentEmail(state.id);
    //
    //         if (res) {
    //             setAlertConfirm(false)
    //             navigate('/month');
    //         }
    //     }
    //     else {
    //         setAlertConfirm(false)
    //     }
    // };

    const onSend = async (confirm: any) => {
        if (onSendCalled) {
            return; // Exit early if onSend has already been called
        }

        setOnSendCalled(true);
        setState({ ...state, hasError: false });

        if (confirm === 'confirm') {
            const res = await sendPaymentEmail(state.id);

            if (res) {
                setAlertConfirm(false);
                // navigate('/month');
            }
        } else {
            setAlertConfirm(false);
        }
    };

    const onSendEmail = (id: number) => {
        setAlertConfirm(true)
        setState({
            ...state,
                id
        })
    }

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

    const onEndTimeChange = (val: any) => {
        const selectedDate = new Date(moment(val).format('yyyy-MM-DD HH:mm'));

        setState({
            ...state,
            booking: {
                ...state.booking,
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
                        <div className={`${state.extraServices.length === 0 ? 'col-md-12' : 'col-md-7'}`}>
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title text-uppercase">Booking Details</h3>
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
                                                <select disabled className={`form-control`} name="product_id" id="product_id"
                                                        onChange={(val: any) => onInputChange('product_id', val)} value={state.booking.product_id}>
                                                    <option value={0}>-- Select Product --</option>
                                                    {renderProducts()}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="booking_number" className="col-sm-3 col-form-label">Booking Number</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="booking_number"
                                                        placeholder="0" defaultValue={state.booking.booking_number} onChange={(val: any) => onInputChange('booking_number', val)} />
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
                                                    timeFormat="HH:mm"
                                                    timeIntervals={30}
                                                    timeCaption="Time"
                                                    showTimeSelect
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="end_date" className="col-sm-3 col-form-label">End Time</label>
                                            <div className="col-sm-9">
                                                <DatePicker
                                                    className={'form-control'}
                                                    onChange={onEndTimeChange}
                                                    selected={new Date(moment(state.booking.end_date).format('yyyy-MM-DD HH:mm'))}
                                                    placeholderText={'Select Time'}
                                                    dateFormat={'HH:mm'}
                                                    showTimeSelect
                                                    showTimeSelectOnly
                                                    timeFormat="HH:mm"
                                                    timeIntervals={30}
                                                    timeCaption="Time"
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="price" className="col-sm-3 col-form-label">Price</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="price"
                                                        placeholder="0.00" defaultValue={state.booking.price} onChange={(val: any) => onInputChange('price', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="first_name" className="col-sm-3 col-form-label">First Name</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="first_name"
                                                        placeholder="John" defaultValue={state.booking.first_name} onChange={(val: any) => onInputChange('first_name', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="last_name" className="col-sm-3 col-form-label">Last Name</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="last_name"
                                                        placeholder="Doe" defaultValue={state.booking.last_name} onChange={(val: any) => onInputChange('last_name', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="email"
                                                        placeholder="john.doe@example.com" defaultValue={state.booking.email} onChange={(val: any) => onInputChange('email', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="phone" className="col-sm-3 col-form-label">Phone</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control ${state.hasError && !state.booking.phone ? 'is-invalid' : ''}`} id="phone"
                                                        placeholder="" defaultValue={state.booking.phone} onChange={(val: any) => onInputChange('phone', val)} />
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
                                                        placeholder="0" defaultValue={state.booking.start_door_number} onChange={(val: any) => onInputChange('start_door_number', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="end_door_number" className="col-sm-3 col-form-label">End Door Number</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="end_door_number"
                                                        placeholder="0" defaultValue={state.booking.end_door_number} onChange={(val: any) => onInputChange('end_door_number', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="start_door_code" className="col-sm-3 col-form-label">Start Door Code</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="start_door_code"
                                                        placeholder="0" defaultValue={state.booking.start_door_code} onChange={(val: any) => onInputChange('start_door_code', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="end_door_code" className="col-sm-3 col-form-label">End Door Code</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="end_door_code"
                                                        placeholder="0" defaultValue={state.booking.end_door_code} onChange={(val: any) => onInputChange('end_door_code', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="start_comment" className="col-sm-3 col-form-label">Start Comment</label>
                                            <div className="col-sm-9">
                                                <textarea className={`form-control`} id="start_comment"
                                                        placeholder="..." defaultValue={state.booking.start_comment} onChange={(val: any) => onInputChange('start_comment', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="end_comment" className="col-sm-3 col-form-label">End Comment</label>
                                            <div className="col-sm-9">
                                                <textarea className={`form-control`} id="end_comment"
                                                        placeholder="..." defaultValue={state.booking.end_comment} onChange={(val: any) => onInputChange('end_comment', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="start_floor" className="col-sm-3 col-form-label">Start Floor</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="start_floor"
                                                        placeholder="0" defaultValue={state.booking.start_floor} onChange={(val: any) => onInputChange('start_floor', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="end_floor" className="col-sm-3 col-form-label">End Floor</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="end_floor"
                                                        placeholder="0" defaultValue={state.booking.end_floor} onChange={(val: any) => onInputChange('end_floor', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="start_elevator" className="col-sm-3 col-form-label">Start Elevator</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="start_elevator"
                                                        placeholder="0" defaultValue={state.booking.start_elevator} onChange={(val: any) => onInputChange('start_elevator', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="end_elevator" className="col-sm-3 col-form-label">End Elevator</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="end_elevator"
                                                        placeholder="0" defaultValue={state.booking.end_elevator} onChange={(val: any) => onInputChange('end_elevator', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="start_outdoor_distance" className="col-sm-3 col-form-label">Start Outdoor Distance</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="start_outdoor_distance"
                                                        placeholder="0" defaultValue={state.booking.start_outdoor_distance} onChange={(val: any) => onInputChange('start_outdoor_distance', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="end_outdoor_distance" className="col-sm-3 col-form-label">End Outdoor Distance</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="end_outdoor_distance"
                                                        placeholder="0" defaultValue={state.booking.end_outdoor_distance} onChange={(val: any) => onInputChange('end_outdoor_distance', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="start_storage" className="col-sm-3 col-form-label">Start Storage</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="start_storage"
                                                        placeholder="0" defaultValue={state.booking.start_storage} onChange={(val: any) => onInputChange('start_storage', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="end_storage" className="col-sm-3 col-form-label">End Storage</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="end_storage"
                                                        placeholder="0" defaultValue={state.booking.end_storage} onChange={(val: any) => onInputChange('end_storage', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="start_storage_m2" className="col-sm-3 col-form-label">Start Storage M2</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="start_storage_m2"
                                                        placeholder="0" defaultValue={state.booking.start_storage_m2} onChange={(val: any) => onInputChange('start_storage_m2', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="end_storage_m2" className="col-sm-3 col-form-label">End Storage M2</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="end_storage_m2"
                                                        placeholder="0" defaultValue={state.booking.end_storage_m2} onChange={(val: any) => onInputChange('end_storage_m2', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="start_storage_floor" className="col-sm-3 col-form-label">Start Storage Floor</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="start_storage_floor"
                                                        placeholder="0" defaultValue={state.booking.start_storage_floor} onChange={(val: any) => onInputChange('start_storage_floor', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="end_storage_floor" className="col-sm-3 col-form-label">End Storage Floor</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="end_storage_floor"
                                                        placeholder="0" defaultValue={state.booking.end_storage_floor} onChange={(val: any) => onInputChange('end_storage_floor', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="start_square_meters" className="col-sm-3 col-form-label">Start Square Meters</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="start_square_meters"
                                                        placeholder="0" defaultValue={state.booking.start_square_meters} onChange={(val: any) => onInputChange('start_square_meters', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="end_square_meters" className="col-sm-3 col-form-label">End Square Meters</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="end_square_meters"
                                                        placeholder="0" defaultValue={state.booking.end_square_meters} onChange={(val: any) => onInputChange('end_square_meters', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="payment_status" className="col-sm-3 col-form-label">Payment Status</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="payment_status"
                                                        placeholder="..." defaultValue={state.booking.payment_status} onChange={(val: any) => onInputChange('payment_status', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="progress_status" className="col-sm-3 col-form-label">Progress Status</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="progress_status"
                                                        placeholder="..." defaultValue={state.booking.progress_status} onChange={(val: any) => onInputChange('progress_status', val)} />
                                            </div>
                                        </div>

                                    </div>

                                    <div className="card-footer">
                                        <button type="submit" className="btn btn-info" onClick={() => onSave(id)}>
                                            {state.loading ? 'Saving...' : 'Save changes'}
                                        </button>

                                        {state.booking.payment_status === 'unpaid' && <button type="submit" className="btn btn-info mx-3" onClick={() => onSendEmail(state.booking.id)}>
                                            Send Payment Email
                                        </button>}

                                        <Link to={'/month'} className="btn btn-default float-right">Cancel</Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {state.extraServices.length === 0 ? "" : (
                            <div className={`col-md-5`}>
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title text-uppercase">Extra Services</h3>
                                    </div>

                                    <div className="card-body table-responsive p-0">
                                        <table className="table table-hover text-nowrap">
                                            <thead>
                                            <tr>
                                                <th>Price</th>
                                                <th>Description</th>
                                                <th>Payment Status</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {state.extraServices.map((service: any) => {
                                                return <tr>
                                                    <td>{service.price}</td>
                                                    <td>{service.description}</td>
                                                    <td>{service.payment_status}</td>
                                                </tr>
                                            })}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {
                alertConfirm &&
                <AlertConfirm
                    title={'You are sending the payment email'}
                    message={'Are you sure you want to send the payment email?'}
                    id={state.booking.id}
                    type={""}
                    isOpen={alertConfirm}
                    onClose={onSend}
                />
            }
        </>
    );
}

export default EditBooking