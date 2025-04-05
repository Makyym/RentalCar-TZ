import { useEffect, useRef, useState } from 'react';
import { Field } from 'formik';
import { format } from 'date-fns';
import s from './CustomDateInput.module.css';
import CalendarLogic from '../CalendarLogic/CalendarLogic.jsx';

const CustomDateInput = ({ name, placeholder = 'Booking date', customStyle }) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
            containerRef.current &&
            !containerRef.current.contains(event.target)
            ) {
            setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [containerRef]);  
    return (
        <Field name={name}>
        {({ field, form }) => (
            <div className={s.datePickerContainer} ref={containerRef}>
            <input
                {...field}
                readOnly
                placeholder={placeholder}
                className={customStyle}
                value={field.value ? format(field.value, 'dd.MM.yyyy') : ''}
                onClick={() => setOpen(true)}
            />
            {open && (
                <div className={s.calendarPopup}>
                <CalendarLogic
                    selectedDate={field.value}
                    onSelectDate={(date) => {
                    form.setFieldValue(name, date);
                    setOpen(false);
                    }}
                />
                </div>
            )}
            </div>
        )}
        </Field>
    );
};

export default CustomDateInput;