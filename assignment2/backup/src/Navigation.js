import {Nav, Navbar, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import {Link,Switch, Route} from 'react-router-dom';
import {useEffect, useState} from 'react';
import Sales from './Sales';
import Load from './LoadData';



export default function Navigation({recentlyViewed}){

    const [query, setquery] = useState("");

    useEffect(() => {

    },[query])

    const onChange = (e) => {
        setquery(e.target.value);
        console.log("event of search: "+query)
    }


    if(recentlyViewed.length>0){
    return(

        <Navbar bg="dark" expand="lg" variant="dark">
        <Navbar.Brand to="#home">BTI425 Kam Chan -Sales</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        <Nav.Link as={Link} to="/">All Sales</Nav.Link>
        <NavDropdown title="Previously Viewed" id="basic-nav-dropdown">
            {
            recentlyViewed.map(cus=>(                
            <NavDropdown.Item as={Link} to={'/sale/' + cus._id}>Sale: {cus._id}</NavDropdown.Item>
            ))
            
            }
        </NavDropdown>
        </Nav>
        <Form inline>
        <FormControl type="text" placeholder="Sale ID" className="mr-sm-2" id="searchId" onChange={onChange}/>
        <Button variant="outline-success" as={Link} to={'/sale/' + query}>Search</Button>
        </Form>
        </Navbar.Collapse>
        </Navbar>

        )
    }else{
        return(

            <Navbar bg="light" expand="lg">
            <Navbar.Brand to="#home">BTI425 Kam Chan -Sales</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link to="/">All Sales</Nav.Link>
            <NavDropdown title="Previously Viewed" id="basic-nav-dropdown">
                <NavDropdown.Item to="/">...</NavDropdown.Item>
            </NavDropdown>
            </Nav>
            <Form inline>
            <FormControl type="text" placeholder="Sale ID" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
            </Form>
            </Navbar.Collapse>
            </Navbar>

        )
    }
}