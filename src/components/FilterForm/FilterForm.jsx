import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from 'yup';
import { selectFilters } from "../../redux/filters/selectors.js";
import { useState } from "react";
import { selectCarBrands, selectCarPrice } from "../../redux/cars/selectors.js";
import s from "./FilterForm.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { resetFilters, setFilters } from "../../redux/filters/slice.js";
import { fetchCarsWithParams } from "../../redux/cars/operations.js";
import NumberField from "../NumberField/NumberField.jsx";

const variants = {
    hidden: { opacity: 0, y: -10 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
};

const FilterForm = () => {
    const dispatch = useDispatch();
    const [carBrandsList, setCarBrandsList] = useState(false);
    const [carPriceList, setCarPriceList] = useState(false);
    const {brand, rentalPrice, minMileage, maxMileage} = useSelector(selectFilters);
    const carBrands = useSelector(selectCarBrands);
    const carsPriceArray = useSelector(selectCarPrice);
    const initialValues = {
        brand: brand ?? "",
        rentalPrice: rentalPrice ?? "",
        minMileage: minMileage ?? "",
        maxMileage: maxMileage ?? "",
    };
    const validationSchema = Yup.object({
        minMileage: Yup.number()
        .transform((value, originalValue) => {
            if (typeof originalValue === 'string' && originalValue.trim() === '') {
                return null;
            }
            return value;
        })
        .nullable()
        .typeError('Enter a number')
        .min(999, 'Value must be greater')
        .max(100000, 'Too much'),
        maxMileage: Yup.number()
        .transform((value, originalValue) => {
            if (typeof originalValue === 'string' && originalValue.trim() === '') {
                return null;
            }
            return value;
        })
        .nullable()
        .typeError('Enter a number')
        .min(999, 'Value must be greater')
        .max(100000, 'Too much'),
    }    
    );
    const normalizeValues = (values) => {
        return Object.fromEntries(
            Object.entries(values).map(([key, value]) => [
            key,
            (typeof value === 'string' && value.trim() === '') ? null : value,
            ])
        );
    };          
    const onSubmit = (values) => {
        const payload = normalizeValues(values);
        dispatch(setFilters(payload));
        dispatch(fetchCarsWithParams(payload));
    };              
    const carBrandsIsVisible = () => {
        setCarBrandsList(!carBrandsList);
    };
    const carPriceIsVisible = () => {
        setCarPriceList(!carPriceList);
    };
    const onHandleClear = async () => {
        await dispatch(resetFilters());
        dispatch(fetchCarsWithParams());
        sessionStorage.removeItem('filters');
    };
    return (
        <>
        <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        >
            {({ values, setFieldValue, resetForm }) => (
            <Form className={s.form}>
                <div className={s.divForLists}>
                    <p>Car brand</p>
                    <span onClick={carBrandsIsVisible} className={s.brandSpan}>
                    {values.brand || "Choose a brand"}
                    <svg width={16} height={16} className={carBrandsList ? s.svg : ""}>
                        <use href="/src/assets/sprite.svg#icon-Property-1Default-1"></use>
                    </svg>
                    </span>
                    <AnimatePresence>
                        {carBrandsList && <motion.ul
                        initial="hidden"
                        animate="enter"
                        exit="exit"
                        variants={variants}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        style={{ willChange: "transform, opacity" }}
                        className={s.ul}>
                        {carBrands.map((car) => {
                            let activeCar = false;
                            if (values.brand === car) {
                                activeCar = true;
                            }
                            return (
                                <li className={activeCar ? s.li : ""} key={car}>
                                    <button type="button" onClick={() => {carBrandsIsVisible(); setFieldValue("brand", car)}}>{car}</button>
                                </li>
                            )
                        })}
                        </motion.ul>}
                    </AnimatePresence>
                </div>
                <div className={s.divForLists}>
                    <p>Price/ 1 hour</p>
                    <span onClick={carPriceIsVisible} className={s.brandSpan}>
                    {values.rentalPrice ? `To $${values.rentalPrice}` : "Choose a price"}
                    <svg width={16} height={16} className={carPriceList ? s.svg : ""}>
                        <use href="/src/assets/sprite.svg#icon-Property-1Default-1"></use>
                    </svg>
                    </span>
                    <AnimatePresence>
                    {carPriceList && <motion.ul
                    initial="hidden"
                    animate="enter"
                    exit="exit"
                    variants={variants}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    style={{ willChange: "transform, opacity" }}
                    className={`${s.ul} ${s.shortUl}`}>
                    {carsPriceArray.map((price) => {
                        let activePrice = false;
                        if (values.rentalPrice === price) {
                            activePrice = true;
                        }
                        return (
                            <li className={activePrice ? s.li : ""} key={price}>
                                <button type="button" onClick={() => {carPriceIsVisible(); setFieldValue("rentalPrice", price)}}>{price}</button>
                            </li>
                        )
                    })}
                        </motion.ul>}
                    </AnimatePresence>
                </div>
                <div>
                    <p>Сar mileage / km</p>
                    <div className={s.priceDiv}>
                        <label className={s.minLabel}>
                            From
                            <NumberField name="minMileage" />
                        </label>
                        <label className={s.maxLabel}>
                            To
                            <NumberField name="maxMileage" />
                        </label>
                    </div> 
                </div>
                <button type="submit" className={s.searchBtn}>Search</button>
                <button type="reset" className={`${s.searchBtn} ${s.clearButton}`} onClick={() => {onHandleClear(); resetForm();}}>Clear</button>
            </Form>
            )}
        </Formik>
        </>
    )
}

export default FilterForm