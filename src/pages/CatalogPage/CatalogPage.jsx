import { useEffect } from "react"
import CatalogList from "../../components/CatalogList/CatalogList.jsx"
import FilterForm from "../../components/FilterForm/FilterForm.jsx"
import { useDispatch } from "react-redux"
import { fetchAllCars, fetchCarBrands } from "../../redux/cars/operations.js"

const CatalogPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCarBrands());
        dispatch(fetchAllCars());
    }, [dispatch]);
    return (
        <>
            <FilterForm />
            <CatalogList />
        </>
    )
}

export default CatalogPage