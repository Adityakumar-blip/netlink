import { Input } from "@/components/ui/input";
import React, { useState } from "react";

const BeneficiaryValidationForm = () => {
  const [formData, setFormData] = useState({
    requestId: "",
    validationSource: "swift",
    creditorAccount: "",
    creditorName: "",
    creditorAddress: "",
    creditorAgent: "",
    context: "benr",
    uetr: "",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "radio") {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your validation logic here
  };

  const handleReset = () => {
    setFormData({
      requestId: "",
      validationSource: "swift",
      creditorAccount: "",
      creditorName: "",
      creditorAddress: "",
      creditorAgent: "",
      context: "benr",
      uetr: "",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Beneficiary Account Validation
      </h1>

      <p className="text-xl text-gray-700 mb-6">
        Enter Details of the Beneficiary you would like to pre validate.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border rounded-md overflow-hidden">
          {/* Request ID */}
          <div className="bg-gray-50 p-4 flex items-center font-medium">
            Request ID
          </div>
          <div className="col-span-2 p-2">
            <Input
              type="text"
              name="requestId"
              value={formData.requestId}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          {/* Validation Source */}
          <div className="bg-gray-50 p-4 flex items-center font-medium">
            Validation Source
          </div>
          <div className="col-span-2 p-2 space-y-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="swift"
                name="validationSource"
                value="swift"
                checked={formData.validationSource === "swift"}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600"
              />
              <label htmlFor="swift" className="ml-2 text-gray-700">
                SWIFT Central Account statistics or Beneficiary Banks
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="exclusive"
                name="validationSource"
                value="exclusive"
                checked={formData.validationSource === "exclusive"}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600"
              />
              <label htmlFor="exclusive" className="ml-2 text-gray-700">
                Exclusively with Beneficiary Bank
              </label>
            </div>
          </div>

          {/* Creditor Account */}
          <div className="bg-gray-50 p-4 flex items-center font-medium">
            Creditor Account
          </div>
          <div className="col-span-2 p-2">
            <Input
              type="text"
              name="creditorAccount"
              value={formData.creditorAccount}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          {/* Creditor Name */}
          <div className="bg-gray-50 p-4 flex items-center font-medium">
            Creditor Name
          </div>
          <div className="col-span-2 p-2">
            <Input
              type="text"
              name="creditorName"
              value={formData.creditorName}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          {/* Creditor Address */}
          <div className="bg-gray-50 p-4 flex items-center font-medium">
            Creditor Address
          </div>
          <div className="col-span-2 p-2">
            <textarea
              name="creditorAddress"
              value={formData.creditorAddress}
              onChange={handleChange}
              rows={4}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            />
          </div>

          {/* Creditor Agent */}
          <div className="bg-gray-50 p-4 flex items-center font-medium">
            Creditor Agent
          </div>
          <div className="col-span-2 p-2">
            <Input
              type="text"
              name="creditorAgent"
              value={formData.creditorAgent}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          {/* Select Context */}
          <div className="bg-gray-50 p-4 flex items-center font-medium">
            Select Context
          </div>
          <div className="col-span-2 p-2 space-y-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="benr"
                name="context"
                value="benr"
                checked={formData.context === "benr"}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600"
              />
              <label htmlFor="benr" className="ml-2 text-gray-700">
                BENR : Beneficiary registration validation
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="paym"
                name="context"
                value="paym"
                checked={formData.context === "paym"}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600"
              />
              <label htmlFor="paym" className="ml-2 text-gray-700">
                PAYM : Payment initiation
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="rfpp"
                name="context"
                value="rfpp"
                checked={formData.context === "rfpp"}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600"
              />
              <label htmlFor="rfpp" className="ml-2 text-gray-700">
                RFPP : request for a payment initiation
              </label>
            </div>
          </div>

          {/* UETR */}
          <div className="bg-gray-50 p-4 flex items-center font-medium">
            UETR
          </div>
          <div className="col-span-2 p-2">
            <Input
              type="text"
              name="uetr"
              value={formData.uetr}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          {/* Buttons */}
          <div className="bg-gray-50 p-4 flex items-center"></div>
          <div className="col-span-2 p-2 flex space-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Validate
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Reset
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BeneficiaryValidationForm;
