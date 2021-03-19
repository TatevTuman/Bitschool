import React from "react";


const WithScreenSize = (Component) => {
    return class extends React.Component {
        state = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        handleResize = () => {
            this.setState({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }

        componentDidMount() {
            window.addEventListener("resize", this.handleResize)
        }

        componentWillUnmount() {
            window.removeEventListener("resize", this.handleResize)
        }

        render() {

            return (<div>
                <Component width={this.state.width} height={this.state.height} {...this.props} />
            </div>)
        }
    }
}

export default WithScreenSize;