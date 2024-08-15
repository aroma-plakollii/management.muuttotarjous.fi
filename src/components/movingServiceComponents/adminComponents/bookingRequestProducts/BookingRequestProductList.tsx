import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {getBookingRequestProducts, deleteBookingRequestProduct} from "../../../../services/movingServiceServices/adminServices/BookingRequestProductService";
import {BookingRequestProduct} from "../../../../interfaces/movingServiceInterfaces/adminInterfaces/IBokingRequestProduct";
import AlertConfirm from "../shared/AlertConfirm"
import {Loader} from "../../../../views/Loader";

const BookingRequestProductList = () => {
    const [state, setState] = useState({
        bookingRequestProducts: [] as BookingRequestProduct[],
        loading: true,
        isDeleted: false,
        alertOpen: false,
        deleteBookingRequestProductId: 0
    });

    const __init = async () => {
        const bookingRequestProducts = await getBookingRequestProducts();
        setState({...state, bookingRequestProducts, loading: false});
    }

    const onDelete = async (id: number) => {
        setState({...state, alertOpen: true, deleteBookingRequestProductId: id});
    };

    const onCloseAlert = async (confirm: any) => {
        if (confirm === 'confirm') {
            const isDeleted = await deleteBookingRequestProduct(state.deleteBookingRequestProductId);

            if (isDeleted) {
                setState({...state, isDeleted: true, alertOpen: false, deleteBookingRequestProductId: 0});
            }
        } else if(confirm === 'cancel'){
            setState({...state, alertOpen: false, deleteBookingRequestProductId: 0});
        }
    }

    useEffect(()=> {
        __init()
    },[state.isDeleted]);

    if (state.loading) {
        return <>
            <div className="loader-container">
                <Loader color='#3642e8' width={50}/>
            </div>
        </>
    }

    const renderBookingRequestProducts = () => {
        return (
            state.bookingRequestProducts.map((bookingRequestProduct: any) => {
                return (
                    <tr key={bookingRequestProduct.id}>
                        <td>{bookingRequestProduct.id}</td>
                        <td>{bookingRequestProduct.name}</td>
                        <td>{bookingRequestProduct.description}</td>
                        <td>{bookingRequestProduct.duration}</td>
                        <td>
                            <div className="btn-group btn-group-sm">
                                <Link to={`/booking-request-products/${bookingRequestProduct.id}`} className="btn btn-warning"><i
                                    className="fas fa-edit"></i></Link>
                                <a href="javascript:void(0)" className="btn btn-danger"
                                   onClick={() => onDelete(bookingRequestProduct.id)}><i className="fas fa-trash"></i></a>
                            </div>
                        </td>
                    </tr>
                )
            })
        );
    }

    return (
        <div className="content-header">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title text-uppercase">Booking Request Product List</h3>
                            </div>

                            <div className="card-body table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Product name</th>
                                        <th>Description</th>
                                        <th>Duration</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {renderBookingRequestProducts()}
                                    </tbody>
                                </table>
                            </div>

                            <div className="card-footer">
                                <Link to={'/booking-request-products/create'} className="btn btn-info">
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

export default BookingRequestProductList;