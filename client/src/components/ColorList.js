import React, { useState } from "react";
import axios from "axios";
import AxiosAuth from "../Utils/AxiosAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};
const initialNew ={
  color:"",
  code: { hex: ""},
  id:Date.now()
}

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [adding, setAdding] = useState(false);
  const [addState, setAddState] = useState(initialNew);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();

    AxiosAuth().put(`/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(res =>{
      console.log("Update Color Success: ",res);
      updateColors()
    })
    .catch(err =>{
      console.log("update Color ERROR: ",err);
    })
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    AxiosAuth().delete(`/api/colors/${color.id}`)
    .then(res =>{
      console.log("Delete Color success: ",res);
      updateColors();
    })
    .catch(err =>{
      console.log("Delete color ERROR: ",err);
    })
  };

  const addSubmit = ev =>{
    ev.preventDefault();

    AxiosAuth().post(`/api/colors`, addState)
    .then(res =>{
      console.log(res);
      updateColors();
    })
    .catch(err =>{
      console.log(err);
    })
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      {!adding && (<button onClick={() => setAdding(true)}>Add new Color</button>)}
      {adding &&(
        <form onSubmit={addSubmit}>
          <label>
            color name:
            <input
              onChange={e =>
                setAddState({ ...addState, color: e.target.value })
              }
              value={addState.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setAddState({
                  ...addState,
                  code: { hex: e.target.value }
                })
              }
              value={addState.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">Add</button>
            <button onClick={() => setAdding(false)}>cancel</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ColorList;
