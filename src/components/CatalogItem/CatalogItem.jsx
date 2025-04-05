import { useDispatch, useSelector } from "react-redux";
import s from "./CatalogItem.module.css"
import { selectFavoritesCars } from "../../redux/cars/selectors.js";
import { addFavoriteCar, deleteFavoriteCar } from "../../redux/cars/slice.js";
import { Link, useLocation } from "react-router-dom";

const CatalogItem = ({data}) => {
    const dispatch = useDispatch();
    const favoritesCars = useSelector(selectFavoritesCars);
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
    } = data;
    const location = useLocation();
    const isFavorite = favoritesCars.find(item => item.id === id);
    const addressParts = address.split(",").map(part => part.trim());
    const city = addressParts[addressParts.length - 2];
    const country = addressParts[addressParts.length - 1];
    const formattedMileage = mileage.toLocaleString('uk-UA').replace(/\u00A0/g, " ");
    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };
    const handleAdd = () => {
        dispatch(addFavoriteCar(data));
    };
    const handleRemove = () => {
        dispatch(deleteFavoriteCar(id));
    };
    return (
        <>
        <svg
        width={16}
        height={16}
        className={isFavorite ? `${s.svg} ${s.svgColored}` : s.svg}
        onClick={isFavorite ? handleRemove : handleAdd}
        >
            <use href={`/src/assets/sprite.svg#icon-heart`} />
        </svg>
            <img src={img} alt={description} className={s.img}/>
            <div className={s.textDiv}>
                <p>{brand} <span>{model}</span>, {year}</p>
                <p className={s.rentPrice}>${rentalPrice}</p>
                <ul className={s.generalDiv}>
                    <li className={s.generalInfo}>{city}</li>
                    <li className={s.generalInfo}>{country}</li>
                    <li className={s.generalInfo}>{rentalCompany}</li>
                    <li className={s.breaker}></li>
                    <li className={s.generalInfo}>{capitalizeFirstLetter(type)}</li>
                    <li className={s.generalInfo}>{formattedMileage} km</li>
                </ul>
            </div>
            <Link to={`/catalog/${id}`} state={location} className={s.btn}>
                Read more
            </Link>
        </>
    )
}

export default CatalogItem