import { useEffect, useLayoutEffect } from "react"
import CatalogList from "../../components/CatalogList/CatalogList.jsx"
import FilterForm from "../../components/FilterForm/FilterForm.jsx"
import { useDispatch } from "react-redux"
import { fetchCarBrands } from "../../redux/cars/operations.js"

const CatalogPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCarBrands());
    }, [dispatch]);
    return (
        <>
            <FilterForm />
            <CatalogList />
        </>
    )
}

export default CatalogPage