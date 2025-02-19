import { CgCreditCard } from "react-icons/cg";
import { IoIosPeople } from "react-icons/io";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { MdOutlinePaid } from "react-icons/md";

function TotalDetails() {
  return (
    <>
      <div>
        <div>
          <div>Suppliers</div>
          <div>
            <IoIosPeople />
          </div>
          <div>100</div>
        </div>
        <div>
          <div>Invoices</div>
          <div>
            <LiaFileInvoiceSolid />
          </div>
          <div>200</div>
        </div>
        <div>
          <div>Paid</div>
          <div>
            <MdOutlinePaid />
          </div>
          <div>Rs.21233300</div>
        </div>
        <div>
          <div>Unpaid</div>
          <div>
            <CgCreditCard />
          </div>
          <div>Rs.25100</div>
        </div>
      </div>
    </>
  );
}

export default TotalDetails;
