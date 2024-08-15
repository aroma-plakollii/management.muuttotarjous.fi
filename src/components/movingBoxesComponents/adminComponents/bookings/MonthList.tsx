import {useEffect, useState} from "react";
import {getMbCompanyId} from "../../../../config";
import moment from "moment";
import {getBookingsByMonth} from "../../../../services/movingBoxesServices/adminServices/BookingService";
import BookingList from "../shared/BookingList";
import DatePicker from "react-datepicker";
import {getCompanies} from "../../../../services/movingBoxesServices/adminServices/CompaniesService";
import {Company} from "../../../../interfaces/movingBoxesInterfaces/adminInterfaces/ICompany";
import {Loader} from "../../../../views/Loader";

const MonthList = () => {

    const id = getMbCompanyId();

    const [state, setState] = useState({
        date: moment().format('yyyy-MM-DD'),
        company_id: id,
        bookings: [],
        companies: [] as Company[],
        loading: true,
        statusUpdated: false
    });

    useEffect(()=> {
        const __init = async () => {
            const data = {
                company_id: state.company_id,
                date: state.date
            }

            console.log(data);
            const bookings = await getBookingsByMonth(data);
            const companies = await getCompanies();

            setState({...state, bookings, companies: companies, loading: false})
        }

        __init()
    },[state.date, state.statusUpdated, state.company_id]);

    const onDateChange = async (val: any) => {
        setState({
            ...state,
            date: moment(val).format('yyyy-MM-DD')
        });
    };

    const updateStatus = () => {
        setState({...state, statusUpdated: true })
    }

    const onSelectChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        console.log(value)

        setState({
            ...state,
                [key]: value
            }
        );
    };

    const renderCompanies = () => {
        return(
            state.companies.map(company => (
                <option value={company.id} key={company.id}>{company.name}</option>
            ))
        )
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

                            <span className={'d-flex align-items-center'}>
                                <span className={'mx-3 card-title'}>Company</span>
                                <select
                                    name="type"
                                    id="type"
                                    className={`form-control`}
                                    onChange={(val: any) => onSelectChange('company_id', val)}
                                    value={state.company_id}
                                >
                                    {renderCompanies()}
                                </select>
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