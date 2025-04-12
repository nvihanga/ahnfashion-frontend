import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import DialogBox from "./dialogBox";
import { getRawMaterials, getSuppliers } from "../../api/rawmaterial/api";
import Toast from "../../common/Toast";
import Select from "react-select";
import { addPurchaseOrder } from "../../api/purchase-order/api";

function InvoiceInformation() {
  const [dialogBoxOpen, setDialogBoxOpen] = useState(false);
  const [supplierOptions, setSupplierOptions] = useState([]);
  const [productNameOptions, setProductNameOptions] = useState([]);

  const [invoiceItems, setInvoiceItems] = useState([
    { id: 1, rawId: "", unitPrice: 0, units: 1, totalCost: 0 },
  ]);

  const [toast, setToast] = useState({
    open: false,
    severity: "success",
    message: "",
  });
  const handleCloseToast = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  const [errors, setErrors] = useState({
    invoiceNo: "",
    date: "",
    supplier: "",
    items: "",
  });

  const validateForm = () => {
    const newErrors = {
      invoiceNo: "",
      date: "",
      supplier: "",
      items: "",
    };

    let isValid = true;

    if (!invoiceDetails.invoiceNo.trim()) {
      newErrors.invoiceNo = "Invoice number is required";
      isValid = false;
    }

    if (!invoiceDetails.date) {
      newErrors.date = "Date is required";
      isValid = false;
    }

    if (!invoiceDetails.supplier) {
      newErrors.supplier = "Supplier is required";
      isValid = false;
    }

    const hasValidItem = invoiceItems.some(
      (item) => item.rawId && item.units > 0 && item.unitPrice > 0
    );
    if (!hasValidItem) {
      newErrors.items = "At least one item with valid details is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await getSuppliers();
        console.log("Suppliers response:", response);

        setToast({
          open: true,
          severity: "success",
          message: "Suppliers fetched successfully",
        });

        setSupplierOptions(Array.isArray(response) ? response : []);
      } catch (error) {
        setToast({
          open: true,
          severity: "error",
          message:
            error.response?.data && typeof error.response.data === "object"
              ? error.response.data.errorMessage ||
                JSON.stringify(error.response.data)
              : error.response?.data ||
                error.message ||
                "Failed to fetch suppliers",
        });
      }
    };
    fetchSuppliers();
  }, []);

  useEffect(() => {
    const fetchRawMaterials = async () => {
      try {
        const response = await getRawMaterials();

        setToast({
          open: true,
          severity: "success",
          message: "Raw materials fetched successfully",
        });

        setProductNameOptions(
          Array.isArray(response.data) ? response.data : []
        );
      } catch (error) {
        setToast({
          open: true,
          severity: "error",
          message:
            error.response?.data && typeof error.response.data === "object"
              ? error.response.data.errorMessage ||
                JSON.stringify(error.response.data)
              : error.response?.data ||
                error.message ||
                "Failed to fetch raw materials",
        });
      }
    };
    fetchRawMaterials();
  }, []);

  const [invoiceDetails, setInvoiceDetails] = useState({
    invoiceNo: "",
    date: new Date().toISOString().split("T")[0], // Format: YYYY-MM-DD
    supplier: "",
  });

  const subTotal = invoiceItems.reduce(
    (sum, item) => sum + (item.totalCost || 0),
    0
  );
  const grandTotal = subTotal;

  const formattedSupplierOptions = supplierOptions.map((supplier) => ({
    value: supplier.supplierId,
    label: supplier.supplierName,
  }));

  const formattedRawMaterialOptions = productNameOptions.map((product) => ({
    value: product.rawId,
    label: product.rawName,
    price: product.rawPrice,
  }));

  const handleItemChange = (id, field, value) => {
    setInvoiceItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item };

          if (field === "rawId") {
            const selectedValue = value ? value.value : "";
            updatedItem[field] = selectedValue;

            if (value) {
              updatedItem.unitPrice = value.price;
              updatedItem.totalCost = value.price * updatedItem.units;
            }
          } else {
            updatedItem[field] = value;
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
          }
          return updatedItem;
        }
        return item;
      })
    );
  };

  const addNewItem = () => {
    const newId =
      invoiceItems.length > 0
        ? Math.max(...invoiceItems.map((item) => item.id)) + 1
        : 1;
    setInvoiceItems([
      ...invoiceItems,
      { id: newId, rawId: "", unitPrice: 0, units: 1, totalCost: 0 },
    ]);
  };

  const removeItem = (id) => {
    if (invoiceItems.length > 1) {
      setInvoiceItems(invoiceItems.filter((item) => item.id !== id));
    } else {
      setInvoiceItems([
        { id: 1, rawId: "", unitPrice: 0, units: 1, totalCost: 0 },
      ]);
    }
  };

  const handleCancelClick = () => {
    setInvoiceItems([
      { id: 1, rawId: "", unitPrice: 0, units: 1, totalCost: 0 },
    ]);

    setInvoiceDetails({
      invoiceNo: "",
      date: "",
      supplier: null,
    });

    setErrors({
      invoiceNo: "",
      date: "",
      supplier: "",
      items: "",
    });

    setDialogBoxOpen(false);
  };

  const handleDetailsChange = (field, value) => {
    if (field === "supplier") {
      setInvoiceDetails({
        ...invoiceDetails,
        [field]: value ? value.value : "",
      });
    } else if (field === "date") {
      setInvoiceDetails({
        ...invoiceDetails,
        date: value || new Date().toISOString().split("T")[0],
      });
    } else {
      setInvoiceDetails({ ...invoiceDetails, [field]: value });
    }
  };

  async function handleCreate() {
    if (!validateForm()) {
      setToast({
        open: true,
        severity: "error",
        message: "Please fill in all required fields",
      });
      return;
    }

    const formattedInvoice = {
      invoiceNumber: invoiceDetails.invoiceNo,
      supplierId: parseInt(invoiceDetails.supplier),
      purchaseOrderDate: new Date(
        invoiceDetails.date + "T00:00:00"
      ).toISOString(),
      purchaseOrderTotal: grandTotal,
      purchaseOrderItems: invoiceItems.map((item) => ({
        rawId: item.rawId ? Number(item.rawId) : null,
        rawUnitPrice: parseFloat(item.unitPrice),
        rawUnits: parseFloat(item.units),
        itemTotal: item.totalCost,
      })),
    };

    try {
      const response = await addPurchaseOrder(formattedInvoice);
      console.log("Purchase order created:", response);
      setToast({
        open: true,
        severity: "success",
        message: "Purchase order created successfully",
      });
      handleCancelClick();
    } catch (error) {
      console.error("Error creating purchase order:", error);
      setToast({
        open: true,
        severity: "error",
        message:
          error.response?.data?.errorMessage ||
          error.message ||
          "Failed to create purchase order",
      });
    }
  }

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6 px-5">Add New Purchase Order</h1>

      <div className="bg-blue-50 py-6 rounded-lg mb-8 px-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block font-medium mb-2">
              Purchase Order No <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={`w-full p-2 border rounded ${
                errors.invoiceNo ? "border-red-500" : ""
              }`}
              value={invoiceDetails.invoiceNo}
              onChange={(e) => handleDetailsChange("invoiceNo", e.target.value)}
            />
            {errors.invoiceNo && (
              <p className="text-red-500 text-sm mt-1">{errors.invoiceNo}</p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-2">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              className={`w-full p-2 border rounded ${
                errors.date ? "border-red-500" : ""
              }`}
              value={invoiceDetails.date}
              onChange={(e) => handleDetailsChange("date", e.target.value)}
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date}</p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-2">
              Supplier <span className="text-red-500">*</span>
            </label>
            <Select
              className={`w-full ${errors.supplier ? "border-red-500" : ""}`}
              value={formattedSupplierOptions.find(
                (option) => option.value === invoiceDetails.supplier
              )}
              onChange={(value) => handleDetailsChange("supplier", value)}
              options={formattedSupplierOptions}
              isClearable
              placeholder="Search supplier..."
            />
            {errors.supplier && (
              <p className="text-red-500 text-sm mt-1">{errors.supplier}</p>
            )}
          </div>
        </div>
      </div>

      <div className="mb-4 px-5">
        <div className="grid grid-cols-12 gap-4 font-medium py-2 border-b">
          <div className="col-span-1"></div>
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
              <Select
                className="w-full"
                value={formattedRawMaterialOptions.find(
                  (option) => option.value === item.rawId
                )}
                onChange={(value) => handleItemChange(item.id, "rawId", value)}
                options={formattedRawMaterialOptions}
                isClearable
                placeholder="Search item..."
              />
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
        {errors.items && (
          <p className="text-red-500 text-sm mt-2">{errors.items}</p>
        )}
      </div>

      <div className="flex flex-col items-end mb-6 font-bold">
        <div className="w-full max-w-xs">
          <div className="flex justify-between py-2">
            <span>Sub Total:</span>
            <span>{subTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-24">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleCreate}
        >
          Create Invoice
        </button>
        <button
          className="px-6 py-2 bg-red-400 text-white rounded"
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
      <Toast
        open={toast.open}
        handleClose={handleCloseToast}
        severity={toast.severity}
        message={toast.message}
      />
    </div>
  );
}

export default InvoiceInformation;
