import {Link, useNavigate, useParams} from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {getCompanyDetails} from "../../../../services/movingServiceServices/companyServices/CompaniesService";
import {getMsCompanyId} from "../../../../config";
import { getProduct } from "../../../../services/movingServiceServices/companyServices/ProductsService";
import {getUnitDetails} from "../../../../services/movingServiceServices/companyServices/UnitService";
import { addUnitProductPrice } from "../../../../services/movingServiceServices/companyServices/UnitProductPriceService";
import { useEffect, useState} from "react";
import { UnitProductPrice} from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/IUnitProductPrice";
import { Product } from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/IProduct";
import {Unit} from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/IUnit";
import {Company} from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/ICompany";
import {Loader} from "../../../../views/Loader";

const CreatePrice = () => {
    const [state, setState] = useState({
        unitProductPrice: {} as UnitProductPrice,
        // company: {} as Company,
        product: {} as Product,
        unit: {} as Unit,
        loading: true,
        hasError: false,
    });

    const [description, setDescription] = useState('')

    let { unitId } = useParams();
    let { productId } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        const __init = async () => {
            // const companyId = await getMsCompanyId()
            // const company = await getCompanyDetails(companyId);
            const unit= await getUnitDetails(unitId);
            const product = await getProduct(productId);
            setState({...state, product, unit, loading: false})
        }

        __init();

    }, []);

    const onInputChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state, unitProductPrice: {
                ...state.unitProductPrice, [key]: value
            }
        })
    }

    const handleChange = (value: string) => {
        setDescription(value)
    };

    const onCreate = async () => {
        setState({...state, hasError: false});

        if (
            !state.unitProductPrice.price ||
            !state.unitProductPrice.saturday_price ||
            !state.unitProductPrice.sunday_price ||
            !state.unitProductPrice.discount_price ||
            !state.unitProductPrice.price_per_m2 ||
            !state.unitProductPrice.included_m2 ||
            !state.unitProductPrice.no_elevator ||
            !state.unitProductPrice.small_elevator ||
            !state.unitProductPrice.big_elevator ||
            !state.unitProductPrice.new_building ||
            !state.unitProductPrice.price_per_km ||
            !state.unitProductPrice.included_km ||
            !state.unitProductPrice.basement_storage_price_per_m2 ||
            !state.unitProductPrice.included_m2_basement_storage ||
            !state.unitProductPrice.roof_storage_price_per_m2 ||
            !state.unitProductPrice.included_m2_roof_storage ||
            !state.unitProductPrice.included_meters_outdoor ||
            !state.unitProductPrice.outdoor_price_per_meter
        ){
            setState({
                ...state,
                hasError: true
            })

            return;
        }

        if (!state.hasError){

            const data = {
                // company_id: state.company.id,
                unit_id: state.unit.id,
                product_id: state.product.id,
                price: state.unitProductPrice.price,
                saturday_price: state.unitProductPrice.saturday_price,
                sunday_price: state.unitProductPrice.sunday_price,
                discount_price: state.unitProductPrice.discount_price,
                price_per_m2: state.unitProductPrice.price_per_m2,
                included_m2: state.unitProductPrice.included_m2,
                no_elevator: state.unitProductPrice.no_elevator,
                small_elevator: state.unitProductPrice.small_elevator,
                big_elevator: state.unitProductPrice.big_elevator,
                new_building: state.unitProductPrice.new_building,
                price_per_km: state.unitProductPrice.price_per_km,
                included_km: state.unitProductPrice.included_km,
                basement_storage_price_per_m2: state.unitProductPrice.basement_storage_price_per_m2,
                included_m2_basement_storage: state.unitProductPrice.included_m2_basement_storage,
                roof_storage_price_per_m2: state.unitProductPrice.roof_storage_price_per_m2,
                included_m2_roof_storage: state.unitProductPrice.included_m2_roof_storage,
                included_meters_outdoor: state.unitProductPrice.included_meters_outdoor,
                outdoor_price_per_meter: state.unitProductPrice.outdoor_price_per_meter,
                description: description,
            }

            const res = await addUnitProductPrice(data);

            if (res) {
                navigate(`/unit/products/${unitId}`);
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
                                <h3 className="card-title text-uppercase">Unit Price Details</h3>
                            </div>

                            <div className="form-horizontal">
                                <div className="card-body">

                                    <div className="form-group row">
                                        <label htmlFor="business_number" className="col-sm-3 col-form-label">Unit Id</label>
                                        <div className="col-sm-9">
                                            <select className={`form-control ${state.hasError && !state.unitProductPrice.unit_id ? 'is-invalid' : ''}`} name="unit_id" id="unit_id"
                                                    defaultValue={state.unit.id}>
                                                <option value={state.unitProductPrice.unit_id}>{state.unit.name}</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="business_number" className="col-sm-3 col-form-label">Product Id</label>
                                        <div className="col-sm-9">
                                            <select className={`form-control ${state.hasError && !state.unitProductPrice.product_id ? 'is-invalid' : ''}`} name="product_id" id="product_id"
                                                    defaultValue={state.product.id}>
                                                <option value={state.unitProductPrice.product_id}>{state.product.name}</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="price" className="col-sm-3 col-form-label">Price</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.unitProductPrice.price ? 'is-invalid' : ''}`} id="price"
                                                    placeholder="0.00" onChange={(val: any) => onInputChange('price', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="saturday_price" className="col-sm-3 col-form-label">Saturday Price</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.unitProductPrice.saturday_price ? 'is-invalid' : ''}`} id="saturday_price"
                                                    placeholder="0.00" onChange={(val: any) => onInputChange('saturday_price', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="sunday_price" className="col-sm-3 col-form-label">Sunday Price</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.unitProductPrice.sunday_price ? 'is-invalid' : ''}`} id="sunday_price"
                                                    placeholder="0.00" onChange={(val: any) => onInputChange('sunday_price', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="discount_price" className="col-sm-3 col-form-label">Discount Price</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.unitProductPrice.discount_price ? 'is-invalid' : ''}`} id="discount_price"
                                                    placeholder="0.00" onChange={(val: any) => onInputChange('discount_price', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="price_per_m2" className="col-sm-3 col-form-label">Price per m2 <span style={{fontWeight: "normal"}}>(€/m2)</span></label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.unitProductPrice.price_per_m2 ? 'is-invalid' : ''}`} id="price_per_m2"
                                                    placeholder="0.00" onChange={(val: any) => onInputChange('price_per_m2', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="included_m2" className="col-sm-3 col-form-label">Included m2</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.unitProductPrice.included_m2 ? 'is-invalid' : ''}`} id="included_m2"
                                                    placeholder="0" onChange={(val: any) => onInputChange('included_m2', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="no_elevator" className="col-sm-3 col-form-label">If no Elevator <span style={{fontWeight: "normal"}}>(this calculate +%/floor)</span></label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.unitProductPrice.no_elevator ? 'is-invalid' : ''}`} id="no_elevator"
                                                    placeholder="0" onChange={(val: any) => onInputChange('no_elevator', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="small_elevator" className="col-sm-3 col-form-label">If small Elevator <span style={{fontWeight: "normal"}}>(this calculate +%/floor)</span></label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.unitProductPrice.small_elevator ? 'is-invalid' : ''}`} id="small_elevator"
                                                    placeholder="0" onChange={(val: any) => onInputChange('small_elevator', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="big_elevator" className="col-sm-3 col-form-label">Big Elevator</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.unitProductPrice.big_elevator ? 'is-invalid' : ''}`} id="big_elevator"
                                                    placeholder="0" onChange={(val: any) => onInputChange('big_elevator', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="new_building" className="col-sm-3 col-form-label">If new Building <span style={{fontWeight: "normal"}}>(this calculate +%/floor)</span></label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.unitProductPrice.new_building ? 'is-invalid' : ''}`} id="new_building"
                                                    placeholder="0" onChange={(val: any) => onInputChange('new_building', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="price_per_km" className="col-sm-3 col-form-label">Price per Kilometer <span style={{fontWeight: "normal"}}>(will be +euro/km, km will start counting after km included)</span></label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.unitProductPrice.price_per_km ? 'is-invalid' : ''}`} id="price_per_km"
                                                    placeholder="0.00" onChange={(val: any) => onInputChange('price_per_km', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="included_km" className="col-sm-3 col-form-label">Included km</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.unitProductPrice.included_km ? 'is-invalid' : ''}`} id="included_km"
                                                    placeholder="0.00" onChange={(val: any) => onInputChange('included_km', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="basement_storage_price_per_m2" className="col-sm-3 col-form-label">Basement Storage Price per m2</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.unitProductPrice.basement_storage_price_per_m2 ? 'is-invalid' : ''}`} id="basement_storage_price_per_m2"
                                                    placeholder="0.00" onChange={(val: any) => onInputChange('basement_storage_price_per_m2', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="included_m2_basement_storage" className="col-sm-3 col-form-label">Included m2 Basement Storage</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.unitProductPrice.included_m2_basement_storage ? 'is-invalid' : ''}`} id="included_m2_basement_storage"
                                                    placeholder="0.00" onChange={(val: any) => onInputChange('included_m2_basement_storage', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="roof_storage_price_per_m2" className="col-sm-3 col-form-label">Roof Storage Price per m2</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.unitProductPrice.roof_storage_price_per_m2 ? 'is-invalid' : ''}`} id="roof_storage_price_per_m2"
                                                    placeholder="0.00" onChange={(val: any) => onInputChange('roof_storage_price_per_m2', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="included_m2_roof_storage" className="col-sm-3 col-form-label">Included m2 Roof Storage</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.unitProductPrice.included_m2_roof_storage ? 'is-invalid' : ''}`} id="included_m2_roof_storage"
                                                    placeholder="0" onChange={(val: any) => onInputChange('included_m2_roof_storage', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="included_meters_outdoor" className="col-sm-3 col-form-label">Included Meters Outdoor</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.unitProductPrice.included_meters_outdoor ? 'is-invalid' : ''}`} id="included_meters_outdoor"
                                                    placeholder="0" onChange={(val: any) => onInputChange('included_meters_outdoor', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="outdoor_price_per_meter" className="col-sm-3 col-form-label">Distance from the door</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.unitProductPrice.outdoor_price_per_meter ? 'is-invalid' : ''}`} id="outdoor_price_per_meter"
                                                    placeholder="0.00" onChange={(val: any) => onInputChange('outdoor_price_per_meter', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="description" className="col-sm-3 col-form-label">Description <span style={{fontWeight: "normal"}}>(what is included in price)</span></label>
                                        <div className="col-sm-9">
                                            <ReactQuill value={description} onChange={handleChange} />
                                        </div>
                                    </div>

                                </div>
                            </div>

                                <div className="card-footer">
                                    <button type="submit" className="btn btn-info" onClick={onCreate}>
                                        {state.loading ? 'Saving...' : 'Save changes'}
                                    </button>
                                    <Link to={`/unit/products/${unitId}`} className="btn btn-default float-right">Cancel</Link>
                                </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreatePrice