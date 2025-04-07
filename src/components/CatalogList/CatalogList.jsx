import { useDispatch, useSelector } from "react-redux";
import { fetchCarsWithParams } from "../../redux/cars/operations.js";
import { useEffect } from "react";
import { selectAllCars, selectIsLoading } from "../../redux/cars/selectors.js";
import s from "./CatalogList.module.css";
import { selectFilters, selectPageNumber, selectTotalPages } from "../../redux/filters/selectors.js";
import CatalogItem from "../CatalogItem/CatalogItem.jsx";
import { incrementPage } from "../../redux/filters/slice.js";
import Loader from "../Loader/Loader.jsx";

const CatalogList = () => {
    const dispatch = useDispatch();
    const cars = useSelector(selectAllCars);
    const filters = useSelector(selectFilters);
    const isLoading = useSelector(selectIsLoading);
    const page = useSelector(selectPageNumber);
    const totalPages = useSelector(selectTotalPages);
    useEffect(() => {
        dispatch(fetchCarsWithParams({...filters, page}));
    }, [dispatch, filters, page]);
    const handleClick = () => {
        dispatch(incrementPage());
    };
    return (
        <div className={s.wrapper}>
            {isLoading && page === 1 ? (
                <div className={s.loader}>
                <Loader />
                </div>
            ) : !isLoading && cars.length === 0 ? (
                <h2>Something went wrong, try to change search params or reload page.</h2>
            ) : (
                <>
                <ul className={s.list}>
                    {cars.map((car) => (
                    <li key={car.id} className={s.li}>
                        <CatalogItem data={car} />
                    </li>
                    ))}
                </ul>
                {isLoading && page > 1 && (
                    <div className={s.loader}>
                    <Loader />
                    </div>
                )}
                {page === totalPages ? null : (!isLoading &&
                    <button type="button" className={s.btn} onClick={handleClick}>
                    Load more
                    </button>
                )}
                </>
            )}
        </div>
    );
}

export default CatalogList