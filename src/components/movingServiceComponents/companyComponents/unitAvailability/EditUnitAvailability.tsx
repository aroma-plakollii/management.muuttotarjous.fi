import {Link, useParams, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import { getUnitAvailabilityDetails } from "../../../../services/movingServiceServices/companyServices/UnitAvailabilityService";
import { getCompanyDetails } from "../../../../services/movingServiceServices/companyServices/CompaniesService";
import {getMsCompanyId} from "../../../../config";
import { getUnitsByCompany } from "../../../../services/movingServiceServices/companyServices/UnitService";
import { saveUnitAvailabilityDetails } from "../../../../services/movingServiceServices/companyServices/UnitAvailabilityService";
import { UnitAvailability } from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/IUnitAvailability";
import {Company} from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/ICompany";
import {Unit} from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/IUnit";
import {Loader} from "../../../../views/Loader";


const EditUnitAvailability = () => {
    const [state, setState] = useState({
        unitAvailability: {} as UnitAvailability,
        company: {} as Company,
        units: [] as Unit[],
        hasError: false,
        loading: true,
    });

    let { id } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        const __init = async () => {
            const unitAvailability = await getUnitAvailabilityDetails(id);
            const companyId = await getMsCompanyId()
            const company = await getCompanyDetails(companyId);
            const units = await getUnitsByCompany(companyId);
           setState({...state, unitAvailability, company, units, loading: false});
        }

        __init();

    }, []);

    const onInputChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state, unitAvailability: {
                ...state.unitAvailability,
                [key]: value
            }
        })
    }

    const onSave = async (id: any) => {

        const data = {
            company_id: state.company.id,
            unit_id: state.unitAvailability.unit_id,
            date: moment(state.unitAvailability.date).format('YYYY-MM-DD'),
        }

        const res = await saveUnitAvailabilityDetails(id, data);

        if (res) {
            setState({...state, loading: false});
            navigate('/units-availability');
        }
    };

    const renderUnits = () => {
        return (
            state.units.map((unit: any) => (
                <option value={unit.id} key={unit.id}>{unit.name}</option>
            ))
        );
    }

    const onDateChange = async (key: string,val: any) => {
        setState({
            ...state, unitAvailability: {
                ...state.unitAvailability,
                [key]: new Date(moment(val).format('yyyy-MM-DD'))
            }
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
        <div className="content-header">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title text-uppercase">Blocked Units By Date Details</h3>
                            </div>

                            <div className="form-horizontal">
                                <div className="card-body">

                                    <div className="form-group row">
                                        <label htmlFor="business_number" className="col-sm-3 col-form-label">Company Id</label>
                                        <div className="col-sm-9">
                                            <select className={`form-control`} name="company_id" id="company_id"
                                                    defaultValue={state.company.id}>
                                                <option value={state.unitAvailability.company_id}>{state.company.name}</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="unit_id" className="col-sm-3 col-form-label">Unit Id</label>
                                        <div className="col-sm-9">
                                            <select className={`form-control`} name="unit_id" id="unit_id"
                                                    onChange={(val: any) => onInputChange('unit_id', val)} value={state.unitAvailability.unit_id}>
                                                <option value={0}>-- Select Unit --</option>
                                                {renderUnits()}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="date" className="col-sm-3 col-form-label">Date</label>
                                        <div className="col-sm-9">
                                            <DatePicker
                                                className={'form-control'}
                                                onChange={(val: any) => onDateChange('date', val)}
                                                onSelect={(val: any) => onDateChange('date', val)}
                                                selected={new Date(moment(state.unitAvailability.date).format('yyyy-MM-DD'))}
                                                placeholderText={'dd.mm.yyyy'}
                                                dateFormat={'dd.MM.yyyy'}
                                            />
                                        </div>
                                    </div>

                                </div>

                                <div className="card-footer">
                                    <button type="submit" className="btn btn-info" onClick={() => onSave(id)}>
                                        {state.loading ? 'Saving...' : 'Save changes'}
                                    </button>
                                    <Link to={'/units-availability'} className="btn btn-default float-right">Cancel</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditUnitAvailability