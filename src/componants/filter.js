
/**
 * Select
 * 
 * 
 * @author Mehtab Gill
 */

function Filter(props) {
    const onChangeSelect = (event) => props.handler(event.target.value);
  
    return (
      <div>
        <select value={props.selectTheAward} onChange={onChangeSelect}>
          <option value="all">All</option>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      </div>
    )
  }
  export default Filter;