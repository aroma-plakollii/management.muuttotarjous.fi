import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {ProductType} from "../../../../interfaces/movingServiceInterfaces/adminInterfaces/IProductType";
import {addProductType} from "../../../../services/movingServiceServices/adminServices/ProductTypeService";

const CreateProductType = () => {
    const [state, setState] = useState({
        productTypeDetails: {} as ProductType,
        loading: false,
        modalOpen: false,
        hasError: false,
    });

    let navigate = useNavigate();

    const onInputChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state, productTypeDetails: {
                ...state.productTypeDetails, [key]: value
            }
        })
    }

    const onCreate = async () => {
        setState({...state, hasError: false});

        if (
            !state.productTypeDetails.name
        ){
            setState({
                ...state,
                hasError: true
            })

            return;
        }

        if (!state.hasError){

            const data = {
                name: state.productTypeDetails.name,
            }

            const res = await addProductType(data);

            if (res) {
                navigate('/product-types');
            }
        }
    };

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
                                                <input type="text" className={`form-control ${state.hasError && !state.productTypeDetails.name ? 'is-invalid' : ''}`} id="name"
                                                       placeholder="Moving Service" onChange={(val: any) => onInputChange('name', val)} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card-footer">
                                        <button type="submit" className="btn btn-info" onClick={onCreate}>
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

export default CreateProductType;