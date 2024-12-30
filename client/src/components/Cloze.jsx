import React, { useState, useContext } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AppContext } from "../context/AppContext";

const ItemType = {
  OPTION: "OPTION",
};

const DraggableOption = ({ id, index, text, moveOption, onDelete }) => {
  const [, ref] = useDrag({ type: ItemType.OPTION, item: { id, index } });
  const [, drop] = useDrop({
    accept: ItemType.OPTION,
    hover: (dragged) => {
      if (dragged.index !== index) {
        moveOption(dragged.index, index);
        dragged.index = index;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))} style={{ display: "flex", margin: "5px 0", padding: "10px", backgroundColor: "#f9f9f9", borderRadius: "5px" }}>
      <input
        type="text"
        value={text}
        readOnly
        style={{ flexGrow: 1, marginRight: "10px", backgroundColor: "#d3d3d3", color: "black", padding: "5px", border: "1px solid #ccc", borderRadius: "3px" }}
      />
      <button onClick={() => onDelete(id)}>X</button>
    </div>
  );
};

const Cloze = () => {
  const { clozeVal, setclozeVal } = useContext(AppContext);
  const [sentence, setSentence] = useState("");
  const [options, setOptions] = useState([]);
  const [underlinedSentence, setUnderlinedSentence] = useState("");

  const handleWordSelect = (word) => {
    if (!options.find((opt) => opt.text === word)) {
      const updatedOptions = [...options, { id: Date.now(), text: word }];
      setOptions(updatedOptions);

      const wordsToUnderline = updatedOptions.map((opt) => opt.text);
      const updatedSentence = sentence
        .split(" ")
        .map((word) => (wordsToUnderline.includes(word) ? "<u>_____</u>" : word))
        .join(" ");

      setUnderlinedSentence(updatedSentence);
    }
  };

  const moveOption = (fromIndex, toIndex) => {
    const updatedOptions = [...options];
    const [moved] = updatedOptions.splice(fromIndex, 1);
    updatedOptions.splice(toIndex, 0, moved);
    setOptions(updatedOptions);
  };

  const deleteOption = (id) => {
    const deletedOption = options.find((opt) => opt.id === id);
    const updatedOptions = options.filter((opt) => opt.id !== id);
    setOptions(updatedOptions);

    const wordsToUnderline = updatedOptions.map((opt) => opt.text);
    const updatedSentence = sentence
      .split(" ")
      .map((word) => (wordsToUnderline.includes(word) ? "<u>_____</u>" : word))
      .join(" ");

    setUnderlinedSentence(updatedSentence);
  };

  const saveData = () => {
    const blanksSentence = sentence
      .split(" ")
      .map((word) => (options.map((opt) => opt.text).includes(word) ? "_____" : word))
      .join(" ");

    const data = {
      sentence: blanksSentence,
      options: options.map((opt) => opt.text),
    };

    setclozeVal(data);
    console.log(clozeVal)
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
        <h2 className="text-2xl font-semibold">Cloze Component</h2>
        <div style={{ marginBottom: "20px" }}>
          <label>Sentence:</label>
          <input
            type="text"
            value={sentence}
            onChange={(e) => {
              setSentence(e.target.value);
              setUnderlinedSentence(e.target.value);
            }}
            style={{ width: "100%", marginTop: "5px", backgroundColor: "#d3d3d3", color: "black", padding: "5px", border: "1px solid #ccc", borderRadius: "3px" }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>Underlined Sentence:</label>
          <div
            style={{ width: "100%", padding: "10px",  borderRadius: "5px", border: "1px solid #ccc" }}
            className="bg-blue-100"
            dangerouslySetInnerHTML={{ __html: underlinedSentence }}
          ></div>
        </div>
        <h3>Options:</h3>
        {options.map((opt, index) => (
          <DraggableOption
            key={opt.id}
            id={opt.id}
            index={index}
            text={opt.text}
            moveOption={moveOption}
            onDelete={deleteOption}
            className="bg-blue-100"
          />
        ))}
        <div style={{ marginBottom: "20px" }}>
          <label>Click on words in the sentence to select as options:</label>
          <div style={{ marginTop: "10px" }}>
            {sentence.split(" ").map((word, index) => (
              <span
                key={index}
                onClick={() => handleWordSelect(word)}
                style={{ cursor: "pointer", padding: "0 5px", textDecoration: "underline", color: "blue" }}
              >
                {word}
              </span>
            ))}
          </div>
        </div>
        <button onClick={saveData} style={{ display: "block", marginTop: "20px",  backgroundColor: "#007BFF", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
          className="px-2 py-1 text-white">
          Save
        </button>
      </div>
    </DndProvider>
  );
};

export default Cloze;
