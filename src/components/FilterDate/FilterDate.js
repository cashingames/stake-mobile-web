import React from 'react';
import { useState } from 'react';
import { DateRangePicker } from 'react-date-range'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './style.scss'

const FilterDate = () => {
    const [showModal, setShowModal] = useState(false)

    const modalHandler = () => {
        setShowModal(true)
    }
    return (
        <>
            <p className='sec-title' onClick={modalHandler}>Filter by date</p>
            <DateRange setShowModal={setShowModal} showModal={showModal} />
        </>
    )
}


const DateRange = ({ setShowModal, showModal }) => {
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);

    const confirmDate = () => {
        setShowModal(false)
    }

    const cancel = () => {
        setShowModal(false)
    }

    return (
        <>
            {showModal &&
                <div className='date-modal'>
                    <div className='date-header'>
                        <p className='date-title'>Select Date</p>
                        <div className='date-session'>
                            <p className='start-date'>Start Date</p>
                            <p className='end-date'>End Date</p>
                        </div>
                    </div>
                    <div className='date-container'>
                        <DateRangePicker
                            onChange={item => setState([item.selection])}
                            showSelectionPreview={true}
                            moveRangeOnFirstSelection={false}
                            months={1}
                            ranges={state}
                        //   direction="horizontal"
                        // style={{display:'none'}}
                        />
                    </div>
                    <div className='btn-case'>
                        <button className='confirm-btn' onClick={confirmDate}>Ok</button>
                        <button className='cancel-btn' onClick={cancel}>Cancel</button>
                    </div>
                </div>
            }
        </>
    )

}

export default FilterDate
