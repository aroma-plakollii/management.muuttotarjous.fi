import {useEffect, useState} from "react";
import {getMsCompanyId} from "../../../../config";
import moment from "moment";
import {getBookingsByMonth} from "../../../../services/movingServiceServices/unitServices/BookingService";
import BookingList from "./BookingList";
import DatePicker from "react-datepicker";
import {Loader} from "../../../../views/Loader";

const MonthList = () => {
    const [state, setState] = useState({
        date: moment().format('yyyy-MM-DD'),
        bookings: [],
        statusUpdated: false,
        loading: true
    });

    useEffect(()=> {
        const __init = async () => {
            const companyId = await getMsCompanyId();
            const data = {
                company_id: companyId,
                date: state.date
            }
            const bookings = await getBookingsByMonth(data);

            setState({...state, bookings, loading: false});
        }

        __init()
    },[state.date, state.statusUpdated]);

    const onDateChange = async (val: any) => {
        setState({
            ...state,
            date: moment(val).format('yyyy-MM-DD')
        });
    };

    const updateStatus = () => {
        setState({...state, statusUpdated: true })
    }

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
                            <span className="card-title m-3">Month List</span>

                            <span>
                                <DatePicker
                                    className={'form-control'}
                                    onChange={onDateChange}
                                    onSelect={onDateChange}
                                    selected={new Date(state.date)}
                                    dateFormat={'MM.yyyy'}
                                    showMonthYearPicker
                                />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <BookingList updateStatus={updateStatus} bookings={state.bookings} />
            {/*<BookingList  bookings={state.bookings} />*/}
        </>
    );
}

export default MonthList;