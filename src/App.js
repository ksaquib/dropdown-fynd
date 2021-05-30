import "./index.css";
import Dropdown from "./components/Dropdown";
import { Colors, Components } from "./utils/data";
import { useRef, useState } from "react";
import "./App.css";
export default function App() {
  const [multiselect, setMultiselect] = useState(true);
  const [searchable, setSearchable] = useState(true);

  const multiRef = useRef();
  const searchRef = useRef();

  return (
    <div className="App">
      <ul className="optionalCheckBox">
        <li>
          <input
            type="checkbox"
            id="multiselect"
            name="multiselect"
            value="multiselect"
            ref={multiRef}
            onClick={(ref) => {
              setMultiselect(ref.target.checked);
            }}
            checked={multiselect}
          />
          <label for="multiselect">Multi Select</label>
        </li>
        <li>
          <input
            type="checkbox"
            id="searchable"
            name="searchable"
            ref={searchRef}
            value="searchable"
            onClick={(ref) => {
              setSearchable(ref.target.checked);
            }}
            checked={searchable}
          />
          <label for="multiselect">Searchable</label>
        </li>
      </ul>
      <h3 style={{ marginBottom: "0px" }}>Dropdown with Search</h3>
      <Dropdown
        searchable={searchable}
        multiselect={multiselect}
        options={Components}
        name="Components"
      />
    </div>
  );
}
