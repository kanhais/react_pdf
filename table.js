"use strict";

const e = React.createElement;

let data = {
  gstno: "gstno123456",
  panno: "pan123456",
  orderno: "orderno12345",
  orderdate: "1990-01-01T00:00:00",
  invoiceNo: "InvoiceNo1234",
  InvvoiceDate: "1990-01-02T00:00:00",
  InvTotal: 100.98,
  AmttoWords: "One hundered and ninty eight paisa",
  authsign: "xxxxxxxxx",
  footernotes: "footer notes",
  SellerAddr: [
    {
      companyName: "company name",
      Street1: "stree1",
      street2: "street2",
      city: "city",
      Pincode: "100001"
    }
  ],
  CustAddr: [
    {
      custerName: "customer name",
      Street1: "custstree1",
      street2: "custstreet2",
      city: "city",
      Pincode: "100001"
    }
  ],
  CustBillAddr: [
    {
      custerName: "customer name billing ",
      Street1: "cust billstree1",
      street2: "cust billstreet2",
      city: "bill city",
      Pincode: "100001"
    }
  ],
  InvData: [
    {
      slno: 1,
      Description: "test item 1",
      UnitPrice: 10.3,
      qty: 10,
      NetAmt: 103.0,
      TaxRate: "5 %",
      TaxType: "CGST",
      TaxAmt: 50.0,
      TotalAmt: 151.0
    },
    {
      slno: 2,
      Description: "test item 1",
      UnitPrice: 12.3,
      qty: 12,
      NetAmt: 103.0,
      TaxRate: "5 %",
      TaxType: "CGST",
      TaxAmt: 60.0,
      TotalAmt: 141.0
    },
    {
      slno: 3,
      Description: "test item 1",
      UnitPrice: 13.3,
      qty: 13,
      NetAmt: 103.0,
      TaxRate: "5 %",
      TaxType: "CGST",
      TaxAmt: 70.0,
      TotalAmt: 151.0
    }
  ]
};

class OrderTable extends React.Component {
  componentDidMount() {
    var w = document.getElementById("wrapper").offsetWidth;
    var h = document.getElementById("wrapper").offsetHeight;

    html2canvas(document.getElementById("wrapper")).then(canvas => {
      var img = canvas.toDataURL("image/jpeg", 1);
      var doc = new jsPDF("L", "px", [w, h]);
      doc.addImage(img, "JPEG", 0, 0, w, h);
      var string = doc.output("datauristring");
      var embed = "<embed width='100%' height='100%' src='" + string + "'/>";
      document.write(embed);
    });
  }

  render() {
    return (
      <div id="wrapper">
        <table id="main-form">
          <thead>
            <tr>
              <th className="logo-cell">Logo</th>
              <th>Tax Invoice/Bill of Supply / Cash memo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <p> Sold By (Seller's Address)</p>
                <p> Customer Name: {data.SellerAddr[0].companyName} </p>
                <p> Street1: {data.SellerAddr[0].Street1} </p>
              </td>
              <td>
                <p> Customer Billing Address</p>
                <p> Customer Name: {data.CustAddr[0].companyName} </p>
                <p> Street1: {data.CustAddr[0].Street1} </p>
              </td>
            </tr>
            <tr>
              <td className="cell-with-table">
                <table className="inner-table">
                  <tbody>
                    <tr>
                      <td>GST NO</td>
                      <td>{data.gstno}</td>
                    </tr>
                    <tr>
                      <td>PAN NO</td>
                      <td>{data.panno}</td>
                    </tr>
                    <tr>
                      <td>ORDER NO</td>
                      <td>{data.orderno}</td>
                    </tr>
                    <tr>
                      <td>ORDER DATE</td>
                      <td>{new Date(data.orderdate).toDateString()}</td>
                    </tr>
                    <tr>
                      <td>INVOICE NO</td>
                      <td>{data.invoiceNo}</td>
                    </tr>
                    <tr>
                      <td>INVOICE DATE</td>
                      <td>{new Date(data.InvvoiceDate).toDateString()}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td>
                <p> Customer Shipping Address </p>
                <p> Customer Name: {data.CustBillAddr[0].custerName} </p>
                <p> Street1: {data.CustBillAddr[0].Street1} </p>
              </td>
            </tr>
          </tbody>
        </table>
        <table id="sub-form">
          <tbody>
            <tr>
              <td>Sr No</td>
              <td>Description</td>
              <td>UnitPrice</td>
              <td>Quantity</td>
              <td>Net Amount</td>
              <td>Tax Rate</td>
              <td>Tax Type</td>
              <td>Tax Amount</td>
              <td>Total Amount</td>
            </tr>
            {data.InvData.map(d => {
              return (
                <tr>
                  <td>{d.slno}</td>
                  <td>{d.Description}</td>
                  <td>{d.UnitPrice}</td>
                  <td>{d.qty}</td>
                  <td>{d.NetAmt}</td>
                  <td>{d.TaxRate}</td>
                  <td>{d.TaxType}</td>
                  <td>{d.TaxAmt}</td>
                  <td>{d.TotalAmt}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div id="amount-in-words-wrapper">
          <span>Amount in Words: </span>
          <span>{data.AmttoWords}</span>
        </div>
      </div>
    );
  }
}

var domContainer = document.getElementById("root");
ReactDOM.render(<OrderTable />, domContainer);
