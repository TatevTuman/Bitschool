import {Button} from "react-bootstrap";


const AboutUs = (props) => {
    const pushAction = () => {
        console.log(props)
        props.history.push("/")
    }

    const goAction=()=>{
        props.history.go(+1)
    }



    return (<div>
        <h2 style={{color: "dark"}}>About Us</h2>
        <Button onClick={pushAction}>Go To Home Page</Button>
        <Button onClick={goAction}>Go To +1 Page</Button>
    </div>)
}

export default AboutUs;
