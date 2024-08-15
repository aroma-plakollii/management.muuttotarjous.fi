import {Link} from "react-router-dom";
import moment from "moment";
import {useEffect, useState} from "react";
// import {changeStatus} from "../../services/BookingService";
import SendOfferConfirm from "../shared/SendOfferConfirm";
import {BookingRequest} from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/IBookingRequest";
import {Company} from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/ICompany"
import {createBookingRequestPrice, getBookingRequestsByMonth} from "../../../../services/movingServiceServices/companyServices/BookingRequest";
import {getBookingRequestPriceByCompany} from "../../../../services/movingServiceServices/companyServices/BookingRequest";
import {Loader} from "../../../../views/Loader";

interface IBookingRequestListProps {
    bookingRequests: BookingRequest,
    companyDetails : Company
    // updateStatus: () => void
}

const BookingRequestListItem = (props: IBookingRequestListProps) => {
    const [state, setState] = useState({
        bookingRequestPrice: {},
        loading: false,
        modalOpen: false,
        hasError: false,
    });

    useEffect(()=> {
        const __init = async () => {

            const data = {
                company_id: props.companyDetails.id,
                booking_request_id: props.bookingRequests.id
            }

            const bookingRequestPrice = await getBookingRequestPriceByCompany(data);

            setState({...state, bookingRequestPrice});
        }

        __init()
    },[]);

    const getStartAddress = () => {

        const startAddress = props.bookingRequests.start_address;
        const startAddressArray = startAddress.split(',');
        const startCity = startAddressArray[0].trim();
        const restOfStartAddress = startAddressArray.slice(1).join(',').trim();

        return <a  href={`https://www.google.com/maps/place/${startCity},+${props.bookingRequests.start_door_number},+${restOfStartAddress}`} target="_blank">{startCity}, {props.bookingRequests.start_door_number} {props.bookingRequests.start_floor} {props.bookingRequests.start_storage_floor}, {props.bookingRequests.start_elevator}, {restOfStartAddress} Ovikoodi:{props.bookingRequests.start_door_code}</a>

    }

    const getEndAdress = () => {

        const endAddress = props.bookingRequests.end_address;
        const endAddressArray = endAddress.split(',');
        const endCity = endAddressArray[0].trim();
        const restOfEndAddress = endAddressArray.slice(1).join(',').trim();

        return <a  href={`https://www.google.com/maps/place/${endCity},+${props.bookingRequests.end_door_number},+${restOfEndAddress}`} target="_blank">{endCity}, {props.bookingRequests.end_door_number} {props.bookingRequests.end_floor} {props.bookingRequests.end_storage_floor}, {props.bookingRequests.end_elevator}, {restOfEndAddress} Ovikoodi:{props.bookingRequests.end_door_number}</a>

    }

    const handleSelectedData = async (data: any) => {
        const res = await createBookingRequestPrice(data);

        if (res){
            setState({...state, modalOpen: false})
        }
    };

    const handleOpenSelectedDataConfirm = () => {
        setState({...state, modalOpen: true});
    };

    const handleCloseSelectedDataConfirm = (confirm: any) => {
        setState({...state, modalOpen: false});
    };

    const getDate = (date: any) => {
        return moment(date).format('DD.MM.YYYY')
    };

    // const getStartTime = (date: any) => {
    //     return moment(date).format('HH:mm')
    // };
    //
    // const getEndTime = (date: any) => {
    //     return moment(date).add(2, 'hours').format('HH:mm');
    // };

    // const onChangeStatus = (id: number, status: string) => {
    //     setAlertConfirm(true)
    //     setState({
    //         ...state, itemStatus: {
    //             ...state.itemStatus,
    //             id, status
    //         }
    //     })
    // }

    return (
        <>
            {props.bookingRequests.status === 1 && <div key={props.bookingRequests.id}
                  className={`card p-3 m-3 d-flex flex-row align-items-center ${(props.bookingRequests.start_address === null) ? 'callout callout-danger' : ''}`}>
                <div className={'container-fluid'}>
                    <div className={'row'}>
                        <div className={'col-md-2'}>
                            {getDate(props.bookingRequests.start_date)} <span style={{color: "gray"}}> </span>

                            <p className={'text-muted'}>{props.bookingRequests.booking_number}</p>
                        </div>
                        <div
                            className={'col-md-2'}>{props.bookingRequests.first_name} {props.bookingRequests.last_name}</div>
                        <div className={'col-md-5'}>
                            {props.bookingRequests.start_address && getStartAddress()}
                            <br/>
                            {props.bookingRequests.end_address && getEndAdress()}
                        </div>
                        <div className={'col-md-2'}>{props.bookingRequests.phone}</div>
                        <div className={'col-md-1'}>

                            <Link to={`/booking-request/${props.bookingRequests.id}`}
                                  className="fas fa-edit text-warning"></Link> <br/>
                            {state.bookingRequestPrice ? <i className="fas fa-check text-success"></i> :
                                <i className="fas fa-long-arrow-alt-right mt-2"
                                   style={{fontSize: "40px", cursor: "pointer"}}
                                   onClick={handleOpenSelectedDataConfirm}></i>}

                        </div>
                    </div>

                </div>
            </div>}

            {
                state.modalOpen &&
                <SendOfferConfirm
                    title={'You are sending an offer'}
                    bookingRequest_id={props.bookingRequests.id}
                    name={props.companyDetails.name}
                    company_id={props.companyDetails.id}
                    isOpen={state.modalOpen}
                    onSelectedData={handleSelectedData}
                    onClose={handleCloseSelectedDataConfirm}
                />
            }
        </>
    );
}

export default BookingRequestListItem