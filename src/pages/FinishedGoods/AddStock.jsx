
import FinishedGoodStockAdd from "../../components/finished-good/stock/finishedGoodStockAdd";
import FinishedGoodStockAddRecheckingList from "../../components/finished-good/stock/finishedGoodStockAddRecheckingList";

const AddStock = () => {
  return (
    <div className="m-8">
      <FinishedGoodStockAdd />
      <FinishedGoodStockAddRecheckingList />
    </div>
  );
};

export default AddStock;