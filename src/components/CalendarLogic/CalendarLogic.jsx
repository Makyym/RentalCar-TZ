import React, { useState } from 'react';
import {
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    addDays,
    addMonths,
    subMonths,
    isSameMonth,
    isSameDay,
    isBefore,
} from 'date-fns';
import Calendar from '../Calendar/Calendar.jsx';


const CalendarLogic = ({ selectedDate, onSelectDate }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const headerTitle = format(currentMonth, 'MMMM yyyy');
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const generateCalendarCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
        const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
        const cells = [];
        let day = startDate;
        while (day <= endDate) {
        cells.push({
            day: format(day, 'd'),
            date: day,
            isCurrentMonth: isSameMonth(day, monthStart),
            isSelected: selectedDate ? isSameDay(day, selectedDate) : false,
            disabled: isBefore(day, todayStart),
        });
        day = addDays(day, 1);
        }
        return cells;
    };
    const calendarCells = generateCalendarCells();
    const handlePrevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };
    const handleNextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };
    return (
        <Calendar
        headerTitle={headerTitle}
        weekDays={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
        calendarCells={calendarCells}
        onPrev={handlePrevMonth}
        onNext={handleNextMonth}
        onSelect={(date) => onSelectDate && onSelectDate(date)}
        />
    );
};


export default CalendarLogic