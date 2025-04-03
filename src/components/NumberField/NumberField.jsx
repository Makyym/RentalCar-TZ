import { NumericFormat } from "react-number-format";
import { useField, useFormikContext } from "formik";
import s from "../FilterForm/FilterForm.module.css"

const NumberField = ({ name, ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(name);

    return (
        <div>
        <NumericFormat
            {...props}
            thousandSeparator=","
            value={field.value || ""}
            onChange={(e) => {
                const rawValue = e.target.value;
                const cleanedValue = rawValue.replace(/,/g, "")
                const numericValue = cleanedValue ? Number(cleanedValue) : null;
                setFieldValue(name, numericValue);
            }}
            type="text"
            />
            {meta.touched && meta.error ? (
            <span className={name === "minMileage" ? s.errorMessage : `${s.errorMessage} ${s.priceMessage}`}>{meta.error}</span>
            ) : null}
        </div>
    );
};

export default NumberField;