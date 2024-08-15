import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {addBlockedDates} from "../../../../services/movingBoxesServices/adminServices/BlockedDatesService";
import moment from "moment";
import DatePicker from "react-datepicker";
import {Company} from "../../../../interfaces/movingBoxesInterfaces/adminInterfaces/ICompany";
import {getCompanies} from "../../../../services/movingBoxesServices/adminServices/CompaniesService";
import {Loader} from "../../../../views/Loader";

const CreateBlockedDates = () => {
    const [state, setState] = useState({
        companies: [] as Company[],
        company_id: '',
        date: null,
        status: true,
        loading: true,
        hasError: false,
    });

    let navigate = useNavigate();

    useEffect(() => {
        const __init = async () => {
            const companies = await getCompanies();
            setState({...state, companies, loading: false})
        }

        __init();

    }, []);

    const onInputChange = (key: string, val: any) => {

        const value = val.target ? val.target.value : '';

        setState({
            ...state, ...state,
            [key]: value
        })
    }

    const onSelectChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state, ...state,
            [key]: value
        })
    }

    const onStatusChange = () => {
        setState({...state, status: !state.status})
    };

    const onCreate = async () => {
        const date = moment(state.date);

        let data = {
            company_id: state.company_id,
            date: date.format('YYYY-MM-DD'),
            status: state.status ? 1 : 0,
        }

        setState({...state, hasError: false});

        if (
            !state.date ||
            !state.status
        ){
            setState({
                ...state,
                hasError: true
            })

            return;
        }

        if (!state.hasError){
            const res = await addBlockedDates(data);

            if (res) {
                navigate('/blocked-dates');
            }
        }
    };

    const onDateChange = (val: any) => setState({...state, date: val});

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
        <div className="content-header">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title text-uppercase">Blocked Dates Details</h3>
                            </div>

                            <div className="form-horizontal">
                                <div className="card-body">

                                    <div className="form-group row">
                                        <label htmlFor="type" className="col-sm-3 col-form-label">Company</label>
                                        <div className="col-sm-9">
                                            <select
                                                name="type"
                                                id="type"
                                                className={`form-control`}
                                                onChange={(val: any) => onSelectChange('company_id', val)}
                                                value={state.company_id}
                                            >
                                                <option value={''}>-- Choose company --</option>
                                                {renderCompanies()}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="first_name" className="col-sm-3 col-form-label">Date</label>
                                        <div className="col-sm-9">
                                            <DatePicker
                                                onSelect={(date) => onDateChange(date)}
                                                onChange={(date) => onDateChange(date)}
                                                selected={state.date}
                                                minDate={new Date()}
                                                dateFormat="dd.MM.yyyy"
                                                // filterDate={isWeekDay}
                                                // excludeDates={getDisabledDates()}
                                                className={`form-control ${state.hasError && !state.date ? 'is-invalid' : ''}`}
                                                placeholderText={'dd.mm.yyyy'}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="last_name" className="col-sm-3 col-form-label">Status</label>
                                        <div className="custom-control custom-switch custom-switch-off-danger custom-switch-on-success" style={{zIndex: 0}}>
                                            <input type="checkbox" className="custom-control-input" id="status" checked={state.status ? true : false}/>
                                            <label className="custom-control-label" htmlFor="status" onClick={onStatusChange}>{ state.status ? 'unblock' : 'block' }</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-footer">
                                    <button type="submit" className="btn btn-info" onClick={onCreate}>
                                        {state.loading ? 'Saving...' : 'Save changes'}
                                    </button>
                                    <Link to={'/blocked-dates'} className="btn btn-default float-right">Cancel</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateBlockedDates