import { useParams,Switch, Route } from'react-router-dom'
import {useEffect, useState} from 'react';
import{ Container,ListGroup,ListGroupItem, Spinner,Table } from 'react-bootstrap'

import Navigation from './Navigation';
import NotFound from './NotFound';



export default function Sale({handleView, rv}) {
    const { id } = useParams();
    let { fname } = useParams();
    const [Sale, setSale] = useState(null);
    const [loading, setLoading] = useState(false);
    const [TotalPrice, setTotalPrice] = useState(0);
    const [NoData, setNoData] = useState(false);
    console.log(fname);

    useEffect(() => {
        setLoading(true)
        fetch(`https://damp-mountain-76760.herokuapp.com/api/sales/${id}`)
            .then(res => {
                if(!res.ok) {
                    setNoData(true);
                    throw new Error('Unable to get Sales data from database, Wrong id?');
                }
                return res.json()
            })
            .then(result => {
                setSale(result)
            })
            .catch(err => console.error(err))
            .finally(()=>setLoading(false));
    },[id,TotalPrice])

    if(NoData){
        return (<NotFound handleView = {handleView} recentlyViewed={rv}/> )
    }
    
    if(loading){
        return(
        <Spinner animation="border" role="status">
            <span className="sr-only">Loading.....</span>
        </Spinner>
        );
    }

    if(!Sale){
        return null;
    }

    if(TotalPrice === 0){
        var totalPrice = 0;
        for(var i = 0; i < Sale.items.length; i++){
            console.log(Sale.items[i].price)
            totalPrice += Sale.items[i].price;
        }
        setTotalPrice(totalPrice.toFixed(2))
        handleView(rv)
    }

    const customer_profiles = Sale.items.map(ss => {
        return(
        <tr>
            <td>{ss.name}</td>
            <td>{ss.quantity}</td>
            <td>{ss.price}</td>  
        </tr>)
    }); 

    return(
        <div>
            <Navigation recentlyViewed={rv} />
            <Container>
                <div>
                    <h1>Sale {id}</h1>
                    <h2>Customer</h2>
                    <ListGroup>
                    <ListGroupItem><strong>email:</strong> {Sale.customer.email} </ListGroupItem>
                    <ListGroupItem><strong>age:</strong> {Sale.customer.age} </ListGroupItem>
                    <ListGroupItem><strong>age:</strong> {Sale.customer.satisfaction}/5 </ListGroupItem>
                    </ListGroup>
                    <h2> Items:  ${TotalPrice} </h2>
                </div>
                
                <Table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                       {customer_profiles}
                    </tbody>
                </Table>
            
            </Container>
        </div>
    );
}