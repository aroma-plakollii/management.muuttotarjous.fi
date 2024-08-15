import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {
    getCoupons,
    deleteCoupon,
    getCouponsByCompany
} from "../../../../services/movingServiceServices/companyServices/CouponService";
import {Coupon} from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/ICoupons";
import AlertConfirm from "../../adminComponents/shared/AlertConfirm";
import {Loader} from "../../../../views/Loader";
import {getMsCompanyId} from "../../../../config";
import {getCompany} from "../../../../services/movingBoxesServices/companyServices/CompaniesService";
import {Company} from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/ICompany";
import {getCompanyDetails} from "../../../../services/movingServiceServices/companyServices/CompaniesService";

const CouponList = () => {
    const [state, setState] = useState({
        coupons: [] as Coupon[],
        company: {} as Company,
        loading: true,
        isDeleted: false,
        alertOpen: false,
        deleteCouponId: 0
    });

    const onDelete = async (id: number) => {
        setState({...state, alertOpen: true, deleteCouponId: id});
    };

    const onCloseAlert = async (confirm: any) => {
        if (confirm === 'confirm') {
            const isDeleted = await deleteCoupon(state.deleteCouponId);

            if (isDeleted) {
                setState({...state, isDeleted: true, alertOpen: false, deleteCouponId: 0});
            }
        } else if(confirm === 'cancel'){
            setState({...state, alertOpen: false, deleteCouponId: 0});
        }
    }

    useEffect(()=> {
        const __init = async () => {
            const company_id = await getMsCompanyId()
            const coupons = await getCouponsByCompany(company_id);
            console.log(coupons);
            const company = await getCompanyDetails(company_id)
            setState({...state, coupons, company, loading: false})
        }

        __init()

    }, [state.isDeleted]);

    if (state.loading) {
        return <>
            <div className="loader-container">
                <Loader color='#3642e8' width={50}/>
            </div>
        </>
    }

    const renderCoupons = () => {
        return (
            state.coupons.map((coupon: any) => {

                return (
                    <tr>
                        <td>
                            {coupon.id}
                        </td>
                        <td>
                            {state.company.name}
                        </td>
                        <td>
                            {coupon.code}
                        </td>
                        <td>
                            {coupon.price}
                        </td>
                        <td>
                            {coupon.available_usages !== 0 ? coupon.available_usages : 'unlimited'}
                        </td>
                        <td>
                            {coupon.used}
                        </td>
                        <td>
                            {<span
                                className={` ${coupon.is_percentage == 1 ? 'fas fa-check text-success' : 'fas fa-times text-danger'}`}></span>}
                        </td>
                        <td>
                            {<span
                                className={` ${coupon.is_unlimited == 1 ? 'fas fa-check text-success' : 'fas fa-times text-danger'}`}></span>}
                        </td>
                        <td>
                            {<span
                                className={` fas fa-circle ${coupon.status == 1 ? 'text-success' : 'text-danger'}`}></span>}
                        </td>
                        <td>
                            <div className="btn-group btn-group-sm">
                                <Link to={`/coupons/${coupon.id}`} className="btn btn-warning"><i
                                    className="fas fa-edit"></i></Link>
                                <a href="javascript:void(0)" className="btn btn-danger"
                                   onClick={() => onDelete(coupon.id)}><i className="fas fa-trash"></i></a>
                            </div>
                        </td>
                    </tr>
                )
            })
        );
    }

    return (
        <div className="content-header">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title text-uppercase">Coupons list</h3>
                                </div>

                                <div className="card-body table-responsive">
                                    <table className="table table-striped text-nowrap">
                                        <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Company Name</th>
                                            <th>Code</th>
                                            <th>Price</th>
                                            <th>Available Usages</th>
                                            <th>Used</th>
                                            <th>Is Percentage</th>
                                            <th>Is Unlimited</th>
                                            <th>Status</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {renderCoupons()}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="card-footer">
                                    <Link to={'/coupons/create'} className="btn btn-info">
                                        Create new
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {state.alertOpen && <AlertConfirm
                title={'You are deleting the coupon'}
                message={'Are you sure you want to delete the coupon?'}
                isOpen={state.alertOpen}
                onClose={onCloseAlert}
            />}
        </div>
    );
}

export default CouponList