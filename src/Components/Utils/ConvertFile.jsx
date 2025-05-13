  
  import Papa from "papaparse";
  
  
  // Function to generate and download CSV
  export const handleCSVFile = (data, filename) => {
    const csvString = Papa.unparse(data);
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to generate and download a text file
  export const handleTextFile = (text, filename) => {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


   // Function to normalize different data formats into a consistent structure
   export const normalizeData = (data) => {
    if (!Array.isArray(data)) return null;
    return data.map((item) => {
      if (item.toAccount) {
        // Format 2
        return {
          AccountNumber: item.toAccount.accNumber,
          IFSC: item.toAccount.ifscCode,
          BankName: item.toAccount.bankName,
          AccountName: item.toAccount.accName,
          Amount: item.reqAmount,
          Mobile: item.mobile,
          Date: item.reqDate,
          WithdrawalMode: item.withdrawalMode,
        };
  
      } else if (item.destinationAcNumber) {
        // Format 1
        return {
          AccountNumber: item.destinationAcNumber,
          IFSC: item.destinationIfscCode,
          BankName: item.destinationBankName,
          AccountName: item.destinationAccName,
          Amount: item.amount,
          WithdrawalMode:item?.withdrawalMode,
          PaymentType: item.paymentType,
          SourceNarration: item.sourceNarration,
          Narration:item?.destinationNarration,
          Currency: item.currency,
          SourceAccountNumber:item?.sourceAccountNumber,
          BeneficiaryAccountType:item?.beneficiaryAccountType,
          Email: item.email,
        };
      } else if (item.clientAcount) {
        // Format 4
        return {
          AccountNumber: item.clientAcount,
          IFSC: item.ifscCode,
          AccountName: item.customerAccount,
          Amount: item.amount,
          Currency: item.currency,
          ParentAccount: item.parentAcountNo,
          Type: item.type,
        };
      }
      return item; // Handle as-is for unknown formats
    });
  };