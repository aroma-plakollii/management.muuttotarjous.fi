import {Link, useNavigate, useParams} from "react-router-dom";
import { getProduct, saveDetails} from "../../../../services/movingServiceServices/companyServices/ProductsService";
import {useEffect, useState} from "react";
import { Product } from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/IProduct";
import {Loader} from "../../../../views/Loader";

const EditProduct = () => {
    const [state, setState] = useState({
        product: {} as Product,
        loading: true,
        hasError: false,
    });
    let { id } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        const __init = async () => {
            const product = await getProduct(id);

            setState({...state, product: product, loading: false})
        }

        __init()
    }, []);

    const onInputChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state, product: {
                ...state.product, [key]: value
            }
        });
    }

    const onSave = async (id: any) => {

        const res = await saveDetails(id, state.product);

        if (res) {
            setState({...state, loading: false})
            navigate('/products')
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
                                <h3 className="card-title text-uppercase">Product Details</h3>
                            </div>

                            <div className="form-horizontal">
                                <div className="card-body">
                                    <div className="form-group row">
                                        <label htmlFor="name" className="col-sm-3 col-form-label">Product name</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control`} id="name"
                                                   placeholder="Kaksiot" onChange={(val: any) => onInputChange('name', val)} defaultValue={state.product.name}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="description" className="col-sm-3 col-form-label">Description</label>
                                        <div className="col-sm-9">
                                            <textarea className={`form-control`} id="description"
                                                   placeholder="Description" onChange={(val: any) => onInputChange('description', val)} defaultValue={state.product.description}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="duration" className="col-sm-3 col-form-label">Duration</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control`} id="duration"
                                                   placeholder="1" onChange={(val: any) => onInputChange('duration', val)} defaultValue={state.product.duration}/>
                                        </div>
                                    </div>

                                </div>

                                <div className="card-footer">
                                    <button type="submit" className="btn btn-info" onClick={() => onSave(id)}>
                                        {state.loading ? 'Saving...' : 'Save changes'}
                                    </button>
                                    <Link to={'/products'} className="btn btn-default float-right">Cancel</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProduct;