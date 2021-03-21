import {useEffect, useState} from 'react';
import{ Container, Table, Pagination, Alert,Spinner,tr, Nav, Navbar, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import {Link, Redirect,Switch, Route} from 'react-router-dom';
import Navigation from './Navigation';
import Load from './LoadData';




export default function Sales({handleView ,rv}) {
   const [recentlyViewed, setRecentlyViewed] = useState([]);
   const [ViewedCounted, setViewedCounted] = useState(0);
   const [customers, setCustomers] = useState([]);
   const[currentPage, setCurrentPage]= useState(1);
   const[totalPages, setTotalPages] = useState(500);
   const [loading, setLoading] = useState(false);
    //hook function , hook the life cicyle of the component,  hook the data first
    useEffect(() => {
      setLoading(true)
        Load(currentPage).then((results) => {
        setCustomers(results)
        
    })
    .finally(()=>setLoading(false));
    if(ViewedCounted!==0){
      setRecentlyViewed(recentlyViewed)
    }
    if(rv.length > recentlyViewed.length){
      setRecentlyViewed(rv)
    }
    
    },[recentlyViewed,currentPage])
    

    let warninglabel =  currentPage === totalPages ? <Alert variant='danger'> This is a last page </Alert>: "";
    const onNextClickHandler = () => {
        if(currentPage === totalPages){
            setCurrentPage(currentPage-1);
        }else{
            setCurrentPage(currentPage+1);
        }
    }

    const onPrevClickHandler = () => {
        if(currentPage === 1){
            setCurrentPage(1);
        }else{
            setCurrentPage(currentPage-1);
        }
    }


    const onClickView  = (cus) =>{
       let tempArray = recentlyViewed;
      tempArray.push(cus);
      setRecentlyViewed(tempArray);
      setViewedCounted(ViewedCounted+1);
      console.log(recentlyViewed);
      console.log(recentlyViewed.length);
      handleView(recentlyViewed)
    }

    const customer_profiles = customers.map(cus => {
      return(
      <tr onClick={()=>onClickView(cus)}>

          <td><Link to={{pathname:`/sale/${cus._id}`}}>{cus.customer.email}</Link></td>
          <td>{cus.storeLocation}</td>
          <td>{cus.items.length}</td>
          <td>{cus.saleDate} </td>    
      </tr>)
  }); 
  
  if(loading){
   return(
   <Spinner animation="border" role="status">
       <span className="sr-only">Loading.....</span>
   </Spinner>
   );
}


    return(
       <div>
         <Navigation recentlyViewed={recentlyViewed} />
       
        <Container>
            <div><h1>Sales</h1></div>
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Store Location</th>
                            <th>Number of Items</th>
                            <th>Sale Date</th>
                        </tr>
                    </thead>
                    <tbody>
                       {customer_profiles}
                    </tbody>
                </Table>
            </div>
            <Pagination>
                <Pagination.Prev onClick={onPrevClickHandler} />
                    <Pagination.Item>
                        {currentPage}
                    </Pagination.Item>
                <Pagination.Next onClick={onNextClickHandler}/>
            </Pagination>
            {warninglabel}
        </Container>
        </div>
    );
}




/*[
        {
           "customer":{
              "gender":"M",
              "age":33,
              "email":"somhis@kerej.bg",
              "satisfaction":1
           },
           "_id":"5bd761deae323e45a93cdcb3",
           "saleDate":"2017-12-31T18:15:34.758Z",
           "items":[
              {
                 "tags":[
                    "writing",
                    "office",
                    "school",
                    "stationary"
                 ],
                 "name":"pens",
                 "price":25.32,
                 "quantity":4
              },
              {
                 "tags":[
                    "office",
                    "writing",
                    "school"
                 ],
                 "name":"notepad",
                 "price":30.05,
                 "quantity":1
              },
              {
                 "tags":[
                    "school",
                    "general",
                    "organization"
                 ],
                 "name":"binder",
                 "price":17.01,
                 "quantity":1
              },
              {
                 "tags":[
                    "writing",
                    "office",
                    "school",
                    "stationary"
                 ],
                 "name":"pens",
                 "price":16.33,
                 "quantity":4
              }
           ],
           "storeLocation":"Austin",
           "couponUsed":false,
           "purchaseMethod":"In store"
        },
        {
           "customer":{
              "gender":"M",
              "age":39,
              "email":"inizuzuk@em.ga",
              "satisfaction":5
           },
           "_id":"5bd761deae323e45a93cdd61",
           "saleDate":"2017-12-31T16:11:17.768Z",
           "items":[
              {
                 "tags":[
                    "writing",
                    "office",
                    "school",
                    "stationary"
                 ],
                 "name":"pens",
                 "price":55.76,
                 "quantity":2
              },
              {
                 "tags":[
                    "writing",
                    "office",
                    "school",
                    "stationary"
                 ],
                 "name":"pens",
                 "price":46.74,
                 "quantity":4
              },
              {
                 "tags":[
                    "office",
                    "writing",
                    "school"
                 ],
                 "name":"notepad",
                 "price":7.8,
                 "quantity":2
              },
              {
                 "tags":[
                    "stationary",
                    "office",
                    "general"
                 ],
                 "name":"envelopes",
                 "price":11.81,
                 "quantity":5
              },
              {
                 "tags":[
                    "stationary",
                    "office",
                    "general"
                 ],
                 "name":"envelopes",
                 "price":5.84,
                 "quantity":8
              },
              {
                 "tags":[
                    "office",
                    "writing",
                    "school"
                 ],
                 "name":"notepad",
                 "price":15.99,
                 "quantity":5
              },
              {
                 "tags":[
                    "school",
                    "travel",
                    "kids"
                 ],
                 "name":"backpack",
                 "price":70.08,
                 "quantity":4
              }
           ],
           "storeLocation":"Seattle",
           "couponUsed":false,
           "purchaseMethod":"Online"
        }
     ]
    

    const customer_profiles = customers.map(cus => {
        return(
        <tr>
            <td>{cus.customer.email}</td>
            <td>{cus.storeLocation}</td>
            <td>{cus.items.length}</td>
            <td>{cus.saleDate} </td>    
        </tr>)
    }); 

                            <Customerprofiles customers = {customers} />
    */