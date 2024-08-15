import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import { getCustomPricesByCompany } from "../../../../services/movingServiceServices/companyServices/CustomPriceService";
import { deleteCustomPrice } from "../../../../services/movingServiceServices/companyServices/CustomPriceService";
import {getMsCompanyId} from "../../../../config";
import { getCompanyDetails } from "../../../../services/movingServiceServices/companyServices/CompaniesService";
import { getProducts } from "../../../../services/movingServiceServices/companyServices/ProductsService";
import { Product } from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/IProduct";
import { Company } from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/ICompany";
import {CustomPrice} from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/ICustomPrice";
import {Loader} from "../../../../views/Loader";

const CustomPriceList = () => {
    const [state, setState] = useState({
        customPrices: [] as CustomPrice[],
        company: {} as Company,
        products: [] as Product[],
        loading: true,
        isDeleted: false,
    });

    const __init = async () => {
        const companyId = await getMsCompanyId();
        const customPrices = await getCustomPricesByCompany(companyId);
        const company = await getCompanyDetails(companyId);
        const products = await getProducts();
        setState({...state, customPrices, company, products, loading: false});
    }

    const onDelete = async (id: number) => {
        const isDeleted = await deleteCustomPrice(id);

        if (isDeleted){
            setState({...state, isDeleted: true});
        }
    };

    useEffect(()=> {
        __init()
    },[state.isDeleted]);

    const renderCustomPrices = () => {
        return (
            state.customPrices.map((customPrice: any) => {
                const product = state.products.find((p) => p.id === customPrice.product_id);

                return (
                <tr key={customPrice.id}>
                    <td>
                        {customPrice.id}
                    </td>
                    <td>
                        {product ? product.name : ''}
                    </td>
                    <td>
                        {customPrice.date}
                    </td>
                    <td>
                        {customPrice.price}
                    </td>
                    <td>
                        <div className="btn-group btn-group-sm">
                            <Link to={`/custom-prices/${customPrice.id}`} className="btn btn-warning"><i className="fas fa-edit"></i></Link>
                            <a href="javascript:void(0)" className="btn btn-danger" onClick={() => onDelete(customPrice.id)}><i className="fas fa-trash"></i></a>
                        </div>
                    </td>
                </tr>
            )})
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
                                <h3 className="card-title text-uppercase">Custom Prices list</h3>
                            </div>

                            <div className="card-body table-responsive">
                                <table className="table table-striped text-nowrap">
                                    <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Product Name</th>
                                        <th>Date</th>
                                        <th>Price</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {renderCustomPrices()}
                                    </tbody>
                                </table>
                            </div>

                            <div className="card-footer">
                                <Link to={'/custom-prices/create'} className="btn btn-info">
                                    Create new
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomPriceList;