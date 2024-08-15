import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {getUnitProductPriceDetails, saveUnitProductPricesDetails} from "../../../../services/movingServiceServices/companyServices/UnitProductPriceService";
import {getCompanyDetails} from "../../../../services/movingServiceServices/companyServices/CompaniesService";
import {getMsCompanyId} from "../../../../config";
import { getProduct } from "../../../../services/movingServiceServices/companyServices/ProductsService";
import {getUnitDetails} from "../../../../services/movingServiceServices/companyServices/UnitService";
import { UnitProductPrice } from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/IUnitProductPrice";
import { Product } from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/IProduct";
import {Unit} from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/IUnit";
import {Company} from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/ICompany";
import {Loader} from "../../../../views/Loader";

const EditPrice = () => {
    const [state, setState] = useState({
        unitProductPrice: {} as UnitProductPrice,
        // company: {} as Company,
        unit: {} as Unit,
        product: {} as Product,
        loading: true,
        hasError: false,
    });

    const [description, setDescription] = useState('')

    let { unitId } = useParams();
    let { productId } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        const __init = async () => {
            const product = await getProduct(productId);
            const unit = await getUnitDetails(unitId);
            const unitProductPrice = await getUnitProductPriceDetails({product_id: productId, unit_id: unitId});
            console.log(unitProductPrice);
            setState({...state, unitProductPrice, product, unit, loading: false});
            setDescription(unitProductPrice.description);
        }

        __init()
    }, []);

    const onInputChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state, unitProductPrice: {
                ...state.unitProductPrice, [key]: value
            }
        });
    }

    const handleChange = (value: string) => {
        setDescription(value)
    };

    const onSave = async (id: any) => {

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

        const res = await saveUnitProductPricesDetails(data, id);

        if (res) {
            setState({...state, loading: false})
            navigate(`/unit/products/${unitId}`);
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
                                <h3 className="card-title text-uppercase">Product Price Details</h3>
                            </div>

                            <div className="form-horizontal">
                                <div className="card-body">
                                    <div className="form-group row">
                                        <label htmlFor="price" className="col-sm-3 col-form-label">Price</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control`} id="price"
                                                   placeholder="0.00"  onChange={(val: any) => onInputChange('price', val)} value={state.unitProductPrice.price}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="saturday_price" className="col-sm-3 col-form-label">Saturday Price</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control`} id="saturday_price"
                                                   placeholder="0.00" onChange={(val: any) => onInputChange('saturday_price', val)} value={state.unitProductPrice.saturday_price}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="sunday_price" className="col-sm-3 col-form-label">Sunday Price</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control`} id="sunday_price"
                                                   placeholder="0.00" value={state.unitProductPrice.sunday_price} onChange={(val: any) => onInputChange('sunday_price', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="discount_price" className="col-sm-3 col-form-label">Discount Price</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control`} id="discount_price"
                                                   placeholder="0.00" value={state.unitProductPrice.discount_price} onChange={(val: any) => onInputChange('discount_price', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="price_per_m2" className="col-sm-3 col-form-label">Price per m2 <span style={{fontWeight: "normal"}}>(€/m2)</span></label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control`} id="price_per_m2"
                                                   placeholder="0.00" value={state.unitProductPrice.price_per_m2} onChange={(val: any) => onInputChange('price_per_m2', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="included_m2" className="col-sm-3 col-form-label">Included m2</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control`} id="included_m2"
                                                   placeholder="0" value={state.unitProductPrice.included_m2} onChange={(val: any) => onInputChange('included_m2', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="no_elevator" className="col-sm-3 col-form-label">If no Elevator <span style={{fontWeight: "normal"}}>(this calculate +%/floor)</span></label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control`} id="no_elevator"
                                                   placeholder="0" value={state.unitProductPrice.no_elevator} onChange={(val: any) => onInputChange('no_elevator', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="small_elevator" className="col-sm-3 col-form-label">If small Elevator <span style={{fontWeight: "normal"}}>(this calculate +%/floor)</span></label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control`} id="small_elevator"
                                                   placeholder="0" value={state.unitProductPrice.small_elevator} onChange={(val: any) => onInputChange('small_elevator', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="big_elevator" className="col-sm-3 col-form-label">Big Elevator</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control`} id="big_elevator"
                                                   placeholder="0" value={state.unitProductPrice.big_elevator} onChange={(val: any) => onInputChange('big_elevator', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="new_building" className="col-sm-3 col-form-label">If new Building <span style={{fontWeight: "normal"}}>(this calculate +%/floor)</span></label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control`} id="new_building"
                                                   placeholder="0" value={state.unitProductPrice.new_building} onChange={(val: any) => onInputChange('new_building', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="price_per_km" className="col-sm-3 col-form-label">Price per Kilometer <span style={{fontWeight: "normal"}}>(will be +euro/km, km will start counting after km included)</span></label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control`} id="price_per_km"
                                                   placeholder="0.00" value={state.unitProductPrice.price_per_km} onChange={(val: any) => onInputChange('price_per_km', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="included_km" className="col-sm-3 col-form-label">Included km</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control`} id="included_km"
                                                   placeholder="0.00" value={state.unitProductPrice.included_km} onChange={(val: any) => onInputChange('included_km', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="basement_storage_price_per_m2" className="col-sm-3 col-form-label">Basement Storage Price per m2</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control`} id="basement_storage_price_per_m2"
                                                   placeholder="0.00" value={state.unitProductPrice.basement_storage_price_per_m2} onChange={(val: any) => onInputChange('basement_storage_price_per_m2', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="included_m2_basement_storage" className="col-sm-3 col-form-label">Included m2 Basement Storage</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control`} id="included_m2_basement_storage"
                                                   placeholder="0.00" value={state.unitProductPrice.included_m2_basement_storage} onChange={(val: any) => onInputChange('included_m2_basement_storage', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="roof_storage_price_per_m2" className="col-sm-3 col-form-label">Roof Storage Price per m2</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control`} id="roof_storage_price_per_m2"
                                                   placeholder="0.00" value={state.unitProductPrice.roof_storage_price_per_m2} onChange={(val: any) => onInputChange('roof_storage_price_per_m2', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="included_m2_roof_storage" className="col-sm-3 col-form-label">Included m2 Roof Storage</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control`} id="included_m2_roof_storage"
                                                   placeholder="0" defaultValue={state.unitProductPrice.included_m2_roof_storage} onChange={(val: any) => onInputChange('included_m2_roof_storage', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="included_meters_outdoor" className="col-sm-3 col-form-label">Included Meters Outdoor</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control`} id="included_meters_outdoor"
                                                   placeholder="0" value={state.unitProductPrice.included_meters_outdoor} onChange={(val: any) => onInputChange('included_meters_outdoor', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="outdoor_price_per_meter" className="col-sm-3 col-form-label">Distance from the door</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control`} id="outdoor_price_per_meter"
                                                   placeholder="0.00" value={state.unitProductPrice.outdoor_price_per_meter} onChange={(val: any) => onInputChange('outdoor_price_per_meter', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="description" className="col-sm-3 col-form-label">Description <span style={{fontWeight: "normal"}}>(what is included in price)</span></label>
                                        <div className="col-sm-9">
                                            <ReactQuill value={description} onChange={handleChange} />
                                        </div>
                                    </div>

                                </div>

                                <div className="card-footer">
                                    <button type="submit" className="btn btn-info" onClick={() => onSave(productId)}>
                                        {state.loading ? 'Saving...' : 'Save changes'}
                                    </button>
                                    <Link to={`/unit/products/${unitId}`} className="btn btn-default float-right">Cancel</Link>
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