import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {ProductType} from "../../../../interfaces/movingServiceInterfaces/adminInterfaces/IProductType";
import {getProductType, updateProductType} from "../../../../services/movingServiceServices/adminServices/ProductTypeService";
import {Loader} from "../../../../views/Loader";

const EditProductType = () => {
    const [state, setState] = useState({
        productType: {} as ProductType,
        loading: true,
        modalOpen: false,
        hasError: false,
    });

    let { id } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        const __init = async () => {
            const productType = await getProductType(id);

            setState({...state, productType, loading: false})
        }

        __init()
    }, []);

    const onInputChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state, productType: {
                ...state.productType, [key]: value
            }
        });
    }

    const onSave = async (id: any) => {
        const data = {
            name: state.productType.name,
        }

        const res = await updateProductType(id, data);

        if (res) {
            setState({...state, loading: false})
            navigate('/product-types')
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
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title text-uppercase">Product Type Details</h3>
                                </div>

                                <div className="form-horizontal">
                                    <div className="card-body">
                                        <div className="form-group row">
                                            <label htmlFor="name" className="col-sm-3 col-form-label">Product Type Name</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="name"
                                                       placeholder="Kaksiot" onChange={(val: any) => onInputChange('name', val)} defaultValue={state.productType.name}/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card-footer">
                                        <button type="submit" className="btn btn-info" onClick={() => onSave(id)}>
                                            {state.loading ? 'Saving...' : 'Save changes'}
                                        </button>
                                        <Link to={'/product-types'} className="btn btn-default float-right">Cancel</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditProductType;