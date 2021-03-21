import Navigation from './Navigation';
import {Link,Switch, Route} from 'react-router-dom';
import {useEffect, useState} from 'react';

import{ Container } from 'react-bootstrap'

export default function NotFound({handleView,recentlyViewed}) {
    handleView(recentlyViewed);

    useEffect(() => {

    },[recentlyViewed])

    return(
        <div>
        <Navigation recentlyViewed={recentlyViewed} />
        <Container>
            <div><h1>Not found</h1></div>
        </Container>
        </div>
    );
}