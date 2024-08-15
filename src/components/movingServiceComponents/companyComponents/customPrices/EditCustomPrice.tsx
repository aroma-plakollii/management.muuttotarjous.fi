import {Link, useParams, useNavigate} from "react-router-dom";
import DatePicker from "react-datepicker";
import moment from "moment";
import {useEffect, useState} from "react";
import { getCustomPriceDetails } from "../../../../services/movingServiceServices/companyServices/CustomPriceService";
import { getCompanyDetails } from "../../../../services/movingServiceServices/companyServices/CompaniesService";
import {getMsCompanyId} from "../../../../config";
import { getProducts } from "../../../../services/movingServiceServices/companyServices/ProductsService";
import { saveCustomPriceDetails } from "../../../../services/movingServiceServices/companyServices/CustomPriceService";
import { CustomPrice } from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/ICustomPrice";
import {Company} from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/ICompany";
import {Product} from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/IProduct";
import {Loader} from "../../../../views/Loader";

const EditCustomPrice = () => {
    const [state, setState] = useState({
        customPrice: {} as CustomPrice,
        company: {} as Company,
        products: [] as Product[],
        hasError: false,
        loading: true,
    });

    let { id } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        const __init = async () => {
            const customPrice = await getCustomPriceDetails(id);
            const companyId = await getMsCompanyId();
            const company = await getCompanyDetails(companyId);
            const products = await getProducts();
           setState({...state, customPrice, company, products, loading: false})
        }

        __init();

    }, []);

    const onInputChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state, customPrice: {
                ...state.customPrice,
                [key]: value
            }
        })
    }

    const onSave = async (id: any) => {

        const data = {
            company_id: state.company.id,
            product_id: state.customPrice.product_id,
            date: moment(state.customPrice.date).format('YYYY-MM-DD'),
            price: state.customPrice.price,
        }

        const res = await saveCustomPriceDetails(id, data);

        if (res) {
            setState({...state, loading: false});
            navigate('/custom-prices');
        }
    };

    const renderProducts = () => {
        return (
            state.products.map((product: any) => (
                <option value={product.id} key={product.id}>{product.name}</option>            
            ))
        );
    }

    const onDateChange = async (key: string,val: any) => {
        setState({
            ...state, customPrice: {
                ...state.customPrice,
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
                                <h3 className="card-title text-uppercase">Custom Price Details</h3>
                            </div>

                            <div className="form-horizontal">
                                <div className="card-body">

                                    <div className="form-group row">
                                        <label htmlFor="business_number" className="col-sm-3 col-form-label">Company Id</label>
                                        <div className="col-sm-9">
                                            <select className={`form-control`} name="company_id" id="company_id"
                                                    defaultValue={state.company.id}>
                                                <option value={state.customPrice.company_id}>{state.company.name}</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="product_id" className="col-sm-3 col-form-label">Product Id</label>
                                        <div className="col-sm-9">
                                            <select className={`form-control`} name="product_id" id="product_id"
                                                    onChange={(val: any) => onInputChange('product_id', val)} value={state.customPrice.product_id}>
                                                <option value={0}>-- Select Product --</option>
                                                {renderProducts()}
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
                                                selected={new Date(moment(state.customPrice.date).format('yyyy-MM-DD'))}
                                                placeholderText={'dd.mm.yyyy'}
                                                dateFormat={'dd.MM.yyyy'}
                                            />
                                        </div>
                                    </div>


                                    <div className="form-group row">
                                        <label htmlFor="price" className="col-sm-3 col-form-label">Price</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control`} id="price"
                                                    placeholder="00.00" defaultValue={state.customPrice.price} onChange={(val: any) => onInputChange('price', val)} />
                                        </div>
                                    </div>

                                </div>

                                <div className="card-footer">
                                    <button type="submit" className="btn btn-info" onClick={() => onSave(id)}>
                                        {state.loading ? 'Saving...' : 'Save changes'}
                                    </button>
                                    <Link to={'/custom-prices'} className="btn btn-default float-right">Cancel</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditCustomPrice;