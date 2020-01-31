import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";


const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, history }) => {
 console.log("colorlist props", history)
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/api/colors/${colors.id}`, colorToEdit)
      .then(res => {  
        colors.pop(colorToEdit)
        updateColors([...colors, res.data])
      })
      .catch(err => {
        console.log(err)
      })

    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
  };

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then(res => {
        console.log(res)
        
      })
      .catch(err => {
        console.log(err)
      })
      history.push("/")
    // make a delete request to delete this color
  };

  console.log(newColor);

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
      
      <form>
        <label htmlFor="color">New Color</label>
        <input
        id="color"
        name="color"
        type="text"
        placeholder="New Color"
        value={newColor.color}
        onChange={e => {
          setNewColor(...newColor, {color: e.target.value})
        }}
        />
        <label htmlFor="hexcode">Hex code</label>
        <input
        id="hexcode"
        name="hexcode"
        type="text"
        placeholder="Hex Code"
        value={newColor.code.hex}
        onChange={e => {
          setNewColor({...newColor, code: { hex: e.target.value}})
        }}
        />

      
        <button>Add New Color</button>
      </form>

    </div>
  );
};

export default ColorList;
