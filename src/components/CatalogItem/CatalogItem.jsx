import s from "./CatalogItem.module.css"

const CatalogItem = ({data}) => {
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
    const addressParts = address.split(",").map(part => part.trim());
    const city = addressParts[addressParts.length - 2];
    const country = addressParts[addressParts.length - 1];
    const formattedMileage = mileage.toLocaleString('uk-UA').replace(/\u00A0/g, " ");
    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }      
    return (
        <>
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
            <button type="button" className={s.btn}>Read more</button>
        </>
    )
}

export default CatalogItem