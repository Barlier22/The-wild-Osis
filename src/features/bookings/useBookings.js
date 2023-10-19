import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constaint";

/* We use this hooks to make filtering on the server side. This means  the data send by the Api will alrady be filtering.
   On the another hand filtering in the client side means api send all the data then we filtered it 
*/

export function useBookings() {
  const queryClient = useQueryClient("");
  const [searchParams] = useSearchParams();

  // filtering!
  const filteredValue = searchParams.get("status");
  const filter =
    !filteredValue || filteredValue === "all"
      ? null
      : { field: "status", value: filteredValue, method: "eq" };

  // sorting on server side.
  const sortBycol = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortBycol.split("-");
  const sortBy = { field, direction };

  // PIGINATION on the server.
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // query
  const {
    isLoading,
    // data: bookings,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    /* if filter changes refeched again the data */
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings(filter, sortBy, page),
  });

  // prefetching!
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings(filter, sortBy, page + 1),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings(filter, sortBy, page - 1),
    });

  return { isLoading, bookings, error, count };
}
