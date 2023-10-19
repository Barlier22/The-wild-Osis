import BookingDetail from "../features/bookings/BookingDetail";

/* The Page folder it where we have pages file where we 
     A page file doesn't have a fetching not a logic not any side effet.
     only it does is present the component to ui! 

    All the fecting, the logic and side-effect is feactures folder related to that pages   
   only the presentational compoment the component only show there is not logic there.
*/

function Booking() {
  return <BookingDetail />;
}

export default Booking;
