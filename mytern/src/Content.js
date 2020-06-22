import React, {useState} from "react";
import Intership from './Intership';


function Content({items}) {


    const [newItems, setItems] = useState(items);
    const [newcompany, setNewcompany] = useState("");
    const [newposition, setNewposition] = useState("");
    const [newdate, setNewdate] = useState("");
    const [newstatus, setNewstatus] = useState("");
    const [newcomment, setNewcomment] = useState("");

  
    const handleSubmit = e => {
        setItems(newItems => [...newItems, {company:newcompany, position:newposition, date:newdate, status:newstatus, comment:newcomment}])
        setNewcompany("")
        setNewposition("")
        setNewdate("")
        setNewstatus("")
        setNewcomment("")
        e.preventDefault();
        // alert(`Submitting Name ${name}`)

    }

    const deleteItems = (company, position) => {
        const newitems = newItems.filter(item =>
            item.company !== company || item.position !== position );
        setItems(newitems)
    }

    return (
        <div className="Sheet">
            <p>this is content hello</p>

            <div className="Sheet-items"> 
                {newItems.map( item=> (
                    <Intership deleteItem={deleteItems} {...item} />
                ))}
            </div>

            <form onSubmit={handleSubmit}>
            <label>
                Company:
                <input
                type="text"
                value={newcompany}
                onChange={e => setNewcompany(e.target.value)}
                />
                Position:
                <input
                type="text"
                value={newposition}
                onChange={e => setNewposition(e.target.value)}
                />
                Date applied:
                <input
                type="text"
                value={newdate}
                onChange={e => setNewdate(e.target.value)}
                />
                Status:
                <input
                type="text"
                value={newstatus}
                onChange={e => setNewstatus(e.target.value)}
                />
                Comment:
                <input
                type="text"
                value={newcomment}
                onChange={e => setNewcomment(e.target.value)}
                />
            </label>
            <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default Content;

