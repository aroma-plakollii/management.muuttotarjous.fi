import {getUsers} from "../../../../services/movingBoxesServices/adminServices/UserService";
import {addCompany, getCompanies} from "../../../../services/movingBoxesServices/adminServices/CompaniesService";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {addPrice} from "../../../../services/movingBoxesServices/adminServices/PricesService";

const CreatePrice = () => {
    const [state, setState] = useState({
        company_id: '',
        price_per_km: '',
        price_per_day: '',
        price_per_package: '',
        booking_price: '',
        additional_price: '',
        additional_package_price: '',
        package_days: '',
        included_km: '',
        min_boxes: '',
        type: '',
        companies: [],
        loading: false,
        hasError: false,
    });

    let navigate = useNavigate();

    useEffect(() => {
        const __init = async () => {
            const companies = await getCompanies();
            setState({...state, companies})
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

    const onCreate = async () => {
        setState({...state, hasError: false});

        if (
            !state.price_per_km ||
            !state.price_per_day ||
            !state.price_per_package ||
            !state.booking_price ||
            !state.additional_price ||
            !state.additional_package_price ||
            !state.package_days ||
            !state.included_km ||
            !state.min_boxes ||
            !state.type
        ){
            setState({
                ...state,
                hasError: true
            })

            return;
        }

        if (!state.hasError){
            const res = await addPrice(state);

            if (res) {
                navigate('/prices');
            }
        }
    };

    const renderCompanies = () => {
        return (
            state.companies.map((company: any) => (
                <option value={company.id} key={company.id}>{company.name}</option>
            ))
        );
    }

    return (
        <div className="content-header">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title text-uppercase">Price Details</h3>
                            </div>

                            <div className="form-horizontal">
                                <div className="card-body">
                                    <div className="form-group row">
                                        <label htmlFor="business_number" className="col-sm-3 col-form-label">Companies</label>
                                        <div className="col-sm-9">
                                            <select className={`form-control ${state.hasError && !state.company_id ? 'is-invalid' : ''}`} name="companies" id="companies"
                                                    onChange={(val: any) => onInputChange('company_id', val)} >
                                                <option value="0" selected={true}>-- Select Company --</option>
                                                {renderCompanies()}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="first_name" className="col-sm-3 col-form-label">
                                            Price per Km
                                            <br/>
                                            <small className="text-info">If there is no city on the list</small>
                                        </label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.price_per_km ? 'is-invalid' : ''}`} id="price_per_km"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('price_per_km', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="last_name" className="col-sm-3 col-form-label">Price per Day</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.price_per_day ? 'is-invalid' : ''}`} id="price_per_day"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('price_per_day', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="last_name" className="col-sm-3 col-form-label">Price per day on package</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.price_per_package ? 'is-invalid' : ''}`} id="price_per_package"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('price_per_package', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-sm-3 col-form-label">Booking price</label>
                                        <div className="col-sm-9">
                                            <input type="email" className={`form-control ${state.hasError && !state.booking_price ? 'is-invalid' : ''}`} id="booking_price"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('booking_price', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="phone" className="col-sm-3 col-form-label">Continue daily price</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.additional_price ? 'is-invalid' : ''}`} id="additional_price"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('additional_price', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="phone" className="col-sm-3 col-form-label">Continue daily price on package</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.additional_package_price ? 'is-invalid' : ''}`} id="additional_package_price"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('additional_package_price', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="address" className="col-sm-3 col-form-label">Package Days</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.package_days ? 'is-invalid' : ''}`} id="package_days"
                                                   placeholder="10" onChange={(val: any) => onInputChange('package_days', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="address" className="col-sm-3 col-form-label">
                                            Included km Delivery/Pickup <br/>
                                            <small className="text-info">If there is no city on the list</small>
                                        </label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.included_km ? 'is-invalid' : ''}`} id="included_km"
                                                   placeholder="10" onChange={(val: any) => onInputChange('included_km', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="address" className="col-sm-3 col-form-label">Min Boxes</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.min_boxes ? 'is-invalid' : ''}`} id="min_boxes"
                                                   placeholder="2" onChange={(val: any) => onInputChange('min_boxes', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="address" className="col-sm-3 col-form-label">Type</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.type ? 'is-invalid' : ''}`} id="type"
                                                   placeholder="small" onChange={(val: any) => onInputChange('type', val)} />
                                        </div>
                                    </div>
                                </div>

                                <div className="card-footer">
                                    <button type="submit" className="btn btn-info" onClick={onCreate}>
                                        {state.loading ? 'Saving...' : 'Save changes'}
                                    </button>
                                    <Link to={'/companies'} className="btn btn-default float-right">Cancel</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreatePrice