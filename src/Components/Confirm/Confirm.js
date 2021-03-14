import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";

const Confirm = (props) => {
    const { onHide, onSubmit, count } = props;

     const handleSubmit = () => {
        onSubmit();
        onHide();
    }
    return (


        <Modal show={true} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Are you sure you want to delete {count} task(s)?</Modal.Title>
            </Modal.Header>

            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
</Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Detete
</Button>
            </Modal.Footer>
        </Modal>


    )
}


Confirm.propTypes = {
    onHide: PropTypes.func.isRequired,
    onSubmit:PropTypes.func.isRequired,
    count: PropTypes.number,
}

export default Confirm;