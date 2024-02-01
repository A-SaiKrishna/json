import { useState } from "react";
import { v4 as uuid4 } from "uuid";
import { useEffect } from "react";
const Each = ({ updateKey, updateValue, id, deleteKeyValue }) => {
  let [subKey, setSubKey] = useState("");
  let [subValue, setSubValue] = useState("");
  let [childSub, setChildSub] = useState([]);
  function updateSubKey(id, subKey) {
    setChildSub(
      childSub.map((eachKeyValue) => {
        if (eachKeyValue.id === id) {
          return { ...eachKeyValue, key: subKey };
        }
        return eachKeyValue;
      })
    );
  }
  function updateSubValue(id, subValue) {
    setChildSub(
      childSub.map((eachKeyValue) => {
        if (eachKeyValue.id === id) {
          return { ...eachKeyValue, value: subValue };
        }
        return eachKeyValue;
      })
    );
  }
  function deleteSubKeyValue(id) {
    setChildSub(
      childSub.filter((eachKeyValue) => {
        return eachKeyValue.id != id;
      })
    );
  }
  useEffect(() => {
    updateValue(
      id,
      childSub.reduce((ans, each1) => {
        if (each1.key != "" && each1.value != "") ans[each1.key] = each1.value;
        return ans;
      }, {})
    );
    // console.log(
    //   childSub.reduce((ans, each1) => {
    //     if (each1.key != "" && each1.value != "") ans[each1.key] = each1.value;
    //     return ans;
    //   }, {})
    // );
  }, [childSub]);

  return (
    <div style={{ marginLeft: "2rem" }}>
      <input
        placeholder="key :"
        value={subKey}
        onChange={(e) => {
          setSubKey(e.target.value);
          updateKey(id, e.target.value);
        }}
      ></input>
      <input
        placeholder="value  :"
        value={subValue}
        onChange={(e) => {
          setSubValue(e.target.value);
          updateValue(id, e.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          setChildSub([...childSub, { id: uuid4(), key: "", value: "" }]);
          // console.log("hi");
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          deleteKeyValue(id);
        }}
      >
        X
      </button>
      <div style={{ marginLeft: "2rem" }}>
        {childSub.map((eachObj) => {
          return (
            <Each
              key={eachObj.id}
              id={eachObj.id}
              updateKey={updateSubKey}
              updateValue={updateSubValue}
              deleteKeyValue={deleteSubKeyValue}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Each;
