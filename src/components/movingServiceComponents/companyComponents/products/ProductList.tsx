import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import { getProducts, deleteProduct } from "../../../../services/movingServiceServices/companyServices/ProductsService";
import {getUnitProductPrices} from "../../../../services/movingServiceServices/companyServices/UnitProductPriceService";
import {getMsCompanyId} from "../../../../config";
import {Product} from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/IProduct";
import {UnitProductPrice} from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/IUnitProductPrice";
import {Loader} from "../../../../views/Loader";

const ProductList = () => {

    let { id } = useParams();

    const [state, setState] = useState({
        products: [] as Product[],
        unitProductPrices: [] as UnitProductPrice[],
        unitId: id ?? '',
        loading: true,
    });

    const __init = async () => {
        const unitProductPrices = await getUnitProductPrices()
        const products = await getProducts();

        console.log(state.unitId);

        setState({...state, products, unitProductPrices, loading: false});
    }

    useEffect(()=> {
        __init()
    },[]);

    const renderProducts = () => {
        return (
            state.products.map((product: any) => {

                const unitProductPrices = state.unitProductPrices.find(
                    (price: UnitProductPrice) => price.product_id === product.id && price.unit_id === parseInt(state.unitId)
                );

                return (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>{product.duration}</td>
                        <td>
                            <div className="btn-group btn-group-sm">
                                {unitProductPrices && (<Link to={`/price/unit/${state.unitId}/product/${product.id}`} className="btn btn-warning">
                                    <i className="fas fa-edit"></i>
                                </Link>
                                )}
                                {!unitProductPrices && (
                                    <Link to={`/price/create/unit/${state.unitId}/product/${product.id}`} className="btn btn-secondary">
                                        <i className="fas fa-plus"></i>
                                    </Link>
                                )}
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
                                        <th>Description</th>
                                        <th>Duration</th>
                                        <th>Price</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {renderProducts()}
                                    </tbody>
                                </table>
                            </div>

                            <div className="card-footer">
                                <Link to={'/units'} className="btn btn-default float-right">Cancel</Link>
                            </div>

                            {/*<div className="card-footer">*/}

                            {/*</div>*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductList;