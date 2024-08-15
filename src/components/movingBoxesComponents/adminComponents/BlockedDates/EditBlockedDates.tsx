import {Link, useNavigate, useParams} from "react-router-dom";
import {getBlockedDatesDetails, saveBlockedDatesDetails} from "../../../../services/movingBoxesServices/adminServices/BlockedDatesService";
import {useEffect, useState} from "react";
import {Company} from "../../../../interfaces/movingBoxesInterfaces/adminInterfaces/ICompany";
import {getCompanies} from "../../../../services/movingBoxesServices/adminServices/CompaniesService";
import {Loader} from "../../../../views/Loader";

const EditBlockedDates = () => {
    const [state, setState] = useState({
        blockedDates: {
            company_id: '',
            date: '',
            status: '',
        },
        companies: [] as Company[],
        loading: true,
        hasError: false,
    });
    let { id } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        const __init = async () => {
            const blockedDates = await getBlockedDatesDetails(id);
            const companies = await getCompanies();

            setState({...state, blockedDates: blockedDates, companies, loading: false})
        }

        __init()
    }, []);

    const onInputChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state, blockedDates: {
                ...state.blockedDates, [key]: value
            }
        });
    }

    const onSelectChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state, blockedDates: {
                ...state.blockedDates, [key]: value
            }
        });
    }

    const onSave = async (id: any) => {
        setState({...state, hasError: false, loading: true});

        if (
            !state.blockedDates.date ||
            !state.blockedDates.status
        ){
            setState({
                ...state,
                hasError: true
            })

            return;
        }

        if (!state.hasError){
            const res = await saveBlockedDatesDetails(id, state.blockedDates);

            if (res) {
                setState({...state, loading: false})
                navigate('/blocked-dates')
            }
        }
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
        <div className="content-header">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title text-uppercase">Blocked Date Details</h3>
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
                                                defaultValue={state.blockedDates.company_id}
                                            >
                                                <option value={''}>-- Choose company --</option>
                                                {renderCompanies()}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="first_name" className="col-sm-3 col-form-label">Date</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.blockedDates.date ? 'is-invalid' : ''}`} id="date"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('date', val)} defaultValue={state.blockedDates.date}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="last_name" className="col-sm-3 col-form-label">Status</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.blockedDates.status ? 'is-invalid' : ''}`} id="status"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('status', val)} defaultValue={state.blockedDates.status}/>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-footer">
                                    <button type="submit" className="btn btn-info" onClick={() => onSave(id)}>
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

export default EditBlockedDates;