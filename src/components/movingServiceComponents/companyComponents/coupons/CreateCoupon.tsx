import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {addCoupon, getCouponDetails} from "../../../../services/movingServiceServices/companyServices/CouponService";
import {Coupon} from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/ICoupons";
import {getMsCompanyId} from "../../../../config";

const CreateCoupon = () => {
    const [state, setState] = useState({
        coupon: {} as Coupon,
        companyId: 0,
        loading: false,
        hasError: false,
    });

    let navigate = useNavigate();

    useEffect(() => {
        const __init = async () => {
            const companyId = await getMsCompanyId();

            setState({...state, companyId, loading: false});
        }

        __init();

    }, []);

    const onInputChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state, coupon: {
                ...state.coupon, [key]: value
            }
        })
    }

    const onCheckboxChange = (key: string, val: any) => {
        setState({
            ...state,
            coupon: {
                ...state.coupon,
                [key]: val.target.checked ? Boolean(1) : Boolean(0)
            }
        });
    };

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

    const onCreate = async () => {
        setState({...state, hasError: false});

        if (
            !state.companyId ||
            !state.coupon.price
        ){
            setState({
                ...state,
                hasError: true
            })

            return;
        }

        if (!state.hasError){

            const data = {
                company_id: state.companyId,
                code: state.coupon.code,
                price: state.coupon.price,
                available_usages: state.coupon.available_usages,
                is_percentage: state.coupon.is_percentage ? state.coupon.is_percentage : 0,
                is_unlimited: state.coupon.is_unlimited ? state.coupon.is_unlimited : 0,
            }
            const res = await addCoupon(data);

            if (res) {
                navigate('/coupons');
            }
        }
    };

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
                                            <input type="text"
                                                   className={`form-control ${state.hasError && !state.coupon.price ? 'is-invalid' : ''}`}
                                                   id="price"
                                                   placeholder="0"
                                                   onChange={(val: any) => onInputChange('price', val)}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="code" className="col-sm-3 col-form-label">Code</label>
                                        <div className="col-sm-9">
                                            <input type="text"
                                                   className={`form-control ${state.hasError && !state.coupon.code ? 'is-invalid' : ''}`}
                                                   id="code"
                                                   placeholder=""
                                                   onChange={(val: any) => onInputChange('code', val)}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="available_usages" className="col-sm-3 col-form-label">Available
                                            Usages</label>
                                        <div className="col-sm-9">
                                            <input type="text"
                                                   className={`form-control ${state.hasError && !state.coupon.available_usages ? 'is-invalid' : ''}`}
                                                   id="available_usages"
                                                   placeholder="0"
                                                   onChange={(val: any) => onInputChange('available_usages', val)}/>
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

                                    <div className="form-group row">
                                        <label htmlFor="is_percentage" className="col-sm-3 col-form-label">Is
                                            Unlimited?</label>
                                        <div className="col-sm-9">
                                            <div className="form-check flex align-items-center">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id="is_percentage"
                                                    checked={state.coupon.is_unlimited}
                                                    onChange={(val: any) => onCheckboxChange('is_unlimited', val)}
                                                />
                                                <label className="form-check-label" htmlFor="is_percentage">Yes</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-footer">
                                    <button type="submit" className="btn btn-info" onClick={onCreate}>
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

export default CreateCoupon