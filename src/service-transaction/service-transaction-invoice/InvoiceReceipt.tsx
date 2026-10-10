import React from "react";
import formatCurrency from "../../util/formatCurrency";
import { InvoiceTransactionDto } from "./InvoiceDocument";

interface InvoiceReceiptPropType {
  transaction: InvoiceTransactionDto;
  widthMm: 80 | 58;
}

const InvoiceReceipt: React.FC<InvoiceReceiptPropType> = ({
  transaction,
  widthMm,
}) => {
  const narrow = widthMm === 58;
  const totalPrice = transaction.transactionDetails.reduce(
    (tempSum, transactionDetail) => tempSum + transactionDetail.price,
    0
  );
  const priceText = (value: number) =>
    value === 0 ? "FREE" : formatCurrency(value);

  const css = `
@page { size: ${widthMm}mm auto; margin: 0; }
html, body { margin: 0; padding: 0; background: #fff; }
.receipt {
  width: ${widthMm}mm;
  box-sizing: border-box;
  padding: ${narrow ? "3mm" : "4mm"};
  font-family: "Courier New", Courier, monospace;
  font-size: ${narrow ? "9px" : "10px"};
  color: #000;
  line-height: 1.4;
}
.receipt * { box-sizing: border-box; }
.brand { font-size: ${narrow ? "12px" : "14px"}; font-weight: bold; text-align: center; }
.title { text-align: center; letter-spacing: 2px; margin-bottom: 4px; }
.rule { border-top: 1px dashed #000; margin: 5px 0; }
.row { display: flex; gap: 4px; margin-bottom: 2px; }
.label { width: ${narrow ? "20mm" : "26mm"}; flex-shrink: 0; }
.grow { flex: 1; }
.item { margin-bottom: 4px; }
.solution { padding-left: ${narrow ? "3mm" : "4mm"}; }
.total { display: flex; justify-content: flex-end; gap: 10px; font-size: ${narrow ? "11px" : "12px"}; font-weight: bold; }
.footer { text-align: center; margin-top: 4px; }
`;

  return (
    <div className="receipt">
      <style>{css}</style>
      <div className="brand">Yonathan Co.</div>
      <div className="title">INVOICE</div>
      <div className="rule" />
      <div className="row">
        <span className="label">Customer</span>
        <span className="grow">{transaction.customerName}</span>
      </div>
      <div className="row">
        <span className="label">Phone</span>
        <span className="grow">{transaction.customerPhone}</span>
      </div>
      <div className="row">
        <span className="label">TUID</span>
        <span className="grow">{transaction.transactionCode}</span>
      </div>
      <div className="row">
        <span className="label">Date</span>
        <span className="grow">{transaction.transactionDate}</span>
      </div>
      <div className="rule" />
      {transaction.transactionDetails.map((transactionDetail, idx) => (
        <div className="item" key={idx}>
          <div className="row">
            <span className="grow">{transactionDetail.itemName}</span>
            <span>{priceText(transactionDetail.price)}</span>
          </div>
          <div className="solution">{transactionDetail.solution}</div>
        </div>
      ))}
      <div className="rule" />
      <div className="total">
        <span>TOTAL</span>
        <span>{priceText(totalPrice)}</span>
      </div>
      <div className="footer">Thank you for using our services.</div>
      <div className="footer">Best regards,</div>
    </div>
  );
};

export default InvoiceReceipt;
