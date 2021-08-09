import { useHistory, useLocation } from "react-router-dom";

/**
 * Result component gets the array which represents the water flow model with obstructions and displays the water flow 
 */

const Result = () => {

    const location = useLocation();

    const history = useHistory();

    const {start,data} = location.state.params;

    /**
     * 
     * @returns the JSX expression which represents the water flow
     */

    const simulateFlow = () => {
      let flowArr =  moveDownwardUntilBlock(0, start, data);
      return (
        <table className="matrix">
            <tbody>
          {flowArr.map((rows, i) => (
            <tr className="matrix-row" key={i}>
              {rows.map((col, j) =>
                   (
                       col === 2 ? <td  className="matrix-cell blue " key={j}></td> : col === 0 ? <td  className="matrix-cell dark " key={j}></td> : <td  className="matrix-cell white " key={j}></td>
                  
                )
              )}
            </tr>
          ))}
          </tbody>
        </table>
      );
    };

    let visitedCells = {};

    const row = data.length;

    const col = data[0].length;

/**
 * 
 * @param {Starting position of row} rowStart 
 * @param {Starting position of column} colStart 
 * @param {Array on which actions need to be performed} arr 
 * @returns Array which represents 0 as blocked, 2 as water flow , 1 as unblocked or non water flowing area.
 */


    const moveDownwardUntilBlock = (rowStart, colStart, arr) => {
        let i = rowStart;
        let j = colStart;
        //To move downward until a block found
        while(i < row && arr[i][j] !== 0) {
            visitedCells[i + "" + j] = true;
            arr[i][j] = 2;
            i++;
        }
        if(i !== row) {
            let nexti,nextj;
        // To move left on block found
         if( j -1 >= 0 && i - 1 >= 0){
             nexti = i - 1;
             nextj = j - 1;
             //To check whether the cell is already visited.If visited ignore it to check again.
             if(visitedCells[nexti + "" + nextj] !== true){
                moveDownwardUntilBlock(i - 1, j - 1, arr);
             }
         }
        // To move right on block found
        if( j + 1 < col && i - 1 >= 0) {
            nexti = i - 1;
            nextj = j + 1;
             //To check whether the cell is already visited.If visited ignore it to check again.
            if(visitedCells[nexti + "" + nextj] !== true){
                moveDownwardUntilBlock(i - 1, j + 1, arr);
             }
        }
        }
       return arr;
    };

    const handleReset = () => {
        history.push("/");
    }

    return (
        <div className = "simulator card">
            <h1>Waterflow Simulator</h1>
            {simulateFlow()}
        <div className = "btn-div">
        <button onClick = {handleReset}>Reset</button>
        </div>
        </div>
    );
};

export default Result;