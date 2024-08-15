import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {addProduct, getProduct} from "../../../../services/movingServiceServices/adminServices/ProductsService";
import { Product } from "../../../../interfaces/movingServiceInterfaces/adminInterfaces/IProduct";
import ImageConfirm from "../shared/ImageConfirm";
import {ProductType} from "../../../../interfaces/movingServiceInterfaces/adminInterfaces/IProductType";
import {getProductTypes} from "../../../../services/movingServiceServices/adminServices/ProductTypeService";
import {Loader} from "../../../../views/Loader";

const CreateProduct = () => {
    const [state, setState] = useState({
        productDetails: {} as Product,
        productTypes: [] as ProductType[],
        loading: true,
        modalOpen: false,
        hasError: false,
    });

    const [image, setImage] = useState('');

    let navigate = useNavigate();

    useEffect(() => {
        const __init = async () => {
            const productTypes = await getProductTypes();

            setState({...state, productTypes, loading: false})
        }

        __init()
    }, []);

    const handleSelectImage = (src: string) => {
        setImage(src);
    };

    const handleOpenImageConfirm = () => {
        setState({...state, modalOpen: true});
    };

    const handleCloseImageConfirm = (confirm: any) => {
        setState({...state, modalOpen: false});
        if (confirm === 'cancel') {
            setImage('');
        }
    };

    const onInputChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state, productDetails: {
                ...state.productDetails, [key]: value
            }
        })
    }

    const onSelectChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state,
            productDetails: {
                ...state.productDetails,
                [key]: value
            }
        });
    };

    const onCreate = async () => {
        setState({...state, hasError: false});

        if (
            !state.productDetails.name ||
            !state.productDetails.description ||
            !state.productDetails.duration
        ){
            setState({
                ...state,
                hasError: true
            })

            return;
        }

        if (!state.hasError){

            const data = {
                type_id: state.productDetails.type_id,
                name: state.productDetails.name,
                capacity_info: state.productDetails.capacity_info,
                description: state.productDetails.description,
                duration: state.productDetails.duration,
                image: image,
                type: state.productDetails.type
            }

            const res = await addProduct(data);

            if (res) {
                navigate('/products');
            }
        }
    };

    const renderProductTypes = () => {
        return(
            state.productTypes.map(productType => (
                <option value={productType.id} key={productType.id}>{productType.name}</option>
            ))
        )
    }

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
                                    <h3 className="card-title text-uppercase">Product Details</h3>
                                </div>

                                <div className="form-horizontal">
                                    <div className="card-body">

                                        <div className="form-group row">
                                            <label htmlFor="type_id" className="col-sm-3 col-form-label">Product
                                                Type</label>
                                            <div className="col-sm-9">
                                                <select
                                                    name="type_id"
                                                    id="type_id"
                                                    className={`form-control`}
                                                    onChange={(val: any) => onSelectChange('type_id', val)}
                                                    value={state.productDetails.type_id}
                                                >
                                                    <option value={''}>-- Choose type --</option>
                                                    {renderProductTypes()}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="name" className="col-sm-3 col-form-label">Product
                                                Name</label>
                                            <div className="col-sm-9">
                                                <input type="text"
                                                       className={`form-control ${state.hasError && !state.productDetails.name ? 'is-invalid' : ''}`}
                                                       id="name"
                                                       placeholder="Kaksiot"
                                                       onChange={(val: any) => onInputChange('name', val)}/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="capacity_info" className="col-sm-3 col-form-label">Capacity Info</label>
                                            <div className="col-sm-9">
                                                <input type="text"
                                                       className={`form-control ${state.hasError && !state.productDetails.capacity_info ? 'is-invalid' : ''}`}
                                                       id="capacity_info"
                                                       placeholder=""
                                                       onChange={(val: any) => onInputChange('capacity_info', val)}/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="description"
                                                   className="col-sm-3 col-form-label">Description</label>
                                            <div className="col-sm-9">
                                                <textarea
                                                    className={`form-control ${state.hasError && !state.productDetails.description ? 'is-invalid' : ''}`}
                                                    id="description"
                                                    placeholder="Description"
                                                    onChange={(val: any) => onInputChange('description', val)}/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="duration"
                                                   className="col-sm-3 col-form-label">Duration</label>
                                            <div className="col-sm-9">
                                                <input type="text"
                                                       className={`form-control ${state.hasError && !state.productDetails.duration ? 'is-invalid' : ''}`}
                                                       id="duration"
                                                       placeholder="duration"
                                                       onChange={(val: any) => onInputChange('duration', val)}/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="image" className="col-sm-3 col-form-label">Image</label>
                                            <div className="col-sm-9">
                                                <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                                                    <input readOnly={true} type="text"
                                                           className={`form-control ${state.hasError && !state.productDetails.image ? 'is-invalid' : ''}`}
                                                           style={{width: "calc(100% - 30px)"}} id="image"
                                                           placeholder="" value={image}/> <span
                                                    className=" btn btn-outline-primary"
                                                    onClick={handleOpenImageConfirm}><i
                                                    className={"fas fa-plus"}></i></span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="card-footer">
                                        <button type="submit" className="btn btn-info" onClick={onCreate}>
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

            {state.modalOpen && <ImageConfirm
                title={'Select image'}
                isOpen={state.modalOpen}
                onClose={handleCloseImageConfirm}
                onSelectImage={handleSelectImage}
            />}
        </>
    );
}

export default CreateProduct