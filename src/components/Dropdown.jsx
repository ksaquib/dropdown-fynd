import React, { useState, useEffect } from "react";
import MultiselectCheckbox from "./MultiSelectDropdown";
import Arrow from "../utils/arrow.png";
import "./Dropdown.css";
import { checkArrayType } from "../utils/utilMethods";

function Dropdown({ searchable, multiselect, options, name }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectValue, setSelectValue] = useState(name);
  const [result, setResult] = useState("");

  const editSearch = ({ target: { value } }) => {
    setSearchQuery(value);
  };

  const handleSearch = () => {
    return options.filter((x) => {
      if (typeof x === "object") {
        return (
          x.title && x.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      } else {
        return x && x.toLowerCase().includes(searchQuery.toLowerCase());
      }
    });
  };
  const onSubmit = (data) => {
    let dropOptions;
    if (checkArrayType(data[0])) {
      dropOptions = data
        .filter((item) => item.checked)
        .map((val) => val.title)
        .join(", ");
    } else {
      dropOptions = data.join(", ");
    }
    setResult(`${selectValue} - ${dropOptions}`);
  };
  const selectChange = (e) => {
    setResult(`${selectValue} - ${e.target.value}`);
  };
  return (
    <>
      <div className="main-select">
        <p className="heading">Default</p>
        <select
          style={{
            background: `url(${Arrow}) 96% / 5% no-repeat rgb(255, 255, 255)`,
          }}
        >
          <option value="grapefruit">{name}</option>
        </select>
      </div>
      <div className="dropdown-checkbox">
        <p className="heading">Dropdown</p>
        {searchable && (
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={editSearch}
          />
        )}

        {multiselect ? (
          <MultiselectCheckbox
            options={handleSearch()}
            onChange={(data) => {
              console.log(data);
            }}
            onFinalSubmit={onSubmit}
          />
        ) : (
          <div>
            <select
              style={{
                background: `url(${Arrow}) 96% / 5% no-repeat rgb(255, 255, 255)`,
              }}
              onChange={selectChange}
            >
              <option value="" readonly="true" hidden="true" selected>
                Select a value
              </option>
              ;
              {handleSearch().map((val) => {
                if (typeof val === "object") {
                  return <option value={val.title}>{val.title}</option>;
                } else {
                  return <option value={val}>{val}</option>;
                }
              })}
            </select>
          </div>
        )}
      </div>
      <div className="result-select">
        <p className="heading">Result</p>
        <select
          style={{
            background: `url(${Arrow}) 96% / 5% no-repeat rgb(255, 255, 255)`,
          }}
        >
          <option value={result}>{result}</option>
        </select>
      </div>
    </>
  );
}

export default Dropdown;
