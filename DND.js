import React, { useState } from "react";
import { render } from "react-dom";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";

const SortableItem = SortableElement(({ values, columns, index }) => {
  const renderInfo = columns.map(({ id, Cell, ...props }, cellInd) =>
    Cell ? (
      <td
        class="dnd_table__cell"
        key={`cell-${index}-${cellInd}`}
        style={props}
      >
        {Cell({ id, props, value: values[id] })}
      </td>
    ) : (
      <td
        class="dnd_table__cell"
        key={`cell-${index}-${cellInd}`}
        style={props}
      >
        {values[id]}
      </td>
    )
  );
  return <tr>{renderInfo}</tr>;
});

const SortableList = SortableContainer(({ columns, items, ...props }) => {
  return (
    <tbody class="dnd_table__body">
      {items.map((values, index) => (
        <SortableItem
          key={`item-${index}`}
          index={index}
          values={values}
          columns={columns}
          {...props}
        />
      ))}
    </tbody>
  );
});

const DNDTable = ({ data, onChange, columns, ...props }) => {
  const onSortEnd = ({ oldIndex, newIndex }) => {
    onChange(arrayMove(data, oldIndex, newIndex));
  };

  const onSortStart = ({ node, ...props }) => {
    console.log(node);
    
    console.log(props);
    return node
  };

  return (
    <table class="dnd_table">
      <thead>
        <tr>
          {columns.map(({ name, ...props }, ind) => (
            <th class={`dnd_table__header`} style={props} key={ind}>
              {name}
            </th>
          ))}
        </tr>
      </thead>
      <SortableList
        items={data}
        onSortEnd={onSortEnd}
        onSortStart={onSortStart}
        columns={columns}
        {...props}
      />
    </table>
  );
};

const App = () => {
  const columns = [
    {
      id: "id1",
      name: "Item 1",
      minWidth: 100
    },
    {
      id: "id2",
      name: "Item 2",
      Cell: ({ value }) => <button>{value}</button>,
      minWidth: 200
    },
    {
      id: "id3",
      name: "Item 3",
      minWidth: 100,
      Cell: ({ value }) => value()
    },
    {
      id: "id4",
      name: "Item 4",
      minWidth: 100,
      Cell: ({ value }) => Math.random(value)
    }
  ];
  const [stateData, setStateData] = useState([
    { id1: 1, id2: "button1", id3: () => console.log("1"), id4: 20 },
    { id1: 2, id2: "button2", id3: () => console.log("2") },
    { id1: 3, id2: "button3", id3: () => console.log("3") },
    { id1: 4, id2: "button4", id3: () => console.log("4") }
  ]);

  return (
    <DNDTable
      columns={columns}
      data={stateData}
      disabled={false}
      onChange={setStateData}
    />
  );
};

render(<App />, document.getElementById("root"));
