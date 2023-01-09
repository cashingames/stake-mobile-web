import { useState } from 'react';
import { DateRangePicker } from 'react-date-range'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './style.scss'

const DateRange = () => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);

  console.log(state)


  return (
    <>
      <p>Filter Date</p>
      <div className='date-container'>
        <DateRangePicker
          onChange={item => setState([item.selection])}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={1}
          ranges={state}
          // direction="horizontal"
        // style={{display:'none'}}
        />
      </div>

      <button>Click me</button>
      {state.map((item)=> {
        console.log(item.startDate)
        return(
          <p>{item.startDate.toString()}</p>
        )
        
      })}
    </>
  )

}

export default DateRange
