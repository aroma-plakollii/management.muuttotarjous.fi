import {Link, useParams, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getCouponDetails, saveCouponDetails} from "../../../../services/movingServiceServices/companyServices/CouponService";
import {Coupon} from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/ICoupons";
import {Loader} from "../../../../views/Loader";
import {getMsCompanyId} from "../../../../config";

const EditCoupon = () => {
    const [state, setState] = useState({
        coupon: {} as Coupon,
        companyId: 0,
        hasError: false,
        loading: true,
    });

    let { id } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        const __init = async () => {
            const coupon = await getCouponDetails(id);
            const companyId = await getMsCompanyId();
            setState({...state, coupon, companyId, loading: false});
        }

        __init();

    }, []);

    const onInputChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state, coupon: {
                ...state.coupon,
                [key]: value
            }
        })
    }

    const onSelectChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state,
            coupon: {
                ...state.coupon,
                [key]: value
            }
        });
    };

    const onCheckboxChange = (key: string, val: any) => {
        setState({
            ...state,
            coupon: {
                ...state.coupon,
                [key]: val.target.checked ? Boolean(1) : Boolean(0)
            }
        });
    };

    const onSave = async (id: any) => {

        const data = {
            price: state.coupon.price,
            is_percentage: state.coupon.is_percentage,
            status: state.coupon.status,
        }

        const res = await saveCouponDetails(id, data);

        if (res) {
            setState({...state, loading: false});
            navigate('/coupons');
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
                                <h3 className="card-title text-uppercase">Coupon Details</h3>
                            </div>

                            <div className="form-horizontal">
                                <div className="card-body">

                                    <div className="form-group row">
                                        <label htmlFor="price" className="col-sm-3 col-form-label">Price</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control`} id="price"
                                                   placeholder="John"
                                                   onChange={(val: any) => onInputChange('price', val)}
                                                   defaultValue={state.coupon.price}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="is_percentage" className="col-sm-3 col-form-label">Is
                                            Percentage?</label>
                                        <div className="col-sm-9">
                                            <div className="form-check flex align-items-center">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id="is_percentage"
                                                    checked={state.coupon.is_percentage}
                                                    onChange={(val: any) => onCheckboxChange('is_percentage', val)}
                                                />
                                                <label className="form-check-label" htmlFor="is_percentage">Yes</label>
                                            </div>
                                        </div>
                                    </div>

                                    {!state.coupon.status ? "" : <div className="form-group row">
                                        <label htmlFor="status" className="col-sm-3 col-form-label">Status</label>
                                        <div className="col-sm-9">
                                            <select
                                                name="status"
                                                id="status"
                                                className={`form-control`}
                                                onChange={(val: any) => onSelectChange('status', val)}
                                                value={state.coupon.status}
                                            >
                                                <option value={true.toString()}>Active</option>
                                                <option value={false.toString()}>Inactive</option>
                                            </select>
                                        </div>
                                    </div>}

                                </div>

                                <div className="card-footer">
                                    <button type="submit" className="btn btn-info" onClick={() => onSave(id)}>
                                        {state.loading ? 'Saving...' : 'Save changes'}
                                    </button>
                                    <Link to={'/coupons'} className="btn btn-default float-right">Cancel</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default EditCoupon;