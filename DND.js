import React, { useState } from "react";
import { render } from "react-dom";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";

const SortableItem = SortableElement(({ values, columns, index }) => {
  const renderInfo = columns.map(({ id, Cell, ...props }, cellInd) => 
  Cell ? <td key={`cell-${index}-${cellInd}`}> {Cell(values[id], props)} </td> :
   <td key={`cell-${index}-${cellInd}`}>{values[id]}</td>)
  return (
    <tr>
      {renderInfo}
    </tr>
  );
});

const SortableList = SortableContainer(({ columns, items }) => {
  return (
    <tbody>
      {items.map((values, index) => (
        <SortableItem
          key={`item-${index}`}
          index={index}
          values={values}
          columns={columns}
        />
      ))}
    </tbody>
  );
});

const DNDTable = ({ data, onChange, columns }) => {
  const onSortEnd = ({ oldIndex, newIndex }) => {

    onChange(arrayMove(data, oldIndex, newIndex));
  };

  return (
    <table>
      <thead>
        <tr>
          {columns.map(({ name }, ind) => (
            <th key={ind}>{name}</th>
          ))}
        </tr>
      </thead>
      <SortableList items={data} onSortEnd={onSortEnd} columns={columns} />
    </table>
  );
};

const App = () => {
  const columns = [
    { id: "pdp1", name: "Item 1", minWidth: 100 },
    { id: "pdp2", name: "Item 2", Cell: id => <button>{id}</button> },
    { id: "pdp3", name: "Item 3" }
  ];
  const data = [
    { pdp1: 20, pdp2: 30, pdp3: 40 },
    { pdp1: 21, pdp2: 31, pdp3: 41 },
    { pdp1: 22, pdp2: 32, pdp3: 42 },
    { pdp1: 23, pdp2: 33, pdp3: 43 }
  ];
  const [stateData, setStateData] = useState([
    { pdp1: 20, pdp2: 30, pdp3: 40 },
    { pdp1: 21, pdp2: 31, pdp3: 41 },
    { pdp1: 22, pdp2: 32, pdp3: 42 },
    { pdp1: 23, pdp2: 33, pdp3: 43 }
  ]);
  console.log(stateData)
  return (
    <DNDTable columns={columns} data={stateData} onChange={setStateData} />
  );
};

render(<App />, document.getElementById("root"));
