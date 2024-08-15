import {Link, useParams, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import ReactQuill from "react-quill";
import DatePicker from "react-datepicker";
import moment from "moment";
import {getMsCompanyId, GMAPKEY} from "../../../../config";
import { usePlacesWidget } from "react-google-autocomplete";
import { getCompanyDetails } from "../../../../services/movingServiceServices/companyServices/CompaniesService";
import { getUnitsByCompany } from "../../../../services/movingServiceServices/companyServices/UnitService";
import { getProducts } from "../../../../services/movingServiceServices/companyServices/ProductsService";
import {addABlockOnBooking} from "../../../../services/movingServiceServices/companyServices/BookingService";
import {getUnitsAvailable} from "../../../../services/movingServiceServices/companyServices/UnitAvailabilityService";
import { Booking } from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/IBooking";
import {Unit} from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/IUnit";
import {UnitAvailability} from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/IUnitAvailability";
import {Loader} from "../../../../views/Loader";

const AddABlock = () => {

    const [state, setState] = useState({
        booking: {} as Booking,
        units: [] as Unit[],
        unitsAvailable: [] as UnitAvailability[],
        companyId: '',
        time: '',
        unitId: '',
        hasError: false,
        loading: true,
    });

    let debounceTimer: NodeJS.Timeout;

    let navigate = useNavigate();

    useEffect(() => {
        const __init = async () => {
            const companyId = await getMsCompanyId();
            const units = await getUnitsByCompany(companyId);
            setState({...state, units, companyId, loading: false});
        }

        __init();


    }, [state.booking.start_date]);

    const onInputChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state, booking: {
                ...state.booking, [key]: value
            }
        });
    }

    const onSelectUnit = (val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state,
            unitId: val.toString(),
            booking: {
                ...state.booking,
                "unit_id": value
            }
        })
    }

    const onDateChange = async (key: string,val: any) => {
        console.log(val)

        const startDate = moment(val).format('YYYY-MM-DD');

        clearTimeout(debounceTimer);

        debounceTimer = setTimeout(async () => {
            const unitsAvailable = await getUnitsAvailable(state.companyId, startDate);

            setState({
                ...state,
                unitsAvailable,
                booking: {
                    ...state.booking,
                    [key]: new Date(moment(val).format('yyyy-MM-DD'))
                }
            });
        }, 500);
    };

    const renderUnits = () => {
        return (
            state.units.map((unit: any) => (
                <option value={unit.id} key={unit.id}>{unit.name}</option>
            ))
        );
    }

    const onTimeChange = (val: any) => {
        setState({
            ...state,
            time: val
        });
    };

    const renderTimes = () => {
        const index = state.unitsAvailable.findIndex((x) => {
            return x.id.toString() === state.booking.unit_id.toString()
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

    const onAddABlock = async () => {
        setState({...state, hasError: false});

        if (
            !state.booking.unit_id ||
            !state.booking.start_date ||
            !state.time
        ){
            setState({
                ...state,
                hasError: true
            })

            return;
        }

        if(!state.hasError){

            const startDate = moment(state.booking.start_date);
            const endDate = moment(state.booking.start_date);

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

            console.log(startDate,endDate)

            const data = {
                company_id: state.companyId,
                unit_id: state.booking.unit_id,
                start_date: startDate.format('YYYY-MM-DD HH:mm:ss'),
                end_date: endDate.format('YYYY-MM-DD HH:mm:ss'),
                start_comment: state.booking.start_comment
            }

            const res = await addABlockOnBooking(data);

            if (res) {
                setState({...state, loading: false});
                navigate('/month');
            }
        }
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
                                <h3 className="card-title text-uppercase">Add a block</h3>
                            </div>

                            <div className="form-horizontal">
                                <div className="card-body">

                                    <div className="form-group row">
                                        <label htmlFor="start_comment" className="col-sm-3 col-form-label">Description</label>
                                        <div className="col-sm-9">
                                            <textarea className={`form-control`} id="start_comment"
                                                      placeholder="Description" onChange={(val: any) => onInputChange('start_comment', val)} defaultValue={state.booking.start_comment}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="unit_id" className="col-sm-3 col-form-label">Unit Id</label>
                                        <div className="col-sm-9">
                                            <select className={`form-control ${state.hasError && !state.booking.unit_id ? 'is-invalid' : ''}`} name="unit_id" id="unit_id"
                                                    onChange={(val: any) => onSelectUnit(val)} value={state.booking.unit_id}>
                                                <option value={0}>-- Select Unit --</option>
                                                {renderUnits()}
                                            </select>
                                        </div>
                                    </div>

                                    {state.booking.unit_id &&
                                        (
                                            <div className="form-group row">
                                                <label htmlFor="date" className="col-sm-3 col-form-label">Date</label>
                                                <div className="col-sm-9">
                                                    <DatePicker
                                                        className={'form-control'}
                                                        onChange={(val: any) => onDateChange('start_date', val)}
                                                        onSelect={(val: any) => onDateChange('start_date', val)}
                                                        minDate={new Date()}
                                                        selected={new Date(moment(state.booking.start_date).format('yyyy-MM-DD'))}
                                                        placeholderText={'dd.mm.yyyy'}
                                                        dateFormat={'dd.MM.yyyy'}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    }


                                    {state.booking.start_date &&
                                        (
                                            <div className="units_list__times">
                                                <label htmlFor="date" className="units_list__times_label col-sm-3 col-form-label">Choose time</label>
                                                {renderTimes()}
                                            </div>
                                    )}

                                </div>
                            </div>

                            <div className="card-footer">
                                <button type="submit" className="btn btn-info" onClick={onAddABlock}>
                                    Add a block
                                </button>
                                <Link to={'/month'} className="btn btn-default float-right">Cancel</Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddABlock