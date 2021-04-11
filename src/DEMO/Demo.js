import {useState} from "react";


function Counter() {
    const [count, setCount] = useState(0);
    return (
        <>
            Счёт: {count}
            <button onClick={() => setCount(0)}>Сбросить</button>
            {/*  <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>*/}
            <button onClick={() => setCount(count - 1)}>-</button>
            <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
        </>
    );
}

export default Counter;