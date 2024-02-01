import { useState } from "react";
import Each from "./Each";
import { v4 as uuid4 } from "uuid";

let App = () => {
  let [json, setJson] = useState("");
  let [key, setKey] = useState("");
  let [value, setValue] = useState("");
  let [childSub, setChildSub] = useState([]);
  function updateKey(id, subKey) {
    setChildSub(
      childSub.map((eachKeyValue) => {
        if (eachKeyValue.id === id) {
          return { ...eachKeyValue, key: subKey };
        }
        return eachKeyValue;
      })
    );
  }
  function updateValue(id, subValue) {
    setChildSub(
      childSub.map((eachKeyValue) => {
        if (eachKeyValue.id === id) {
          return { ...eachKeyValue, value: subValue };
        }
        return eachKeyValue;
      })
    );
  }
  function deleteKeyValue(id) {
    setChildSub(
      childSub.filter((eachKeyValue) => {
        return eachKeyValue.id != id;
      })
    );
  }
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="key  :"
          value={key}
          onChange={(e) => {
            setKey(e.target.value);
          }}
        ></input>
        <input
          type="text"
          placeholder="value  :"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        ></input>
        <button
          onClick={() => {
            setChildSub([...childSub, { id: uuid4(), key: "", value: "" }]);
          }}
        >
          +
        </button>
      </div>
      <div>
        {childSub.map((eachObj) => {
          return (
            <Each
              key={eachObj.id}
              id={eachObj.id}
              updateKey={updateKey}
              updateValue={updateValue}
              deleteKeyValue={deleteKeyValue}
            />
          );
        })}
      </div>
      <button
        style={{ marginTop: "40px" }}
        onClick={() => {
          let sub = {};

          console.log("hi");
          sub = childSub.reduce((ans, each1) => {
            if (each1.key != "" && each1.value != "")
              ans[each1.key] = each1.value;
            return ans;
          }, {});
          // console.log(sub);
          // sub = JSON.stringify(sub);
          let result = { [key]: value };
          if (childSub.length != 0) result = { [key]: { ...sub } };
          setJson(JSON.stringify(result));
          // setKey("");
          // setValue("");
        }}
      >
        Get Json
      </button>
      <div>{json}</div>
    </>
  );
};
export default App;
