import { useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import DatePicker from "react-datepicker";
import moment from "moment";
import { getCompanyDetails } from "../../../../services/movingServiceServices/companyServices/CompaniesService";
import {getMsCompanyId} from "../../../../config";
import {
    getUnitDetails,
    getUnitsByCompany
} from "../../../../services/movingServiceServices/companyServices/UnitService";
import {
    addUnitAvailability,
    getUnitsAvailable
} from "../../../../services/movingServiceServices/companyServices/UnitAvailabilityService";
import { UnitAvailability } from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/IUnitAvailability";
import {Company} from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/ICompany";
import {Unit} from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/IUnit";
import {Loader} from "../../../../views/Loader";

const CreateUnitAvailability = () => {
    const [state, setState] = useState({
        unitAvailability: {} as UnitAvailability,
        unitsAvailable: [] as UnitAvailability[],
        company: {} as Company,
        units: [] as Unit[],
        loading: true,
        hasError: false,
        companyId: '',
        time: '',
        blocked: '',
    });

    let debounceTimer: NodeJS.Timeout;
    let navigate = useNavigate();

    useEffect(() => {
        const __init = async () => {
            const companyId = await getMsCompanyId();
            const company = await getCompanyDetails(companyId);
            const units = await getUnitsByCompany(companyId);
            setState({...state, company, units, companyId, loading: false});
        }

        __init();

    }, [state.blocked]);

    const onInputChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state, unitAvailability: {
                ...state.unitAvailability, [key]: value
            }
        })
    }

    const renderUnits = () => {
        return (
            state.units.map((unit: any) => (
                <option value={unit.id} key={unit.id}>{unit.name}</option>
            ))
        );
    }

    const onTimeChange = (val: any) => {
        console.log(val)
        setState({
            ...state,
            time: val
        });
    };

    const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;

        setState({
            ...state,
            blocked: value
        });
    };

    const onDateChange = async (key: string,val: any) => {
        console.log(val)

        const startDate = moment(val).format('YYYY-MM-DD');

        clearTimeout(debounceTimer);

        debounceTimer = setTimeout(async () => {
            const unitsAvailable = await getUnitsAvailable(state.companyId, startDate);

            setState({
                ...state,
                unitsAvailable,
                unitAvailability: {
                    ...state.unitAvailability,
                    [key]: new Date(moment(val).format('yyyy-MM-DD'))
                }
            });
        }, 500);
    };

    const renderTimes = () => {
        const index = state.unitsAvailable.findIndex((x) => {
            return x.id.toString() === state.unitAvailability.unit_id.toString()
        });
        const hours = state.unitsAvailable[index].hours;
        const hourKeys = Object.keys(hours);
        const now = moment();
        return (
            <div className="radio-group" key={index}>
                {hourKeys.map((x: any, index:number) => {
                    if (index % 4 === 0) {
                        let isDisabled = false;
                        if (!hours[x]) isDisabled = true;
                        now.set({
                            hour: x,
                            minute: 0,
                            minutes: 0,
                        });
                        const value = `${now.format("HH:mm")}h - ${now.add(2, "hours").format("HH:mm")}h`;

                        return (
                            <label key={x} className="radio" onClick={() => {
                                if (!isDisabled) {
                                    onTimeChange(x);
                                }
                            }}>
                                <input
                                    type="radio"
                                    name="time"
                                    value={value}
                                    className="radio-input"
                                    disabled={!hours[x] ? true : false}
                                />
                                <span className="radio-label">{value}</span>
                            </label>
                        );
                    }
                })}
            </div>
        );
    }

    const onCreate = async () => {
        setState({...state, hasError: false});

        if (
            !state.unitAvailability.unit_id ||
            !state.unitAvailability.start_date
        ){
            setState({
                ...state,
                hasError: true
            })

            return;
        }


        if (!state.hasError){

            if(state.blocked === 'choose-time'){
                const startDate = moment(state.unitAvailability.start_date);
                const endDate = moment(state.unitAvailability.start_date);

                startDate.set({
                    hour: parseInt(state.time),
                    minute: 0,
                    minutes: 0,
                })

                endDate.set({
                    hour: parseInt(state.time),
                    minute: 0,
                    minutes: 0,
                }).add(2, 'hours');

                const data = {
                    company_id: state.companyId,
                    unit_id: state.unitAvailability.unit_id,
                    start_date: startDate.format('YYYY-MM-DD HH:mm:ss'),
                    end_date: endDate.format('YYYY-MM-DD HH:mm:ss'),
                }

                const res = await addUnitAvailability(data);

                if (res) {
                    navigate('/units-availability');
                }
            }else if (state.blocked === 'all-day'){
                const startDate = moment(state.unitAvailability.start_date);
                const endDate = moment(state.unitAvailability.start_date);

                const unit = await getUnitDetails(state.unitAvailability.unit_id);

                const startTime = unit.start_time.substring(0, 2);
                const endTime = unit.end_time.substring(0, 2);

                console.log(startTime, endTime)

                startDate.set({
                    hour: parseInt(startTime),
                    minute: 0,
                    minutes: 0,
                })

                endDate.set({
                    hour: parseInt(endTime),
                    minute: 0,
                    minutes: 0,
                });

                const data = {
                    company_id: state.companyId,
                    unit_id: state.unitAvailability.unit_id,
                    start_date: startDate.format('YYYY-MM-DD HH:mm:ss'),
                    end_date: endDate.format('YYYY-MM-DD HH:mm:ss'),
                }

                const res = await addUnitAvailability(data);

                if (res) {
                    navigate('/units-availability');
                }
            }
        }
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
                                        <label htmlFor="business_number" className="col-sm-3 col-form-label">Company
                                            Id</label>
                                        <div className="col-sm-9">
                                            <select className={`form-control`} name="company_id" id="company_id"
                                                    defaultValue={state.company.id}>
                                                <option
                                                    value={state.unitAvailability.company_id}>{state.company.name}</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="unit_id" className="col-sm-3 col-form-label">Unit Id</label>
                                        <div className="col-sm-9">
                                            <select
                                                className={`form-control ${state.hasError && !state.unitAvailability.unit_id ? 'is-invalid' : ''}`}
                                                name="unit_id" id="unit_id"
                                                onChange={(val: any) => onInputChange('unit_id', val)}
                                                value={state.unitAvailability.unit_id}>
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
                                                onChange={(val: any) => onDateChange('start_date', val)}
                                                onSelect={(val: any) => onDateChange('start_date', val)}
                                                minDate={new Date()}
                                                selected={new Date(moment(state.unitAvailability.start_date).format('yyyy-MM-DD'))}
                                                placeholderText={'dd.mm.yyyy'}
                                                dateFormat={'dd.MM.yyyy'}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="business_number"
                                               className="col-sm-3 col-form-label">Block</label>
                                        <div className="col-sm-9">
                                            <select className={`form-control`} name="company_id" id="company_id"
                                                    defaultValue={state.blocked} onChange={onSelectChange}>
                                                <option value={''}>---Choose---</option>
                                                <option value={'all-day'}>All day</option>
                                                <option value={'choose-time'}>Choose time</option>
                                            </select>
                                        </div>
                                    </div>

                                    {state.unitAvailability.start_date && state.blocked === 'choose-time' &&
                                        (
                                            <div className="units_list__times">
                                                <label htmlFor="date"
                                                       className="units_list__times_label col-sm-3 col-form-label">Choose
                                                    time</label>
                                                {renderTimes()}
                                            </div>
                                        )}
                                </div>
                            </div>

                            <div className="card-footer">
                                <button type="submit" className="btn btn-info" onClick={onCreate}>
                                    {state.loading ? 'Saving...' : 'Save changes'}
                                </button>
                                <Link to={'/units-availability'} className="btn btn-default float-right">Cancel</Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateUnitAvailability