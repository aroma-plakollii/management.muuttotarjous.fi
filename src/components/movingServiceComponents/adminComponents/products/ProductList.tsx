import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import { getProducts, deleteProduct } from "../../../../services/movingServiceServices/adminServices/ProductsService";
import {Product} from "../../../../interfaces/movingServiceInterfaces/adminInterfaces/IProduct";
import {CompanyProductPrice} from "../../../../interfaces/movingServiceInterfaces/adminInterfaces/ICompanyProductPrice";
import AlertConfirm from "../shared/AlertConfirm";
import {ProductType} from "../../../../interfaces/movingServiceInterfaces/adminInterfaces/IProductType";
import {getProductTypes} from "../../../../services/movingServiceServices/adminServices/ProductTypeService";
import {Loader} from "../../../../views/Loader";

const ProductList = () => {
    const [state, setState] = useState({
        products: [] as Product[],
        productTypes: [] as ProductType[],
        loading: true,
        isDeleted: false,
        alertOpen: false,
        deleteProductId: 0
    });

    const __init = async () => {
        const products = await getProducts();
        const productTypes = await getProductTypes();
        setState({...state, products, productTypes, loading: false});
    }

    const onDelete = async (id: number) => {
        setState({...state, alertOpen: true, deleteProductId: id});
    };

    const onCloseAlert = async (confirm: any) => {
        if (confirm === 'confirm') {
            const isDeleted = await deleteProduct(state.deleteProductId);

            if (isDeleted) {
                setState({...state, isDeleted: true, alertOpen: false, deleteProductId: 0});
            }
        } else if(confirm === 'cancel'){
            setState({...state, alertOpen: false, deleteProductId: 0});
        }
    }

    useEffect(()=> {
        __init()
    },[state.isDeleted]);

    const renderProducts = () => {
        return (
            state.products.map((product: any) => {
                const productType = state.productTypes.find((productType) => productType.id === product.type_id);
                const productTypeName = productType ? productType.name : 'Unknown Type';

                return (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.capacity_info}</td>
                        <td>{product.description}</td>
                        <td>{product.duration}</td>
                        <td>{productTypeName}</td>
                        <td>
                            <div className="btn-group btn-group-sm">
                                <Link to={`/product/${product.id}`} className="btn btn-warning"><i
                                    className="fas fa-edit"></i></Link>
                                <a href="javascript:void(0)" className="btn btn-danger"
                                   onClick={() => onDelete(product.id)}><i className="fas fa-trash"></i></a>
                            </div>
                        </td>
                    </tr>
                )
            })
        );
    }

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
                                <h3 className="card-title text-uppercase">Product list</h3>
                            </div>

                            <div className="card-body table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Product name</th>
                                        <th>Capacity Info</th>
                                        <th>Description</th>
                                        <th>Duration</th>
                                        <th>Type</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {renderProducts()}
                                    </tbody>
                                </table>
                            </div>

                            <div className="card-footer">
                                <Link to={'/product/create'} className="btn btn-info">
                                    Create new
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {state.alertOpen && <AlertConfirm
                title={'You are deleting the product'}
                message={'Are you sure you want to delete the product?'}
                isOpen={state.alertOpen}
                onClose={onCloseAlert}
            />}
        </div>
    );
}

export default ProductList;