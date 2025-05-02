import { useEffect, useLayoutEffect } from "react"
import CatalogList from "../../components/CatalogList/CatalogList.jsx"
import FilterForm from "../../components/FilterForm/FilterForm.jsx"
import { useDispatch } from "react-redux"
import { fetchCarBrands } from "../../redux/cars/operations.js"
import Secundomer from "../../components/Secundomer.jsx"

const CatalogPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCarBrands());
    }, [dispatch]);
    return (
        <>
        {/* <Secundomer /> */}
        <FilterForm />
        <CatalogList />
        </>
    )
}

export default CatalogPage