import {Link, useNavigate, useParams} from "react-router-dom";
import { getProduct, saveDetails} from "../../../../services/movingServiceServices/adminServices/ProductsService";
import {useEffect, useState} from "react";
import { Product } from "../../../../interfaces/movingServiceInterfaces/adminInterfaces/IProduct";
import ImageConfirm from "../shared/ImageConfirm";
import {getProductTypes} from "../../../../services/movingServiceServices/adminServices/ProductTypeService";
import {ProductType} from "../../../../interfaces/movingServiceInterfaces/adminInterfaces/IProductType";
import {Loader} from "../../../../views/Loader";

const EditProduct = () => {
    const [state, setState] = useState({
        product: {} as Product,
        productTypes: [] as ProductType[],
        loading: true,
        modalOpen: false,
        hasError: false,
    });

    const [image, setImage] = useState('');

    let { id } = useParams();
    let navigate = useNavigate();

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

    useEffect(() => {
        const __init = async () => {
            const product = await getProduct(id);
            const productTypes = await getProductTypes();

            setState({...state, product: product, productTypes, loading: false});
            setImage(product.image);
        }

        __init();
    }, []);

    const onInputChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state, product: {
                ...state.product, [key]: value
            }
        });
    }

    const onSelectChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state,
            product: {
                ...state.product,
                [key]: value
            }
        });
    };

    const onSave = async (id: any) => {
            const data = {
                type_id: state.product.type_id,
                name: state.product.name,
                capacity_info: state.product.capacity_info,
                description: state.product.description,
                duration: state.product.duration,
                image: image,
                type: state.product.type
            }

            const res = await saveDetails(id, data);

            if (res) {
                setState({...state, loading: false})
                navigate('/products')
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
                                                    value={state.product.type_id}
                                                >
                                                    <option value={''}>-- Choose type --</option>
                                                    {renderProductTypes()}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="name" className="col-sm-3 col-form-label">Product
                                                name</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="name"
                                                       placeholder="Kaksiot"
                                                       onChange={(val: any) => onInputChange('name', val)}
                                                       defaultValue={state.product.name}/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="capacity_info" className="col-sm-3 col-form-label">Capacity Info</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="capacity_info"
                                                       placeholder=""
                                                       onChange={(val: any) => onInputChange('capacity_info', val)}
                                                       defaultValue={state.product.capacity_info}/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="description"
                                                   className="col-sm-3 col-form-label">Description</label>
                                            <div className="col-sm-9">
                                                <textarea className={`form-control`} id="description"
                                                          placeholder="Description"
                                                          onChange={(val: any) => onInputChange('description', val)}
                                                          defaultValue={state.product.description}/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="duration"
                                                   className="col-sm-3 col-form-label">Duration</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control`} id="duration"
                                                       placeholder="1"
                                                       onChange={(val: any) => onInputChange('duration', val)}
                                                       defaultValue={state.product.duration}/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="image" className="col-sm-3 col-form-label">Image</label>
                                            <div className="col-sm-9">
                                                <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                                                    <input readOnly={true} type="text" className={`form-control`}
                                                           style={{width: "calc(100% - 30px)"}} id="image"
                                                           placeholder="" defaultValue={image}/> <span
                                                    className=" btn btn-outline-primary"
                                                    onClick={handleOpenImageConfirm}><i
                                                    className={"fas fa-plus"}></i></span>
                                                </div>
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

            {state.modalOpen && <ImageConfirm
                title={'Select image'}
                isOpen={state.modalOpen}
                onClose={handleCloseImageConfirm}
                onSelectImage={handleSelectImage}
            />}
        </>
    );
}

export default EditProduct;