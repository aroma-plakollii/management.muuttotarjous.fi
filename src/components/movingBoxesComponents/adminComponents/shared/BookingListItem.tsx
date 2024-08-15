import {Link} from "react-router-dom";
import moment from "moment";
import {useState} from "react";
import {changeStatus} from "../../../../services/movingBoxesServices/adminServices/BookingService";
import AlertConfirm from "./AlertConfirm";
import {Booking} from "../../../../interfaces/movingBoxesInterfaces/adminInterfaces/IBooking";

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
            <div key={props.booking.id} className={`card p-3 m-3 d-flex flex-row align-items-center ${(props.booking.start_address === null && props.booking.progress_status === 'to-deliver') || (props.booking.end_address === null && props.booking.progress_status === 'to-collect') ? 'callout callout-danger' : ''}`}>
                <div className={'container-fluid'}>
                    <div className={'row'}>
                        <div className={'col-md-1'}>
                            {
                                props.booking.progress_status === 'to-deliver' &&
                                <i style={{cursor: 'pointer'}}
                                   className="fas fa-arrow-up text-info"
                                   onClick={() => onChangeStatus(props.booking.id, props.booking.progress_status)}></i>
                            }
                            {
                                props.booking.progress_status === 'to-collect' &&
                                <i style={{cursor: 'pointer'}}
                                   className="fas fa-arrow-down text-warning"
                                   onClick={() => onChangeStatus(props.booking.id, props.booking.progress_status)}></i>
                            }
                            {
                                props.booking.progress_status === 'done' &&
                                <i style={{cursor: 'pointer'}}
                                   className="fas fa-check-circle text-success"></i>
                            }
                        </div>
                        <div className={'col-md-2'}>
                            {props.booking.progress_status === 'to-deliver' && getDate(props.booking.start_date)}
                            {props.booking.progress_status === 'to-collect' && getDate(props.booking.end_date)}

                            <p className={'text-muted'}>{props.booking.booking_number}</p>
                        </div>
                        <div className={'col-md-2'}>{props.booking.first_name} {props.booking.last_name}</div>
                        <div className={'col-md-4'}>{props.booking.progress_status === 'to-deliver' ? props.booking.start_address : props.booking.end_address} &nbsp;</div>
                        <div className={'col-md-1'}>{props.booking.phone}</div>
                        <div className={'col-md-1'}>{props.booking.quantity}</div>
                        <div className={'col-md-1 text-end'}>
                            {/*<a className="fas fa-edit text-warning" style={{cursor: 'pointer'}}></a>*/}
                            <Link to={`/bookings/${props.booking.id}`} className="fas fa-eye text-warning"></Link>
                        </div>
                    </div>
                </div>
            </div>

            {
                alertConfirm &&
                <AlertConfirm
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
