import React, {useState} from "react";

function Intership({company, position, date, status, comment, deleteItem}) {
    const deleteitem = () => {
        deleteItem(company, position)
    }
    return (
        <div className="Sheet-items">
            <p>
                company: {company}, 
                position: {position}, 
                date: {date}, 
                status: {status},
                comment: {comment} 
            </p>
            <button onClick={deleteitem}>Delete</button>
        </div>
    )
}

export default Intership;