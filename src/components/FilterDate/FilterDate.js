import React from 'react';
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from 'react-redux';
import {
    getCategoryLeadersByDate,
    getGlobalLeadersByDate
} from '../../features/CommonSlice';

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
    
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };


    console.log(startDate)
    console.log(endDate)
    const confirmDate = () => {
        setShowModal(!showModal)
        
        dispatch(getGlobalLeadersByDate({
            startDate,
            endDate
        }));
        dispatch(getCategoryLeadersByDate({
            startDate,
            endDate
        }));
    }

    const cancel = () => {
        // setStartDate(null)
        // setEndDate(null)
        setShowModal(false)
    }


    return (
        <>
            <div className={`${showModal ? 'date-modal' : 'hide-modal'}`}>
                <div className='date-header'>
                    <p className='date-title'>Select Date</p>
                    <div className='date-session'>
                        <p className='start-date'>Start Date</p>
                        <p className='end-date'>End Date</p>
                    </div>
                </div>
                <div className='date-container'>

                    <DatePicker
                        selected={startDate}
                        onChange={onChange}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        inline
                    />
                    <div className='btn-case'>
                        <button className='confirm-btn' onClick={confirmDate}>Ok</button>
                        <button className='cancel-btn' onClick={cancel}>Cancel</button>
                    </div>
                </div>
            </div>
        </>
    )

}

export default FilterDate