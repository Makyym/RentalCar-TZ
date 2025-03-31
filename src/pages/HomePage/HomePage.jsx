import s from "./HomePage.module.css"

const HomePage = () => {
    return (
        <div className={s.homeDiv}>
            <h1>Find your perfect rental car</h1>
            <h2>Reliable and budget-friendly rentals for any journey</h2>
            <button>View Catalog</button>
        </div>
    )
}

export default HomePage