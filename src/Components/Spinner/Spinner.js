import s from "./Spinner.module.css"

const Spinner = () => {
    return (
        <div className={s.spinner_wrapper}>
            <div className={s.loader}>Loading...</div>
        </div>
    )
}

export default Spinner;


