import { MultiSelect } from "primereact/multiselect";
import { useEffect, useState } from "react";

const FormSecondRow = ({
  handleInputChange,
  stateDD,
  formErrors,
  candDetails,
  candNames,
  selectedDetails,
  selectedStateT,
  formFields,
  citiesT,
  citiesC,
  listingNames,
  selectedStateC,
  setFormFields,
  docid,
  visitedSteps,
  setVisitedSteps,
}) => {
  const [selectedFranchises, setSelectedFranchises] = useState([]);

  useEffect(() => {
    if (
      docid &&
      !visitedSteps.candprofile &&
      formFields?.franchiseInterested?.length > 0 &&
      listingNames?.length > 0
    ) {
      const parsedFranchises = JSON.parse(formFields.franchiseInterested);
      const selectedData = listingNames.filter((listNames) =>
        parsedFranchises.includes(listNames.docId)
      );
      setSelectedFranchises(selectedData);
    }
  }, [
    docid,
    visitedSteps.candprofile,
    formFields?.franchiseInterested,
    listingNames,
  ]);

  useEffect(() => {
    if (selectedFranchises.length > 0 && visitedSteps.candprofile) {
      const franchisesIds = selectedFranchises.map((fr) => fr.docId);
      console.log(franchisesIds);

      setFormFields((prev) => ({
        ...prev,
        franchiseInterested: JSON.stringify(franchisesIds),
      }));
    }
  }, [selectedFranchises]);

  return (
    <div id="second-row" className="py-5 w-full">
      <h1 className="candidate-sub-heading">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-9"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
          />
        </svg>
        Requested Territory
      </h1>

      <div id="third-sub-row" className="candidate-two-col">
        <div className="candidate-sub-childs" id="franInt">
          <p className="candidate-label">
            What franchise are you interested in?*
          </p>

          {listingNames?.length > 0 ? (
            <>
              <MultiSelect
                value={selectedFranchises}
                onChange={(e) => {
                  setVisitedSteps((prev) => ({ ...prev, candprofile: true }));
                  setSelectedFranchises(e.value);
                }}
                options={listingNames}
                optionLabel="name"
                filter
                placeholder="Select a franchise"
                className=" candidate-select w-full flex  "
              />
              {/* <select
                name="franchiseInterested"
                className="candidate-select w-full"
                style={{
                  borderColor: formErrors.franchiseInterested
                    ? "red"
                    : undefined,
                }}
                onChange={handleInputChange}
                value={formFields.franchiseInterested || ""} // Set the value of the select box
              >
                <option value="" hidden={formFields.franchiseInterested}>
                  Select a franchise
                </option>
                {listingNames
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((item) => (
                    <option
                      key={item.docId} // Add a unique key for each option
                      value={item.docId}
                      {...(candNames
                        ? candNames.length > 0
                          ? { selected: selectedDetails?.franchiseInterested }
                          : { selected: candDetails?.franchiseInterested }
                        : { selected: formFields?.franchiseInterested })}
                    >
                      {item.name}
                    </option>
                  ))}
              </select> */}
            </>
          ) : (
            <h1>Loading...</h1>
          )}
        </div>

        <div className="candidate-sub-childs">
          <p className="candidate-label">
            {" "}
            Requested Territory Zip / Postal Code*
          </p>
          <input
            type="tel"
            name="territoryZipcode"
            className="candidate-input w-full"
            style={{
              borderColor: formErrors.territoryZipcode ? "red" : undefined,
            }}
            onChange={handleInputChange}
            {...(candNames
              ? candNames.length > 0
                ? { value: selectedDetails?.territoryZipcode }
                : { defaultValue: candDetails?.territoryZipcode }
              : { value: formFields?.territoryZipcode })}
          />
          {formErrors?.territoryZipcode === "invalid" && (
            <p className=" text-red-600 py-2 flex justify-between">
              Invalid zipcode. It should be 5 digits long!
            </p>
          )}
        </div>
      </div>
      <div id="third-sub-row" className="candidate-two-col">
        <div className="candidate-sub-childs">
          <p className="candidate-label">
            {" "}
            Requested Territory State/Province*
          </p>

          {/* state dd */}
          {stateDD("territory")}
        </div>
        <div className="candidate-sub-childs">
          <p className="candidate-label"> Requested Territory City*</p>
          {selectedStateT && citiesT.length > 0 ? (
            <select
              className="candidate-select"
              name="territoryCity"
              onChange={handleInputChange}
              style={{
                borderColor: formErrors.territoryCity ? "red" : undefined,
              }}
            >
              {!formFields.territoryCity && (
                <option value="">Select City</option>
              )}
              {citiesT.map((city, index) => (
                <option
                  key={index}
                  value={city}
                  {...(candNames
                    ? candNames.length > 0
                      ? { selected: selectedDetails?.territoryCity }
                      : { selected: candDetails?.territoryCity }
                    : { selected: formFields?.territoryCity })}
                >
                  {city}
                </option>
              ))}
            </select>
          ) : (
            <input
              onChange={handleInputChange}
              type="text"
              name="territoryCity"
              className="candidate-input w-full"
              style={{
                borderColor: formErrors.territoryCity ? "red" : undefined,
              }}
              required
              {...(candNames
                ? candNames.length > 0
                  ? { value: selectedDetails?.territoryCity }
                  : { defaultValue: candDetails?.territoryCity }
                : { value: formFields?.territoryCity })}
            />
          )}
        </div>
      </div>

      <div id="third-sub-row" className="candidate-two-col">
        <div className="candidate-sub-childs">
          <p className="candidate-label"> Current State / Province*</p>

          {/* state dd */}
          {stateDD("current")}
        </div>
        <div className="candidate-sub-childs">
          <p className="candidate-label"> Current City*</p>
          {selectedStateC && citiesC.length > 0 ? (
            <select
              className="candidate-select"
              name="currentCity"
              onChange={handleInputChange}
              style={{
                borderColor: formErrors.currentCity ? "red" : undefined,
              }}
            >
              {!formFields.currentCity && <option value="">Select City</option>}
              {citiesC.map((city, index) => (
                <option
                  key={index}
                  value={city}
                  {...(candNames
                    ? candNames.length > 0
                      ? { value: selectedDetails?.currentCity }
                      : { defaultValue: candDetails?.currentCity }
                    : { value: formFields?.currentCity })}
                >
                  {city}
                </option>
              ))}
            </select>
          ) : (
            <input
              onChange={handleInputChange}
              type="text"
              name="currentCity"
              className="candidate-input w-full"
              style={{
                borderColor: formErrors.currentCity ? "red" : undefined,
              }}
              required
              {...(candNames
                ? candNames.length > 0
                  ? { value: selectedDetails?.currentCity }
                  : { defaultValue: candDetails?.currentCity }
                : { value: formFields?.currentCity })}
            />
          )}
        </div>
      </div>
      <div id="third-sub-row" className="candidate-two-col">
        <div className="candidate-sub-childs">
          <p className="candidate-label"> Current Zip / Postal Code*</p>
          <input
            type="tel"
            name="currentZipcode"
            className="candidate-input w-full"
            style={{
              borderColor: formErrors.currentZipcode ? "red" : undefined,
            }}
            onChange={handleInputChange}
            {...(candNames
              ? candNames.length > 0
                ? { value: selectedDetails?.currentZipcode }
                : { defaultValue: candDetails?.currentZipcode }
              : { value: formFields?.currentZipcode })}
          />
          {formErrors?.currentZipcode === "invalid" && (
            <p className=" text-red-600 py-2 flex justify-between">
              Invalid zipcode. It should be 5 digits long!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormSecondRow;
