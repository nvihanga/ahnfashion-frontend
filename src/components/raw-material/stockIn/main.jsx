import { useState } from "react";
import RawMaterialStockAdd from "./rawMaterialStockAdd";
import RawMaterialStockAddRecheckingList from "./rawMaterialStockAddRecheckingList";

const Main = () => {
  const [stockList, setStockList] = useState([]);
  return (
    <div>
      <RawMaterialStockAdd setStockList={setStockList} stockList={stockList} />
      <RawMaterialStockAddRecheckingList
        stockList={stockList}
        setStockList={setStockList}
      />
    </div>
  );
};

export default Main;
