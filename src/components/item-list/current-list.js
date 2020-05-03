import React from 'react';

import './current-list.css'

const CurrentList = ({ list, onItemSelected, renderItem }) => {
    const lis = list.map((item) => {

        const { id } = item;
        const label = renderItem(item);

        return (
            <li key={id}
                className="list-group-item"
                onClick={() => onItemSelected(id)}>
                {label}
            </li>
        )
    });

    return(
        <React.Fragment>
            <ul className="current-list list-group">
                { lis }
            </ul>
        </React.Fragment>
     );
}
export default CurrentList