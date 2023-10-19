/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

import { getCabins } from "../../services/apiCabins";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function CabinTable() {
  // load the data for the cabin feature
  const { isLoading, cabins } = useCabins();

  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  // For filtering

  const filterValue = searchParams.get("discount") || "all";

  let arrayFilted;
  if (filterValue === "all") arrayFilted = cabins;

  if (filterValue === "no-discount")
    arrayFilted = cabins.filter((chambre) => chambre.discount === 0);

  if (filterValue === "with-discount")
    arrayFilted = cabins.filter((chambre) => chambre.discount > 0);

  // Fort  sorting

  const sortBy = searchParams.get("sortBy") || "name-asc";

  let sortedArrayCabin;
  const [field, direction] = sortBy.split("-");

  const modifier = direction === "asc" ? 1 : -1;

  // if (field === "name")
  //   sortedArrayCabin = arrayFilted.sort(
  //     (a, b) => a[field].localeCompare(b[field]) * modifier
  //   );

  sortedArrayCabin = arrayFilted.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  // const arra = [
  //   { nam: "lisa" },
  //   { nam: "bazza" },
  //   { nam: "aris" },
  //   { nam: "kadima" },
  // ];
  // arra.sort((a, b) => a.nam.localeCompare(b.nam));
  // console.log(arra);

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          // data={cabins}
          // data={arrayFilted}
          data={sortedArrayCabin}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
