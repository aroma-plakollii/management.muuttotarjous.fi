import {useEffect, useState} from "react";
import {getMbCompanyId} from "../../../../config";
import moment from "moment";
import {getBookingsByDate} from "../../../../services/movingBoxesServices/companyServices/BookingService";
import BookingList from "../shared/BookingList";
import DatePicker from "react-datepicker";
import {Link} from "react-router-dom";
import {Loader} from "../../../../views/Loader";

const DayList = () => {
    const [state, setState] = useState({
        date: moment().format('yyyy-MM-DD'),
        bookings: [],
        loading: true,
    });

    useEffect(()=> {
        const __init = async () => {
            const companyId = await getMbCompanyId();
            const data = {
                company_id: companyId,
                date: state.date
            }
            const bookings = await getBookingsByDate(data);

            setState({...state, bookings, loading: false})
    }
        __init()
    },[state.date]);

    const onDateChange = async (val: any) => {
        setState({
            ...state,
            date: moment(val).format('yyyy-MM-DD')
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
            <div className={'container-fluid'}>
                <div className={'row'}>
                    <div className={'col-md-12'}>
                        <div className={'d-flex align-items-center p-2'}>
                            <span className="card-title m-3">Day List</span>

                            <span>
                                <DatePicker
                                    className={'form-control'}
                                    onChange={onDateChange}
                                    onSelect={onDateChange}
                                    selected={new Date(state.date)}
                                    dateFormat={'dd.MM.yyyy'}
                                />
                            </span>

                            <Link to={'/bookings/create'} className="btn btn-info float-right ml-3">Create Booking</Link>
                        </div>
                    </div>
                </div>
            </div>
            <BookingList bookings={state.bookings} />
        </>
    );
}

export default DayList;