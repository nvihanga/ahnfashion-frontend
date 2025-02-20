import { useState } from "react";
import RawMaterialStockAdd from "./rawMaterialStockOut";
import RawMaterialStockAddRecheckingList from "./rawMaterialStockOutRecheckingList";

const MainOut = () => {
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

export default MainOut;
