import React from 'react';
import ListServiceItems from './ListServiceItems.jsx'


const ListServices = (props) => (
  <div>
    <h4> Services </h4>
    Total number of services:  { props.services.length }
    { props.services.map((service, idx) => <ListServiceItems key={idx} service={service}/>)}
  </div>
)





export default ListServices;