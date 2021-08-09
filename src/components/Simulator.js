import RangeSlider from "./RangeSlider";
import { useHistory } from "react-router-dom";

/**
 * Simulator is a landing component where user needs to give input for row, column and obstruction.
 */

const Simulator = () => {
  const history = useHistory();

  let rowCount = 10;
  let columnCount = 10;
  let obsCount = 10;

  /**
   * updateRows() - updates the row input given by user
   */

  const updateRows = (e) => {
    rowCount = e.target.value;
  };

  /**
   * updateColumns() - updates the column input given by user
   */

  const updateColumns = (e) => {
    columnCount = e.target.value;
  };

  /**
   * updateObstructions() - updates the obstructions input given by user
   */

  const updateObstructions = (e) => {
    obsCount = e.target.value;
  };

  /**
   * handleNext() - method responsible to send the user input and display obstruction component
   */

  const handleNext = () => {
    history.push("/obstruction", {
      params: {
        row: rowCount,
        column: columnCount,
        obs: obsCount,
      },
    });
  };

  return (
    <div className="simulator card">
      <h1>Waterflow Simulator</h1>
      <RangeSlider heading="Number Of Rows" handleChange={updateRows} />
      <RangeSlider heading="Number Of Columns" handleChange={updateColumns} />
      <RangeSlider
        heading="Number Of Obstructions"
        handleChange={updateObstructions}
      />
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Simulator;
