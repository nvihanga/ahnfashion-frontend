import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import DialogBox from "./dialogBox";

function InvoiceInformation() {
  const [dialogBoxOpen, setDialogBoxOpen] = useState(false);

  const [invoiceItems, setInvoiceItems] = useState([
    { id: 1, name: "", unitPrice: 0, units: 1, totalCost: 0 },
  ]);

  const [invoiceDetails, setInvoiceDetails] = useState({
    invoiceNo: "",
    date: new Date().toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    supplier: "",
  });

  const subTotal = invoiceItems.reduce(
    (sum, item) => sum + (item.totalCost || 0),
    0
  );
  const grandTotal = subTotal;

  const handleItemChange = (id, field, value) => {
    setInvoiceItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };

          // Recalculate total cost if unit price or units change
          if (field === "unitPrice" || field === "units") {
            const unitPrice =
              field === "unitPrice"
                ? Number.parseFloat(value) || 0
                : Number.parseFloat(item.unitPrice) || 0;
            const units =
              field === "units"
                ? Number.parseFloat(value) || 0
                : Number.parseFloat(item.units) || 0;
            updatedItem.totalCost = unitPrice * units;
          }

          return updatedItem;
        }
        return item;
      })
    );
  };

  //cancel function eka hadanna ona. eka run wenna ona dialog box eke yes ebuwama thiyana state siyalla initial state ekata enna ona.

  const addNewItem = () => {
    const newId =
      invoiceItems.length > 0
        ? Math.max(...invoiceItems.map((item) => item.id)) + 1
        : 1;
    setInvoiceItems([
      ...invoiceItems,
      { id: newId, name: "", unitPrice: 0, units: 1, totalCost: 0 },
    ]);
  };

  const removeItem = (id) => {
    if (invoiceItems.length > 1) {
      setInvoiceItems(invoiceItems.filter((item) => item.id !== id));
    } else {
      // If it's the last item, just clear it instead of removing
      setInvoiceItems([
        { id: 1, name: "", unitPrice: 0, units: 1, totalCost: 0 },
      ]);
    }
  };

  const handleCancelClick = () => {
    setInvoiceItems([
      { id: 1, name: "", unitPrice: 0, units: 1, totalCost: 0 },
    ]);
    setInvoiceDetails({
      invoiceNo: "",
      date: new Date().toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      supplier: "",
    });
    setDialogBoxOpen(false);
  };

  const handleDetailsChange = (field, value) => {
    setInvoiceDetails({ ...invoiceDetails, [field]: value });
  };

  function handleCreate() {
    const invoice = {
      ...invoiceDetails,
      items: invoiceItems,
      subTotal: subTotal,
      grandTotal: grandTotal,
    };
    console.log(invoice);
  }

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6 px-5">Add New Invoice Details</h1>

      <div className="bg-blue-50 py-6 rounded-lg mb-8 px-5 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block font-medium mb-2">Invoice No </label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={invoiceDetails.invoiceNo}
              onChange={(e) => handleDetailsChange("invoiceNo", e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Date</label>
            <input
              type="date"
              className="w-full p-2 border rounded"
              value={invoiceDetails.date}
              onChange={(e) => handleDetailsChange("date", e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Supplier</label>
            <select
              className="w-full p-2 border rounded"
              value={invoiceDetails.supplier}
              onChange={(e) => handleDetailsChange("supplier", e.target.value)}
            >
              <option value="Kamal">Kamal</option>
              <option value="Jhon">John</option>
              <option value="Doe">Doe</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mb-4 px-5">
        <div className="grid grid-cols-12 gap-4 font-medium py-2 border-b">
          <div className="col-span-5">Item Name</div>
          <div className="col-span-2">Unit Price</div>
          <div className="col-span-2">Units</div>
          <div className="col-span-2">Total Cost</div>
          <div className="col-span-1">Actions</div>
        </div>

        {invoiceItems.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-12 gap-4 items-center py-2 border-b"
          >
            <div className="col-span-1">
              <button
                onClick={addNewItem}
                className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full"
              >
                <Plus size={18} />
              </button>
            </div>
            <div className="col-span-4">
              <div className="text-xs text-gray-500">Item Name</div>
              <select
                className="w-full p-2 border rounded"
                value={item.name}
                onChange={(e) =>
                  handleItemChange(item.id, "name", e.target.value)
                }
              >
                <option value="Buttons" selected>
                  Buttons
                </option>
                <option value="Treads">Treads</option>
                <option value="Fabrics">Fabrics</option>
              </select>
            </div>

            <div className="col-span-2">
              <div className="text-xs text-gray-500">Unit Price</div>
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={item.unitPrice}
                onChange={(e) =>
                  handleItemChange(item.id, "unitPrice", e.target.value)
                }
              />
            </div>

            <div className="col-span-2">
              <div className="text-xs text-gray-500">Units</div>
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={item.units}
                onChange={(e) =>
                  handleItemChange(item.id, "units", e.target.value)
                }
              />
            </div>
            <div className="col-span-2">
              <div className="text-xs text-gray-500">Total Cost</div>
              <div className="p-2">{item.totalCost}</div>
            </div>
            <div className="col-span-1">
              <button
                onClick={() => removeItem(item.id)}
                className="w-8 h-8 flex items-center justify-center text-red-500 rounded-full"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-end mb-6">
        <div className="w-full max-w-xs">
          <div className="flex justify-between py-2">
            <span>Sub Total:</span>
            <span>{subTotal}</span>
          </div>
          <div className="flex justify-between py-2 font-bold">
            <span>Grand Total:</span>
            <span>{grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-full"
          onClick={handleCreate}
        >
          Create Invoice
        </button>
        <button
          className="px-6 py-2 bg-red-400 text-white rounded-full"
          onClick={() => setDialogBoxOpen(true)}
        >
          Cancel
        </button>
      </div>

      <DialogBox
        openProp={dialogBoxOpen}
        onCloseProp={() => setDialogBoxOpen(false)}
        handleCancelProp={() => handleCancelClick()}
      />
    </div>
  );
}

export default InvoiceInformation;
