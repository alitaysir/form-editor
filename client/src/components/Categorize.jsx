import React, { useState, useContext } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AppContext } from "../context/AppContext";


const ItemType = {
  CATEGORY: "CATEGORY",
  ITEM: "ITEM",
};

const DraggableElement = ({ id, index, text, moveElement, type, onDelete, onChange }) => {
  const [, ref] = useDrag({ type, item: { id, index } });
  const [, drop] = useDrop({
    accept: type,
    hover: (dragged) => {
      if (dragged.index !== index) {
        moveElement(dragged.index, index, type);
        dragged.index = index;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))} style={{ display: "flex", margin: "5px 0", padding: "10px", backgroundColor: "#f9f9f9", borderRadius: "5px" }}>
      <input
        type="text"
        value={text}
        onChange={(e) => onChange(id, e.target.value)}
        style={{ flexGrow: 1, marginRight: "10px", backgroundColor: "#d3d3d3", color: "black", padding: "5px", border: "1px solid #ccc", borderRadius: "3px" }}
      />
      <button onClick={() => onDelete(id)}>X</button>
    </div>
  );
};

const Categorize = () => {
  const { categorizeVal, setCategorizeVal } = useContext(AppContext);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);

  const addCategory = () => setCategories([...categories, { id: Date.now(), name: "" }]);
  const addItem = () => setItems([...items, { id: Date.now(), name: "", category: "" }]);

  const moveElement = (fromIndex, toIndex, type) => {
    const list = type === ItemType.CATEGORY ? [...categories] : [...items];
    const [moved] = list.splice(fromIndex, 1);
    list.splice(toIndex, 0, moved);
    type === ItemType.CATEGORY ? setCategories(list) : setItems(list);
  };

  const updateCategoryName = (id, name) =>
    setCategories(categories.map((cat) => (cat.id === id ? { ...cat, name } : cat)));

  const updateItem = (id, field, value) =>
    setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));

  const saveData = () => {
    const data = {
      desc: description,
      cat: categories.map((cat) => cat.name),
      // itm: items.map((item) => ({ name: item.name, category: item.category })),
      itm: items.map((item) => item.name),

    };
    setCategorizeVal(data);
    console.log(categorizeVal)
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
        <h2 className="text-2xl font-semibold">Categorize Component</h2>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: "100%", marginTop: "5px", backgroundColor: "#d3d3d3", color: "black", padding: "5px", border: "1px solid #ccc", borderRadius: "3px" }}
          />
        </div>
        <h3>Categories:</h3>
        {categories.map((cat, index) => (
          <DraggableElement
            key={cat.id}
            id={cat.id}
            index={index}
            text={cat.name}
            moveElement={moveElement}
            type={ItemType.CATEGORY}
            onDelete={(id) => setCategories(categories.filter((c) => c.id !== id))}
            onChange={updateCategoryName}
          />
        ))}
        <button onClick={addCategory} className="bg-blue-100 rounded px-2 py-1">+ Category</button>
        <h3>Items:</h3>
        {items.map((item, index) => (
          <div key={item.id} style={{ display: "flex", margin: "5px 0", padding: "10px", backgroundColor: "#f9f9f9", borderRadius: "5px" }}>
            <input
              type="text"
              value={item.name}
              placeholder="Item Name"
              onChange={(e) => updateItem(item.id, "name", e.target.value)}
              style={{ flexGrow: 1, marginRight: "10px", backgroundColor: "#d3d3d3", color: "black", padding: "5px", border: "1px solid #ccc", borderRadius: "3px" }}
            />
            <input
              type="text"
              value={item.category}
              placeholder="Category"
              onChange={(e) => updateItem(item.id, "category", e.target.value)}
              style={{ flexGrow: 1, marginRight: "10px", backgroundColor: "#d3d3d3", color: "black", padding: "5px", border: "1px solid #ccc", borderRadius: "3px" }}
            />
            <button onClick={() => setItems(items.filter((i) => i.id !== item.id))}>X</button>
          </div>
        ))}
        <button onClick={addItem} className="bg-blue-100 rounded px-2 py-1">+ Item</button>
        <button onClick={saveData} style={{ display: "block", marginTop: "20px", backgroundColor: "#007BFF", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
          className="px-2 py-1 text-white">
          Save
        </button>
      </div>
    </DndProvider>
  );
};

export default Categorize;
