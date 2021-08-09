import {  useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

const Obstruction = () => {
  const location = useLocation();

  const history = useHistory();

  const [infoMsg, setInfoMsg] = useState("");

  const { row, column, obs } = location.state.params;

  const arr = useRef([]);

  let startPos = "";
/**
 * grid() - returns the table with selected number of rows and columns 
 */
  const grid = () => {
    return (
      <table className="matrix">
          <tbody>
        {arr.current.map((rows, i) => (
          <tr className="matrix-row" key={i}>
            {rows.map((col, j) =>
                 (
                   i === 0 ? 
                <td onClick = {handleHighlighting}  onDrop={drop} onDragOver={(e) => (e.preventDefault())} className="matrix-cell white " key={j}></td>
                :
                <td onDrop={drop} onDragOver={(e) => (e.preventDefault())} className="matrix-cell white " key={j}></td>
              )
            )}
          </tr>
        ))}
        </tbody>
      </table>
    );
  };
/**
 * drop() - this method responsible to append the dropped blocked in cell where it is dropped.
 */
  const drop = (e) => {
    e.preventDefault();
    let data = e.dataTransfer.getData("text");
    let id = document.getElementById(data);
    arr.current[e.target.parentNode.rowIndex][e.target.cellIndex] = 0;
    e.target.appendChild(id);
  };
/**
 * constructBlocks() - Returns the blocks which is obstruction to be dragged and dropped into cell.
 */

  const constructBlocks = () => {
    const blocks = [];
        for(let i = 0; i < parseInt(obs);i++){
            blocks.push(
                <div key = {i} className = "matrix-cell dark" id = {i} draggable="true"  onDragStart={(e) => {e.dataTransfer.setData("text", e.target.id);}}>
                </div>
            )
        } 
        return blocks;
  }

  /**
 * handleBack() - handles the back button navigation
 */

  const handleBack = () => {
      history.push("/");
  };

    /**
 * handleStart() - handles the start button navigation
 */


  const handleStart = () => {
      if(startPos !== "") {
        setInfoMsg("");
        history.push("/output", {params : {
          start : startPos,
          data : arr.current
        }});
      }else {
        setInfoMsg("Select a cell from row 1")
      }
  };

  
    /**
 * handleNext() - highlights the selected cell as blue to set as start position
 */



  const handleHighlighting = (e) => {
    startPos = e.target.cellIndex;
    e.target.classList.add("selected");
  };

  useEffect(() => {
    arr.current = Array(parseInt(row))
    .fill()
    .map(() => Array(parseInt(column)).fill(1));
    setInfoMsg("Choose a cell from row 1..Drag and Drop to add blocks");
  },[row, column]);



  return (
    <div className="obstruction card">
      <h1>Waterflow Simulator</h1>
      {infoMsg}
        <div className = "grid-blocks-div">
        {grid()}<div className = "blocks">{constructBlocks()}</div>
        </div>
        
      <div className = "btn-div">
        <button onClick = {handleBack} id = "back-btn">Back</button>
        <button onClick = {handleStart} id = "start-btn"> Start Animation</button>
      </div>
    </div>
  );
};

export default Obstruction;
