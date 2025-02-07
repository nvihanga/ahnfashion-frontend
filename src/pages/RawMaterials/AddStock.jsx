import RawMaterialStockAdd from "../../components/raw-material/stock/rawMaterialStockAdd";
import RawMaterialStockAddRecheckingList from "../../components/raw-material/stock/rawMaterialStockAddRecheckingList";

const AddStock = () => {
  return (
    <div className="m-8">
      <RawMaterialStockAdd />
      <RawMaterialStockAddRecheckingList />
    </div>
  );
};

export default AddStock;
