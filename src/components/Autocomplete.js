import {useState, useEffect, useRef} from 'react'
import {loadGooglePlaces, handleScriptLoad} from '../utils/googlePlacesScript';

export default function Autocomplete() {

    // const [items, setItems] = useState([]);
    const [query, setQuery] = useState('');

    const inputRef = useRef();

    useEffect(() => {
        loadGooglePlaces(() => handleScriptLoad(setQuery, inputRef));
    }, [])

    // const data = [
    //     {'text': 'Abhijeet Mahavarkar'},
    //     {'text': 'Test Again'},
    //     {'text': 'lorem ipsum'},
    //     {'text': 'little good'},
    //     {'text': 'youtube good'},
    //     {'text': 'ui god'}
    // ];

    // function search(e) {
    //     console.log(e.target.value);
    //     setItems(data.filter(item => item.text.includes(e.target.value)));
    //     console.log(items);
    // }
    return (
        <div className="autocomplete">
            <input type="search" name="search" placeholder="Search for Google Place" onChange={event => setQuery(event.target.value)} ref={inputRef}  value={query} />
            <ul className="result-list shadow-lg" id="result-list">
                {/* {items.map((item, index) => <li key={index} className="result-item">{item.text}</li>)} */}
            </ul>
        </div>
        )
    }
