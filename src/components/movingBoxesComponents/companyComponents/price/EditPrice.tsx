import {Link, useNavigate, useParams} from "react-router-dom";
import {addPrice, getPriceDetails, savePriceDetails} from "../../../../services/movingBoxesServices/adminServices/PricesService";
import {useEffect, useState} from "react";
import {getCompanies} from "../../../../services/movingBoxesServices/adminServices/CompaniesService";
import {getMbCompanyId} from "../../../../config";
import {Loader} from "../../../../views/Loader";

const EditPrice = () => {

    const companyId = getMbCompanyId()
    const [state, setState] = useState({
        priceDetails: {
            company_id: companyId,
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
        },
        companies: [],
        loading: true,
        hasError: false,
    });
    let { id } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        const __init = async () => {
            const price = await getPriceDetails(id);

            setState({...state, priceDetails: price, loading: false})
        }

        __init()
    }, []);

    const onInputChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state, priceDetails: {
                ...state.priceDetails, [key]: value
            }
        });
    }

    const onSave = async (id: any) => {
        setState({...state, hasError: false, loading: true});

        if (
            !state.priceDetails.price_per_km ||
            !state.priceDetails.price_per_day ||
            !state.priceDetails.price_per_package ||
            !state.priceDetails.booking_price ||
            !state.priceDetails.additional_price ||
            !state.priceDetails.additional_package_price ||
            !state.priceDetails.package_days ||
            !state.priceDetails.included_km ||
            !state.priceDetails.min_boxes ||
            !state.priceDetails.type
        ){
            setState({
                ...state,
                hasError: true
            })

            return;
        }

        if (!state.hasError){
            const res = await savePriceDetails(id, state.priceDetails);

            if (res) {
                setState({...state, loading: false})
                navigate('/prices');
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
                                <h3 className="card-title text-uppercase">Price Details</h3>
                            </div>

                            <div className="form-horizontal">
                                <div className="card-body">

                                    <div className="form-group row">
                                        <label htmlFor="first_name" className="col-sm-3 col-form-label">Price per Km</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.priceDetails.price_per_km ? 'is-invalid' : ''}`} id="price_per_km"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('price_per_km', val)} defaultValue={state.priceDetails.price_per_km}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="last_name" className="col-sm-3 col-form-label">Price per Day</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.priceDetails.price_per_day ? 'is-invalid' : ''}`} id="price_per_day"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('price_per_day', val)} defaultValue={state.priceDetails.price_per_day}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="last_name" className="col-sm-3 col-form-label">Price per Package</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.priceDetails.price_per_package ? 'is-invalid' : ''}`} id="price_per_package"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('price_per_package', val)} defaultValue={state.priceDetails.price_per_package}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-sm-3 col-form-label">Booking price</label>
                                        <div className="col-sm-9">
                                            <input type="email" className={`form-control ${state.hasError && !state.priceDetails.booking_price ? 'is-invalid' : ''}`} id="booking_price"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('booking_price', val)} defaultValue={state.priceDetails.booking_price}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="phone" className="col-sm-3 col-form-label">Additional Price</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.priceDetails.additional_price ? 'is-invalid' : ''}`} id="additional_price"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('additional_price', val)} defaultValue={state.priceDetails.additional_price}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="phone" className="col-sm-3 col-form-label">Additional Package Price</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.priceDetails.additional_package_price ? 'is-invalid' : ''}`} id="additional_package_price"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('additional_package_price', val)} defaultValue={state.priceDetails.additional_package_price}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="address" className="col-sm-3 col-form-label">Package Days</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.priceDetails.package_days ? 'is-invalid' : ''}`} id="package_days"
                                                   placeholder="10" onChange={(val: any) => onInputChange('package_days', val)} defaultValue={state.priceDetails.package_days}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="address" className="col-sm-3 col-form-label">Included Km</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.priceDetails.included_km ? 'is-invalid' : ''}`} id="included_km"
                                                   placeholder="10" onChange={(val: any) => onInputChange('included_km', val)} defaultValue={state.priceDetails.included_km}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="address" className="col-sm-3 col-form-label">Min Boxes</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.priceDetails.min_boxes ? 'is-invalid' : ''}`} id="min_boxes"
                                                   placeholder="2" onChange={(val: any) => onInputChange('min_boxes', val)} defaultValue={state.priceDetails.min_boxes}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="address" className="col-sm-3 col-form-label">Type</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.priceDetails.type ? 'is-invalid' : ''}`} id="type"
                                                   placeholder="small" onChange={(val: any) => onInputChange('type', val)} defaultValue={state.priceDetails.type}/>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-footer">
                                    <button type="submit" className="btn btn-info" onClick={() => onSave(id)}>
                                        {state.loading ? 'Saving...' : 'Save changes'}
                                    </button>
                                    <Link to={'/prices'} className="btn btn-default float-right">Cancel</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditPrice;