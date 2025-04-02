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
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
    <div className="p-8 bg-white">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-800 border-b pb-3">
          Beneficiary Account Validation
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          Enter details of the beneficiary you would like to pre-validate
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Request ID */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Request ID
            </label>
            <Input
              type="text"
              name="requestId"
              value={formData.requestId}
              onChange={handleChange}
              className="w-full bg-gray-50 border-gray-200"
              placeholder="Enter request ID"
            />
          </div>

          {/* UETR */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              UETR
            </label>
            <Input
              type="text"
              name="uetr"
              value={formData.uetr}
              onChange={handleChange}
              className="w-full bg-gray-50 border-gray-200"
              placeholder="Enter UETR"
            />
          </div>

          {/* Creditor Account */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Creditor Account
            </label>
            <Input
              type="text"
              name="creditorAccount"
              value={formData.creditorAccount}
              onChange={handleChange}
              className="w-full bg-gray-50 border-gray-200"
              placeholder="Enter account number"
            />
          </div>

          {/* Creditor Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Creditor Name
            </label>
            <Input
              type="text"
              name="creditorName"
              value={formData.creditorName}
              onChange={handleChange}
              className="w-full bg-gray-50 border-gray-200"
              placeholder="Enter creditor name"
            />
          </div>

          {/* Creditor Agent */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Creditor Agent
            </label>
            <Input
              type="text"
              name="creditorAgent"
              value={formData.creditorAgent}
              onChange={handleChange}
              className="w-full bg-gray-50 border-gray-200"
              placeholder="Enter creditor agent"
            />
          </div>

          {/* Creditor Address - Full Width */}
          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Creditor Address
            </label>
            <textarea
              name="creditorAddress"
              value={formData.creditorAddress}
              onChange={handleChange}
              rows={2}
              className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder="Enter full address"
            />
          </div>

          {/* Validation Source */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Validation Source
            </label>
            <div className="bg-gray-50 border border-gray-200 rounded-md p-3 space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="swift"
                  name="validationSource"
                  value="swift"
                  checked={formData.validationSource === "swift"}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary"
                />
                <label htmlFor="swift" className="ml-2 text-sm text-gray-700">
                  SWIFT Central Account
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
                  className="h-4 w-4 text-primary"
                />
                <label
                  htmlFor="exclusive"
                  className="ml-2 text-sm text-gray-700"
                >
                  Exclusively with Beneficiary Bank
                </label>
              </div>
            </div>
          </div>

          {/* Select Context */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Select Context
            </label>
            <div className="bg-gray-50 border border-gray-200 rounded-md p-3 space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="benr"
                  name="context"
                  value="benr"
                  checked={formData.context === "benr"}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary"
                />
                <label htmlFor="benr" className="ml-2 text-sm text-gray-700">
                  <span className="font-medium">BENR:</span> Beneficiary
                  registration
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
                  className="h-4 w-4 text-primary"
                />
                <label htmlFor="paym" className="ml-2 text-sm text-gray-700">
                  <span className="font-medium">PAYM:</span> Payment initiation
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
                  className="h-4 w-4 text-primary"
                />
                <label htmlFor="rfpp" className="ml-2 text-sm text-gray-700">
                  <span className="font-medium">RFPP:</span> Payment request
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm font-medium"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary text-sm font-medium"
          >
            Validate
          </button>
        </div>
      </form>
    </div>
  );
};

export default BeneficiaryValidationForm;
