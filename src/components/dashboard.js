import React from 'react';

const Dashboard = props => (
    <ul>
      {
        props.items.map((item, index) => 
        <li key={index}>
                 {item.firstname} | {item.lastname} | {item.username} | {item.email}          
         </li>)   
      }
    </ul>  
);

  export default Dashboard;
