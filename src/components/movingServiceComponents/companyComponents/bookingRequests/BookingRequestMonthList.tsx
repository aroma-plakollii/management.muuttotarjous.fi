import {useEffect, useState} from "react";
import {getMsCompanyId} from "../../../../config";
import {getCompanyByUser2, getCompanyDetails} from "../../../../services/movingServiceServices/companyServices/CompaniesService";
import moment from "moment";
import {getBookingRequestsByMonth} from "../../../../services/movingServiceServices/companyServices/BookingRequest";
import bookingRequestList from "./BookingRequestList";
import DatePicker from "react-datepicker";
import {Link} from "react-router-dom";
import BookingRequestList from "./BookingRequestList";
import {Company} from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/ICompany"
import {Loader} from "../../../../views/Loader";


const BookingRequestMonthList = () => {
    const [state, setState] = useState({
        date: moment().format('yyyy-MM-DD'),
        bookingRequests: [],
        companyDetails: {} as Company,
        loading: true
        // statusUpdated: false
    });

    useEffect(()=> {
        const __init = async () => {
            const data = {
                date: state.date
            }
            const companyId = await getMsCompanyId();
            const bookingRequests = await getBookingRequestsByMonth(data);
            const companyDetails = await getCompanyDetails(companyId);
            console.log(companyDetails);

            setState({...state, bookingRequests, companyDetails, loading: false});
        }

        __init()
    },[state.date]);

    const onDateChange = async (val: any) => {
        setState({
            ...state,
            date: moment(val).format('yyyy-MM-DD')
        });
    };

    // const updateStatus = () => {
    //     setState({...state, statusUpdated: true })
    // }

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
                            <span className="card-title m-3">Booking Request Month List</span>

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
            <BookingRequestList bookingRequests={state.bookingRequests} companyDetails={state.companyDetails}/>
        </>
    );
}

export default BookingRequestMonthList;