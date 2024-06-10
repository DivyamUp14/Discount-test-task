import React, { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "./features/appSlice";
import { RootState } from "./app/store";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { selectedOption, discountCode, notes } = useSelector(
    (state: RootState) => state.app
  );

  //Actions to store data to global app state
  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFormData({ name: "selectedOption", value: e.target.value }));
  };

  const handleDiscountCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFormData({ name: "discountCode", value: e.target.value }));
  };

  const handleNotesChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setFormData({ name: "notes", value: e.target.value }));
  };

  //This generates a string with 6 uppercase characters followed by 3 numbers.
  const generateRandomCode = (): string => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    for (let i = 0; i < 3; i++) {
      code += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    return code;
  };

  //New generated code is not stores in app state
  const generateDiscountCode = () => {
    const newCode = generateRandomCode();
    alert(newCode);
  };

  //Validating the discount code to be of format 6 characters and 3 integers
  const validateDiscountCode = (code: string): boolean => {
    const pattern = /^[A-Z]{6}\d{3}$/;
    return pattern.test(code);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Select an Option</h2>
        <div>
          {["Option A", "Option B", "Option C"].map((option) => (
            <label key={option} className="inline-flex items-center mr-4">
              <input
                type="radio"
                className="form-radio"
                name="options"
                value={option}
                checked={selectedOption === option}
                onChange={handleOptionChange}
              />
              <span className="ml-2">{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Enter Discount Code</h2>
        <input
          type="text"
          className={`form-input mt-1 block w-full border rounded ${
            !validateDiscountCode(discountCode) && discountCode
              ? "border-red-500"
              : "border-gray-600"
          }`}
          value={discountCode}
          onChange={handleDiscountCodeChange}
        />
        {discountCode && !validateDiscountCode(discountCode) && (
          <p className="text-red-500">Invalid discount code</p>
        )}
      </div>

      <div className="mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={generateDiscountCode}
        >
          Generate Discount Code
        </button>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Notes</h2>
        <textarea
          className="form-textarea mt-1 block w-full border rounded border-gray-600"
          rows={3}
          value={notes}
          onChange={handleNotesChange}
        />
      </div>
    </div>
  );
};

export default App;
