import React, { createRef, useEffect, useRef } from "react";
import "./MultiSelectDropdown.css";
import { checkArrayType } from "../utils/utilMethods";

export default function MultiselectCheckbox({ options, onFinalSubmit }) {
  const [data, setData] = React.useState(options);
  const [allChecked, setAllChecked] = React.useState(false);
  const myRefs = useRef([]);
  const [simpleSelectArray, setSimpleSelectArray] = React.useState([]);

  const toggle = (item, ref) => {
    if (checkArrayType(item)) {
      data.map((_, key) => {
        if (data[key].title === item.title) data[key].checked = !item.checked;
      });
      if (item.checked == false) {
        setAllChecked(false);
      }
      setData([...data]);
    } else {
      if (ref.target.checked) {
        setSimpleSelectArray((simpleSelectArray) => [
          ...simpleSelectArray,
          item,
        ]);
      } else {
        setSimpleSelectArray((simpleSelectArray) =>
          simpleSelectArray.filter((val) => val !== item)
        );
        setAllChecked(false);
      }
    }
  };

  const checkAll = () => {
    setAllChecked((allChecked) => (allChecked = !allChecked));
    if (checkArrayType(options[0])) {
      data.map((item, key) => {
        if (allChecked) {
          if (data[key].title === item.title) data[key].checked = false;
        } else {
          if (data[key].title === item.title) data[key].checked = true;
        }
      });
      setData([...data]);
    } else {
      if (allChecked) {
        setSimpleSelectArray([]);
      } else {
        setSimpleSelectArray([...options]);
      }
    }
  };

  const clearOptions = () => {
    setAllChecked(false);
    if (checkArrayType(options[0])) {
      data.map((item, key) => {
        if (data[key].title === item.title) data[key].checked = false;
      });
      setData([...data]);
    } else {
      setSimpleSelectArray([]);
    }
  };
  const onSubmit = () => {
    if (checkArrayType(options[0])) {
      onFinalSubmit(data);
    } else {
      onFinalSubmit(simpleSelectArray);
    }
  };

  return (
    <div className="multi-wrapper">
      <div className="all-select">
        <input
          readOnly
          type="checkbox"
          checked={allChecked}
          className="styled-checkbox"
          id="styled-checkbox-all"
          onClick={() => checkAll()}
        />
        <label for="styled-checkbox-all">Select All</label>
      </div>
      <ul className="list-container">
        {options.map((item, i) => {
          if (checkArrayType(item)) {
            return (
              <li
                key={item.title}
                className={`${item.checked ? "checked-item" : ""} item-style`}
              >
                <input
                  readOnly
                  type="checkbox"
                  checked={item.checked || false}
                  className="styled-checkbox"
                  id={`styled-checkbox-${i}`}
                  onClick={() => toggle(item)}
                />
                <label for={`styled-checkbox-${i}`}>{item.title}</label>
              </li>
            );
          } else {
            return (
              <li
                key={item}
                className={`${
                  simpleSelectArray.includes(item) ? "checked-item" : ""
                } item-style`}
              >
                <input
                  readOnly
                  type="checkbox"
                  checked={simpleSelectArray.includes(item) || false}
                  className="styled-checkbox"
                  ref={myRefs.current[i]}
                  id={`styled-checkbox-${i}`}
                  onClick={(ref) => toggle(item, ref)}
                />
                <label for={`styled-checkbox-${i}`}>{item}</label>
              </li>
            );
          }
        })}
      </ul>
      <div className="buttons-container">
        <button className="btn clear-btn" onClick={clearOptions}>
          Clear
        </button>
        <button className="btn submit-btn" onClick={onSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}
