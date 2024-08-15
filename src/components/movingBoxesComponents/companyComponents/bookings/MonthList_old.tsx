import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {getMbCompanyId} from "../../../../config";
import moment from "moment";
import {changeStatus, getBookingsByMonth} from "../../../../services/movingBoxesServices/companyServices/BookingService";
import AlertConfirm from "../shared/AlertConfirm";

const MonthList = () => {
    const [state, setState] = useState({
        date: moment().format('YYYY-MM-DD'),
        bookings: [],
        loading: false,
        isDeleted: false,
        statusUpdated: false,
        itemStatus: {
            id: 0,
            status: ''
        }
    });

    const [alertConfirm, setAlertConfirm] = useState<boolean>(false);

    useEffect(()=> {
        const __init = async () => {
            const data = {
                company_id: getMbCompanyId(),
                date: state.date
            }
            const bookings = await getBookingsByMonth(data);

            setState({...state, bookings, statusUpdated: false})
        }

        __init()
    },[state.isDeleted, state.statusUpdated]);

    const getDate = (date: any) => {
        return moment(date).format('DD.MM.YYYY')
    };

    const onChangeStatus = (id: number, status: string) => {
        setAlertConfirm(true)
        setState({
            ...state, itemStatus: {
                ...state.itemStatus,
                id, status
            }
        })
    }

    const updateStatus = async (confirm: any) => {
        if (confirm === 'confirm'){
            const res = await changeStatus({id: state.itemStatus.id, progress_status: state.itemStatus.status});

            if (res){
                setAlertConfirm(false)
                setState({...state, statusUpdated: true})
            }
        }
        else {
            setAlertConfirm(false)
        }
    }

    const renderBookings = () => {
        return (
            state.bookings.map((item: any) => (
                <div key={item.id} className={'card p-3 m-3 d-flex flex-row align-items-center'}>
                    <div className={'container-fluid'}>
                        <div className={'row'}>
                            <div className={'col-md-1'}>
                                {
                                    item.progress_status === 'to-deliver' &&
                                    <i style={{cursor: 'pointer'}}
                                       className="fas fa-arrow-up text-info"
                                       onClick={() => onChangeStatus(item.id, item.progress_status)}></i>
                                }
                                {
                                    item.progress_status === 'to-collect' &&
                                    <i style={{cursor: 'pointer'}}
                                       className="fas fa-arrow-down text-warning"
                                       onClick={() => onChangeStatus(item.id, item.progress_status)}></i>
                                }
                                {
                                    item.progress_status === 'done' &&
                                    <i style={{cursor: 'pointer'}}
                                       className="fas fa-check-circle text-success"></i>
                                }
                            </div>
                            <div className={'col-md-2'}>
                                {item.progress_status === 'to-deliver' && getDate(item.start_date)}
                                {item.progress_status === 'to-collect' && getDate(item.end_date)}

                                <p className={'text-muted'}>{item.booking_number}</p>
                            </div>
                            <div className={'col-md-2'}>{item.first_name} {item.last_name}</div>
                            <div className={'col-md-4'}>{item.progress_status === 'to-deliver' ? item.start_address : item.end_address} &nbsp;</div>
                            <div className={'col-md-1'}>{item.phone}</div>
                            <div className={'col-md-1'}>{item.quantity}</div>
                            <div className={'col-md-1 text-end'}>
                                {/*<a className="fas fa-edit text-warning" style={{cursor: 'pointer'}}></a>*/}
                                <Link to={`/bookings/${item.id}`} className="fas fa-edit text-warning"></Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))
        );
    }

    return (
        <div className="content-header">
            <div className={'container-fluid'}>
                <div className={'row'}>
                    <div className={'col-md-12'}>
                        <h3 className="card-title m-3">Month List</h3>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">

                        {renderBookings()}

                        {
                            alertConfirm &&
                            <AlertConfirm
                                message={'Are you sure you want to update the status?'}
                                id={state.itemStatus.id}
                                type={state.itemStatus.status}
                                isOpen={alertConfirm}
                                onClose={updateStatus}
                            />
                        }

                        {/*<div className="card">*/}
                        {/*    <div className="card-header">*/}
                        {/*        <h3 className="card-title">Month List</h3>*/}
                        {/*        <div className="card-tools">*/}
                        {/*            <div className="input-group input-group-sm">*/}
                        {/*                <input type="text" name="table_search" className="form-control float-right"*/}
                        {/*                       placeholder="Search"/>*/}
                        {/*                    <div className="input-group-append">*/}
                        {/*                        <button type="submit" className="btn btn-default">*/}
                        {/*                            <i className="fas fa-search"></i>*/}
                        {/*                        </button>*/}
                        {/*                    </div>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}

                        {/*    /!*<div className="card-body table-responsive p-0">*!/*/}
                        {/*    /!*    <table className="table table-hover text-nowrap">*!/*/}
                        {/*    /!*        <thead>*!/*/}
                        {/*    /!*        <tr>*!/*/}
                        {/*    /!*            <th>Status</th>*!/*/}
                        {/*    /!*            <th>Date / Booking No.</th>*!/*/}
                        {/*    /!*            <th>Name</th>*!/*/}
                        {/*    /!*            <th>Address</th>*!/*/}
                        {/*    /!*            <th>Phone</th>*!/*/}
                        {/*    /!*            <th>Quantity</th>*!/*/}
                        {/*    /!*            <th></th>*!/*/}
                        {/*    /!*        </tr>*!/*/}
                        {/*    /!*        </thead>*!/*/}
                        {/*    /!*        <tbody>*!/*/}
                        {/*    /!*            {renderPrices()}*!/*/}
                        {/*    /!*        </tbody>*!/*/}
                        {/*    /!*    </table>*!/*/}
                        {/*    /!*</div>*!/*/}

                        {/*    {renderPrices()}*/}

                        {/*    {*/}
                        {/*        alertConfirm &&*/}
                        {/*        <AlertConfirm*/}
                        {/*            type={'delete'}*/}
                        {/*            message={'Are you sure you want to delete'}*/}
                        {/*            itemId={1}*/}
                        {/*            isOpen={alertConfirm}*/}
                        {/*            onClose={onDeleteConfirm}*/}
                        {/*        />*/}
                        {/*    }*/}

                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MonthList;