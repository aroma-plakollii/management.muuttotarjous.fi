import {Link} from "react-router-dom";
import moment from "moment";
import {useState} from "react";
import {changeStatus} from "../../../../services/movingServiceServices/unitServices/BookingService";
import AlertConfirm from "../shared/AlertConfirm";
import {Booking} from "../../../../interfaces/movingServiceInterfaces/unitInterfaces/IBooking";

interface IBookingListItemProps {
    booking: Booking,
    updateStatus: () => void
}

const BookingListItem = (props: IBookingListItemProps) => {
    const [state, setState] = useState({
        statusUpdated: false,
        itemStatus: {
            id: 0,
            status: ''
        }
    });

    const [alertConfirm, setAlertConfirm] = useState<boolean>(false);

    const getStartAddress = () => {

        const startAddress = props.booking.start_address;
        const startAddressArray = startAddress.split(',');
        const startCity = startAddressArray[0].trim();
        const restOfStartAddress = startAddressArray.slice(1).join(',').trim();

        return <a  href={`https://www.google.com/maps/place/${startCity},+${props.booking.start_door_number},+${restOfStartAddress}`} target="_blank">{startCity}, {props.booking.start_door_number} {props.booking.start_floor} {props.booking.start_storage_floor}, {props.booking.start_elevator}, {restOfStartAddress} Ovikoodi:{props.booking.start_door_code}</a>

    }

    const getEndAdress = () => {

        const endAddress = props.booking.end_address;
        const endAddressArray = endAddress.split(',');
        const endCity = endAddressArray[0].trim();
        const restOfEndAddress = endAddressArray.slice(1).join(',').trim();

        return <a  href={`https://www.google.com/maps/place/${endCity},+${props.booking.end_door_number},+${restOfEndAddress}`} target="_blank">{endCity}, {props.booking.end_door_number} {props.booking.end_floor} {props.booking.end_storage_floor}, {props.booking.end_elevator}, {restOfEndAddress} Ovikoodi:{props.booking.end_door_number}</a>

    }

    const updateStatus = async (confirm: any) => {
        if (confirm === 'confirm'){
            const res = await changeStatus({id: state.itemStatus.id, progress_status: state.itemStatus.status});

            if (res){
                setAlertConfirm(false)
                setState({...state, statusUpdated: true})
            }
        }
        else {
            setAlertConfirm(false)
        }
        props.updateStatus();
    }

    const getDate = (date: any) => {
        return moment(date).format('DD.MM.YYYY')
    };

    const onChangeStatus = (id: number, status: string) => {
        setAlertConfirm(true)
        setState({
            ...state, itemStatus: {
                ...state.itemStatus,
                id, status
            }
        })
    }

    return (
        <>
            <div key={props.booking.id} className={`card p-3 m-3 d-flex flex-row align-items-center ${(props.booking.start_address === null && props.booking.progress_status === 'to-start') ? 'callout callout-danger' : ''}`}>
                <div className={'container-fluid'}>
                    <div className={'row'}>
                        <div className={'col-md-1'}>
                            {
                                props.booking.progress_status === 'to-start' &&
                                <i style={{cursor: 'pointer'}}
                                   className="fas fa-arrow-up text-info"
                                   onClick={() => onChangeStatus(props.booking.id, props.booking.progress_status)}></i>
                            }
                            {
                                props.booking.progress_status === 'done' &&
                                <i style={{cursor: 'pointer'}}
                                   className="fas fa-check-circle text-success"></i>
                            }
                        </div>
                        <div className={'col-md-2'}>
                            {getDate(props.booking.start_date)}

                            <p className={'text-muted'}>{props.booking.booking_number}</p>
                        </div>
                        <div className={'col-md-1'}>{props.booking.first_name} {props.booking.last_name}</div>
                        {/*<div className={'col-md-4'}>{props.booking.progress_status === 'to-start' ? props.booking.start_address : props.booking.end_address} &nbsp;</div>*/}
                        <div className={'col-md-5'}>
                            {props.booking.start_address && getStartAddress()}
                            <br/>
                            {props.booking.end_address && getEndAdress()}
                        </div>
                        <div className={'col-md-1'}>{props.booking.phone}</div>
                        <div className={'col-md-1'}>{props.booking.payment_status}</div>
                        <div className={'col-md-1 text-end'}>
                            {/*<a className="fas fa-edit text-warning" style={{cursor: 'pointer'}}></a>*/}
                            <Link to={`/booking/${props.booking.id}`} className="fas fa-edit text-warning"></Link> <br/>
                        </div>
                    </div>

                </div>
            </div>

            {
                alertConfirm &&
                <AlertConfirm
                    title={'You are updating the status'}
                    message={'Are you sure you want to update the status?'}
                    id={state.itemStatus.id}
                    type={state.itemStatus.status}
                    isOpen={alertConfirm}
                    onClose={updateStatus}
                />
            }
        </>
    );
}

export default BookingListItem