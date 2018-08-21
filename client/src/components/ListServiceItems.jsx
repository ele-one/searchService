import React from 'react';


const ListServiceItems = (props) => (
  <li>
    <b> Service Name:</b> { props.service.name }  <b>URL:</b> { props.service.protocol }://{ props.service.address }:{props.service.port} <b>Is Alive?:</b> { props.service.live.toString() }
  </li>
)

export default ListServiceItems ;