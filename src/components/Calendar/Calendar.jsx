import s from "./Calendar.module.css";
import sprite from "../../assets/sprite.svg";

const Calendar = ({
    headerTitle,
    weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    calendarCells = [],
    onPrev,
    onNext,
    onSelect,
}) => {
    return (
        <div className={s.content}>
            <svg width={276} height={284} className={s.frameSvg}>
                    <use href="/src/assets/sprite.svg#icon-background"></use>
            </svg>
            <div className={s.container}>
                <div className={s.header}>
                <button onClick={onPrev} type="button">
                    <svg width={24} height={24} className={s.svgLeft}>
                        <use href="/src/assets/sprite.svg#icon-Property-1Default-1"></use>
                    </svg>
                </button>
                <p>{headerTitle}</p>
                <button onClick={onNext} type="button">
                    <svg width={24} height={24} className={`${s.svgLeft} ${s.svgRight}`}>
                        <use href={`${sprite}#icon-Property-1Default-1`}></use>
                    </svg>
                </button>
                </div>
                <ul className={s.daysUl}>
                {weekDays.map((day, index) => (
                    <li key={index}>
                    {day}
                    </li>
                ))}
                </ul>
                <div className={s.monthDiv}>
                    <ul className={s.monthUl}>
                    {calendarCells.map((cell, index) => (
                        <li
                        key={index}
                        className={`
                            ${cell.isCurrentMonth ? s.currentDay : s.otherDay} 
                            ${cell.isSelected ? s.selectedDay : ''}
                            ${cell.disabled ? s.disabledDay : ''}`}              
                            onClick={() => onSelect && !cell.disabled && onSelect(cell.date)}
                        >
                        {cell.day}
                        </li>
                    ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};  

export default Calendar
