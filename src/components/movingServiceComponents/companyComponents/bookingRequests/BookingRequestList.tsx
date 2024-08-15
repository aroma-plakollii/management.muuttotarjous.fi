import BookingRequestListItem from "./BookingRequestListItem";
import {Company} from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/ICompany"

interface IBookingRequestListProps {
    bookingRequests: any[];
    companyDetails: Company;
}

const BookingRequestList = (props: IBookingRequestListProps) => {
    const renderBookingRequests = () => {
        return (
            props.bookingRequests.map((item: any) => (
                <BookingRequestListItem bookingRequests={item} companyDetails={props.companyDetails} key={item.id}/>
            ))
        );
    }

    return (
        <div className="content-header">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        {renderBookingRequests()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookingRequestList