import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import AlertConfirm from "../shared/AlertConfirm";
import {ProductType} from "../../../../interfaces/movingServiceInterfaces/adminInterfaces/IProductType";
import {deleteProductType, getProductTypes} from "../../../../services/movingServiceServices/adminServices/ProductTypeService";
import {Loader} from "../../../../views/Loader";

const ProductTypeList = () => {
    const [state, setState] = useState({
        productTypes: [] as ProductType[],
        loading: true,
        isDeleted: false,
        alertOpen: false,
        deleteProductTypeId: 0
    });

    const __init = async () => {
        const productTypes = await getProductTypes();
        setState({...state, productTypes, loading: false});
    }

    const onDelete = async (id: number) => {
        setState({...state, alertOpen: true, deleteProductTypeId: id});
    };

    const onCloseAlert = async (confirm: any) => {
        if (confirm === 'confirm') {
            const isDeleted = await deleteProductType(state.deleteProductTypeId);

            if (isDeleted) {
                setState({...state, isDeleted: true, alertOpen: false, deleteProductTypeId: 0});
            }
        } else if(confirm === 'cancel'){
            setState({...state, alertOpen: false, deleteProductTypeId: 0});
        }
    }

    useEffect(()=> {
        __init()
    },[state.isDeleted]);

    const renderProductTypes = () => {
        return (
            state.productTypes.map((productType: any) => {
                return (
                    <tr key={productType.id}>
                        <td>{productType.id}</td>
                        <td>{productType.name}</td>
                        <td>
                            <div className="btn-group btn-group-sm">
                                <Link to={`/product-type/${productType.id}`} className="btn btn-warning"><i
                                    className="fas fa-edit"></i></Link>
                                <a href="javascript:void(0)" className="btn btn-danger"
                                   onClick={() => onDelete(productType.id)}><i className="fas fa-trash"></i></a>
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
                                <h3 className="card-title text-uppercase">Product Type List</h3>
                            </div>

                            <div className="card-body table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th className="col-md-4">ID</th>
                                        <th className="col-md-6">Name</th>
                                        <th className="col-md-2"></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {renderProductTypes()}
                                    </tbody>
                                </table>
                            </div>

                            <div className="card-footer">
                                <Link to={'/product-type/create'} className="btn btn-info">
                                    Create new
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {state.alertOpen && <AlertConfirm
                title={'You are deleting the product type'}
                message={'Are you sure you want to delete the product type?'}
                isOpen={state.alertOpen}
                onClose={onCloseAlert}
            />}
        </div>
    );
}

export default ProductTypeList;