import s from "./Search.module.css"
import {Form, Button, DropdownButton, Dropdown, Container, Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import DatePicker from 'react-datepicker';
import {changeSearchValue, setDate, setDropDownValueForSearch} from "../../Redux/Action";

const sortVariants = [
    {
        label: "A-Z",
        value: "a-z"
    },
    {
        label: "Z-A",
        value: "z-a"
    },
    {
        label: "Created_Date_Oldest",
        value: "creation_date_oldest"
    },
    {
        label: "Created_Date_Newest",
        value: "creation_date_newest"
    },
    {
        label: "Completion_Date_Oldest",
        value: "completion_date_oldest"
    },
    {
        label: "Completion_Date_Newest",
        value: "completion_date_newest"
    },
    {
        label: "Reset",
        value: ""
    }
];
const statusVariants = [
    {
        label: "Done",
        value: "done"
    },
    {
        label: "Active",
        value: "active"
    },
    {
        label: "Reset",
        value: ""
    }
]
const Search = (props) => {
    const {
        //state
        status,
        sort,
        search,
        create_lte,
        create_gte,
        complete_lte,
        complete_gte,
        // functions
        setDropDownValueForSearch,
        changeSearchValue,
        setDate
    } = props;

    const sortItems = sortVariants.map((variant, index) => {
        return (
            <Dropdown.Item
                key={index}
                onClick={() => setDropDownValueForSearch("sort", variant.value)}
            >
                {variant.label}
            </Dropdown.Item>
        )
    });
    const statusItems = statusVariants.map((variant, index) => {
        return (
            <Dropdown.Item
                onClick={() => setDropDownValueForSearch("status", variant.value)}
                key={index}
            >
                {variant.label}
            </Dropdown.Item>
        )
    })
    return (
        <div>
            <Form className="mt-3">
                <Form.Group>
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        onChange={(e) => changeSearchValue(e.target)}
                        value={search}
                        name="search"
                    />
                </Form.Group>
                <Form.Group>

                    <DropdownButton
                        className="d-inline "
                        title={sort ? sortVariants.find(i => i.value === sort).label : "Sort"}
                        variant="secondary"
                    >
                        {sortItems}
                    </DropdownButton>


                    <DropdownButton
                        className="d-inline pl-3"
                        title={status ? statusVariants.find(i => i.value === status).label : "Status"}
                        variant="secondary"

                    >
                        {statusItems}
                    </DropdownButton>
                </Form.Group>
                <Container>
                    <Row>
                        <Col>
                            <Form.Group>
                                Created Late:
                                <DatePicker

                                    selected={create_lte}
                                    onChange={date => setDate("create_lte", date)}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                Created Greater:
                                <DatePicker

                                    selected={create_gte}
                                    onChange={date => setDate("create_gte", date)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group>
                                Completed Late:
                                <DatePicker
                                    selected={complete_lte}
                                    onChange={date => setDate("complete_lte", date)}
                                />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group>
                                Completed Greater:
                                <DatePicker
                                    selected={complete_gte}
                                    onChange={date => setDate("complete_gte", date)}
                                />
                            </Form.Group>
                        </Col>

                    </Row>

                </Container>


                <Form.Group className="mt-3">
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>

                </Form.Group>

            </Form>
        </div>
    )
}
const mapStateToProps = (state) => {
    const {
        sort,
        status,
        search,
        create_lte,
        create_gte,
        complete_lte,
        complete_gte,
    } = state.SearchState
    return {
        sort,
        status,
        search,
        create_lte,
        create_gte,
        complete_lte,
        complete_gte,

    }
}
const mapDispatchToProps = {
    setDropDownValueForSearch,
    changeSearchValue,
    setDate
}
export default connect(mapStateToProps, mapDispatchToProps)(Search);