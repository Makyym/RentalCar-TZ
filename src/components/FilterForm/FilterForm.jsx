import { ErrorMessage, Field, Form, Formik } from "formik";
import { useSelector } from "react-redux";
import * as Yup from 'yup';
import { selectFilters } from "../../redux/filters/selectors.js";
import { useState } from "react";
import { selectCarBrands, selectCarPrice } from "../../redux/cars/selectors.js";
import s from "./FilterForm.module.css";
import { AnimatePresence, motion } from "framer-motion";

const variants = {
    hidden: { opacity: 0, y: -10 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
};

const FilterForm = () => {
    const [carBrandsList, setCarBrandsList] = useState(false);
    const [carPriceList, setCarPriceList] = useState(false);
    const {brand, rentalPrice, minMileage, maxMileage} = useSelector(selectFilters);
    const carBrands = useSelector(selectCarBrands);
    const carsPriceArray = useSelector(selectCarPrice);
    const [carBrand, setCarBrand] = useState("Choose a brand");
    const [rentalCarPrice, setRentalCarPrice] = useState("Choose a price");
    const initialValues = {
        brand: brand ?? "",
        rentalPrice: rentalPrice ?? "",
        minMileage: minMileage ?? "",
        maxMileage: maxMileage ?? "",
    };
    const validationSchema = Yup.object({
        minMileage: Yup.number()
            .typeError('Enter a number')
            .min(0, 'Value must be greater than 0'),
        maxMileage: Yup.number()
            .typeError('Enter a number')
            .min(0, 'Value must be greater than 0'),
        });
        const onSubmit = (values) => {
            if (carBrand !== "Choose a brand") {
                values.brand = carBrand;
            }
            if (rentalCarPrice !== "Choose a price") {
                values.rentalPrice = rentalCarPrice;
            }
            console.log('Значения формы:', values);
        };
        const carBrandsIsVisible = () => {
            setCarBrandsList(!carBrandsList);
        };
        const onCarBrandClick = (brand) => {
            setCarBrand(brand);
            setCarBrandsList(!carBrandsList);
        }
        const carPriceIsVisible = () => {
            setCarPriceList(!carPriceList);
        };
        const onCarPriceClick = (price) => {
            setRentalCarPrice(price);
            setCarPriceList(!carPriceList);
        }
    return (
        <>
        <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        >
            <Form className={s.form}>
                <div className={s.divForLists}>
                    <p>Car brand</p>
                    <span onClick={carBrandsIsVisible} className={s.brandSpan}>{carBrand}
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
                            if (carBrand === car) {
                                activeCar = true;
                            }
                            return (
                                <li className={activeCar ? s.li : ""} key={car}>
                                    <button type="button" onClick={() => onCarBrandClick(car)}>{car}</button>
                                </li>
                            )
                        })}
                        </motion.ul>}
                    </AnimatePresence>
                </div>
                <div className={s.divForLists}>
                    <p>Price/ 1 hour</p>
                    <span onClick={carPriceIsVisible} className={s.brandSpan}>{rentalCarPrice}
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
                        if (rentalCarPrice === price) {
                            activePrice = true;
                        }
                        return (
                            <li className={activePrice ? s.li : ""} key={price}>
                                <button type="button" onClick={() => onCarPriceClick(price)}>{price}</button>
                            </li>
                        )
                    })}
                        </motion.ul>}
                    </AnimatePresence>
                </div>
                <div>
                    <p>Сar mileage / km</p>
                    <div className={s.priceDiv}>
                        <label className={s.minLabel}>From<Field type="number" name="minMileage"/></label>
                        <label className={s.maxLabel}>To<Field type="number" name="maxMileage"/></label>
                    </div> 
                </div>
                <button type="submit" className={s.searchBtn}>Search</button>
            </Form>
        </Formik>
        </>
    )
}

export default FilterForm