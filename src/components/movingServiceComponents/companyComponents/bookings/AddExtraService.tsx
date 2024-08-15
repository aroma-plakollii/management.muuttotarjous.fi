import { useEffect, useState} from "react";
import {Link, useParams, useNavigate} from "react-router-dom";
import {extraService, sendPaymentEmail} from "../../../../services/movingServiceServices/companyServices/BookingService";
import AlertConfirm from "../shared/AlertConfirm";
import {IExtraService} from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/IExtraService";
const CreateCustomPrice = () => {
    const [state, setState] = useState({
        extraService: {} as IExtraService,
        id: 0,
        loading: false,
        hasError: false,
    });

    const [alertConfirm, setAlertConfirm] = useState<boolean>(false);

    let { id } = useParams();
    let navigate = useNavigate();
    const onInputChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state,
            extraService: {
                ...state.extraService,
                [key]: value
            }
            }
        )
    }

    const onSend = async (confirm: any) => {
        if (confirm === 'confirm'){
            if (
                !state.extraService.price ||
                !state.extraService.description
            ){

                setAlertConfirm(false)

                setState({
                    ...state,
                    hasError: true
                })

                return;
            }

            if (!state.hasError){
                const data = {
                    price: state.extraService.price,
                    description: state.extraService.description
                }

                const res = await extraService(data, id);

                if (res) {
                    navigate('/month');
                }
            }
        }
        else {
            setAlertConfirm(false)
        }
    };

    const onSendEmail = (id: any) => {
        setAlertConfirm(true)
        setState({
            ...state,
            id
        })
    }

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title text-uppercase">Extra Service Details</h3>
                                </div>

                                <div className="form-horizontal">
                                    <div className="card-body">

                                        <div className="form-group row">
                                            <label htmlFor="price" className="col-sm-3 col-form-label">Price</label>
                                            <div className="col-sm-9">
                                                <input type="text" className={`form-control ${state.hasError && !state.extraService.price ? 'is-invalid' : ''}`} id="price"
                                                       placeholder="00.00" onChange={(val: any) => onInputChange('price', val)} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="description" className="col-sm-3 col-form-label">Description</label>
                                            <div className="col-sm-9">
                                                <textarea className={`form-control ${state.hasError && !state.extraService.description ? 'is-invalid' : ''}`} id="description"
                                                          placeholder="Description" onChange={(val: any) => onInputChange('description', val)}/>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="card-footer">
                                    <button type="submit" className="btn btn-info" onClick={() => onSendEmail(id)}>
                                        Send Extra Service Email
                                    </button>
                                    <Link to={'/month'} className="btn btn-default float-right">Cancel</Link>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {
                alertConfirm &&
                <AlertConfirm
                    title={'You are sending the extra service payment email'}
                    message={'Are you sure you want to send the extra service payment email?'}
                    id={id}
                    type={""}
                    isOpen={alertConfirm}
                    onClose={onSend}
                />
            }
    </>
    );
}

export default CreateCustomPrice