import React from "react";
import GRNDetails from "../../components/purchase-order/GRNList/grnDetails";
import GRNTable from "../../components/purchase-order/GRNList/GRNTable";
import Header from "../../components/purchase-order/GRNList/header";
import Pagination from "../../components/purchase-order/GRNList/pagination";
import PaymentModal from "../../components/purchase-order/GRNList/paymentModel";
import SearchBar from "../../components/purchase-order/GRNList/searchBar";

const GRNList = () => {
  return (
    <div>
      <GRNDetails />
      <GRNTable />
      <Header />
      <Pagination />
      <PaymentModal />
      <SearchBar />
    </div>
  );
};

export default GRNList;
