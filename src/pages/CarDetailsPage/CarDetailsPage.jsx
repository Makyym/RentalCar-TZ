import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectChosenCar } from "../../redux/cars/selectors.js";
import { useEffect } from "react";
import { fetchCarById } from "../../redux/cars/operations.js";
import { Formik, Form, Field } from "formik";
import s from "./CarDetailsPage.module.css";
import sprite from "../../assets/sprite.svg";
import Calendar from "../../components/Calendar/Calendar.jsx";
import CustomDateInput from "../../components/CustomDateInput/CustomDateInput.jsx";

const extractNumber = (url) => {
    const lastPart = url.split("/").pop();
    const number = lastPart.split("-")[0];
    return number;
};

const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const initialValues = {
    name: '',
    email: '',
    date: null,
    comment: ''
};

const CarDetailsPage = () => {
    const { carId } = useParams();
    const car = useSelector(selectChosenCar);
    const isEmpty = Object.keys(car).length === 0;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCarById(carId));
    }, [dispatch]);
    if (isEmpty) return;
    const {
        img,
        description,
        model,
        brand,
        year,
        id,
        address,
        mileage,
        rentalPrice,
        rentalConditions,
        type,
        fuelConsumption,
        engineSize,
        accessories,
        functionalities,
    } = car;
    const addressParts = address.split(",").map(part => part.trim());
    const city = addressParts[addressParts.length - 2];
    const country = addressParts[addressParts.length - 1];
    const formattedMileage = mileage.toLocaleString('uk-UA').replace(/\u00A0/g, " ");
    const allFunctionalities = [...accessories, ...functionalities];
    const handleSubmit = (values) => {
        console.log(values);
    }
    return (
        <div className={s.wrapper}>
            <div>
                <img src={img} alt={description} className={s.img}/>
                <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                >
                    <Form className={s.formDiv}>
                        <h3 className={s.sectionTitle}>Book your car now</h3>
                        <p className={s.formText}>Stay connected! We are always ready to help you.</p>
                        <div className={s.form}>
                            <Field type="text" placeholder="Name*" name="name" className={s.inputs}/>
                            <Field type="text" placeholder="Email*" name="email" className={s.inputs}/>
                            <CustomDateInput name="date" placeholder="Booking date" customStyle={`${s.inputs} ${s.customCursor}`}/>
                            <Field as="textarea" placeholder="Comment" name="comment" className={`${s.inputs} ${s.textArea}`} />
                        </div>
                        <button type="submit" className={s.btn}>Send</button>
                    </Form>
                </Formik>
            </div>
            <div className={s.divDescription}>
                <div className={s.mainTitleDiv}>
                    <h2 className={s.mainTitle}>{brand} {model}, {year}</h2>
                    <p>Id: {extractNumber(img)}</p>
                </div>
                <div className={s.addressDiv}>
                    <p>{city}, {country}</p>
                    <p>Mileage: {formattedMileage} km</p>
                </div>
                <h2 className={`${s.mainTitle} ${s.colored}`}>${rentalPrice}</h2>
                <p className={s.mainText}>{description}</p>
                <div className={s.conditionsDiv}>
                    <div>
                        <h3 className={s.sectionTitle}>Rental Conditions:</h3>
                        <ul className={s.ul}>
                            {rentalConditions.map((condition, index) => {
                                return <li key={index}>
                                    <svg width={16} height={16} className={s.svg}>
                                        <use href={`${sprite}#icon-check-circle`}></use>
                                    </svg>
                                    {condition}
                                    </li>
                            })}
                        </ul>
                    </div>
                    <div>
                        <h3 className={s.sectionTitle}>Car Specifications:</h3>
                        <ul className={s.ul}>
                            <li>
                                <svg width={16} height={16} className={s.svg}>
                                    <use href={`${sprite}#icon-calendar`}></use>
                                </svg>
                                Year: {year}
                            </li>
                            <li>
                                <svg width={16} height={16} className={s.svg}>
                                    <use href={`${sprite}#icon-car`}></use>
                                </svg>
                                Type: {capitalizeFirstLetter(type)}
                            </li>
                            <li>
                                <svg width={16} height={16} className={s.svg}>
                                    <use href={`${sprite}#icon-fuel-pump`}></use>
                                </svg>
                                Fuel Consumption: {fuelConsumption}
                            </li>
                            <li>
                                <svg width={16} height={16} className={s.svg}>
                                    <use href={`${sprite}#icon-gear`}></use>
                                </svg>
                                Engine Size: {engineSize}
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className={s.sectionTitle}>Accessories and functionalities:</h3>
                        <ul className={s.ul}>
                            {allFunctionalities.map((element, index) => {
                                return <li key={index}>
                                    <svg width={16} height={16} className={s.svg}>
                                        <use href={`${sprite}#icon-check-circle`}></use>
                                    </svg>
                                    {element}
                                    </li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CarDetailsPage