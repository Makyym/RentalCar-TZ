import { useDispatch, useSelector } from "react-redux";
import { fetchAllCars } from "../../redux/cars/operations.js";
import { useEffect } from "react";
import { selectAllCars } from "../../redux/cars/selectors.js";
import s from "./CatalogList.module.css";

const CatalogList = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllCars());
    }, [dispatch]);
    const cars = useSelector(selectAllCars);
    return (
        <ul className={s.list}>
            {cars.map((car) => {
                const {
                    brand,
                    address,
                    year,
                    model,
                    rentalPrice,
                    type,
                    mileage,
                    rentalCompany,
                    id,
                    img,
                    description,
                } = car;
                const addressParts = address.split(",").map(part => part.trim());
                const city = addressParts[addressParts.length - 2];
                const country = addressParts[addressParts.length - 1];
                return (
                    <li key={id} className={s.li}>
                        <img src={img} alt={description} />
                        <div className={s.textDiv}>
                            <p>{brand} <span>{model}</span>, {year}</p>
                            <p className={s.rentPrice}>${rentalPrice}</p>
                            <p className={s.generalInfo}>{city} | {country} | {rentalCompany} |<br/>{type} | {mileage}</p>
                        </div>
                        <button type="button" className={s.btn}>Read more</button>
                    </li>
                )
            })}
        </ul>
    )
}

export default CatalogList