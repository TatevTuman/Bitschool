import {connect} from "react-redux";


function Counter(props) {
    const {count, minus} = props
    return (
        <div>
            <div>Count:{count}</div>
            <button onClick={minus}>----</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        count: state.count
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        minus: () => {
            dispatch({type: "minus"})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);

/*    const [count, setCount] = useState(0);
    return (
        <>
            Счёт: {count}
            <button onClick={() => setCount(0)}>Сбросить</button>
            {/!*  <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>*!/}
            <button onClick={() => setCount(count - 1)}>-</button>
            <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
        </>
    );*/