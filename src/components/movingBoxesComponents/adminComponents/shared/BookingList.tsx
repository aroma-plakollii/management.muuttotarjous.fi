import BookingListItem from "./BookingListItem";

interface IBookingListProps {
    bookings: any[],
    updateStatus?: any
}

const BookingList = (props: IBookingListProps) => {
    const renderBookings = () => {
        return (
            props.bookings.map((item: any) => (
                <BookingListItem updateStatus={props.updateStatus} booking={item} key={item.id}/>
            ))
        );
    }

    return (
        <div className="content-header">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        {renderBookings()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookingList