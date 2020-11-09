import React, { useContext } from 'react';
import { ListContext } from '../context/ListContext';
import { Link } from 'react-router-dom';
import calculateEstimate from '../lib/estimates';

const ViewList = () => {
  // If the list is empty, add a prompt and link to Add Items
  let currentList = useContext(ListContext);
  
  const [itemsPurchased, setItemsPurchased] = useState({});
  const [filterValue, setFilterValue] = useState('');
  const [filteredList, setFilteredList] = useState([]);

  const handleCheck = async (e) => {
    const timeNow = new Date().getTime() / 1000;
    // retrieve event information
    let docId = e.target.id;
    let currentRef = currentList.itemsRef.doc(docId);

    //find context for current item
    const currentItem = currentList.userList.find((item) => {
      return item.id == docId;
    });

    // store current item data
    const numberOfPurchases = currentItem.numberOfPurchases
      ? currentItem.numberOfPurchases + 1
      : 1;
    let lastEstimate = parseInt(currentItem.lastEstimate);
    let latestInterval;
    let lastPurchased;

    // if item has been purchased more than two times, calculate the last interval
    if (numberOfPurchases > 2) {
      lastPurchased = currentItem.lastPurchased.seconds;
      latestInterval = Math.ceil((timeNow - lastPurchased) / (24 * 60 * 60));
    } else {
      latestInterval = parseInt(currentItem.lastEstimate);
    }

    lastEstimate = calculateEstimate(
      lastEstimate,
      latestInterval,
      numberOfPurchases,
    );

    return currentRef
      .update({
        lastPurchased: new Date(),
        lastEstimate: lastEstimate,
        numberOfPurchases: numberOfPurchases,
      })
      .then(function () {
        console.log('Document successfully updated!');
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error('Error updating document: ', error);
      });
  };
  
  const handleClearClick = () => {
    setFilterValue('');
  };


  useEffect(() => {
    setFilteredList(currentList.userList);
  }, [currentList.userList]);

  const handleSearchChange = (e) => {
    setFilterValue(e.target.value);
  };

  useEffect(() => {
    let listFilter = currentList.userList;
    let filtered =
      listFilter &&
      listFilter.filter((item) => {
        return item.itemName.toLowerCase().includes(filterValue.toLowerCase());
      });
    setFilteredList(filtered);
  }, [filterValue]);

  return (
    <div>
      <h1>View List</h1>
      <label htmlFor="search">Type to Search</label>
      <input
        type="search"
        name="search"
        id="search"
        value={filterValue}
        onChange={handleSearchChange}
      />
      <label htmlFor="Clear" aria-label="Clear search bar"></label>
      <button onClick={handleClearClick}>Clear</button>
      <ul>
        {currentList.userList.length > 0 ? (
          filteredList.map((element, index) => (
            <div key={element.id}>
              <input
                type="checkbox"
                name={element.itemName}
                id={element.id}
                value={element.itemName}
                className="purchased"
                onChange={handleCheck}
                checked={element.isPurchased}
              ></input>
              <li> {element.itemName} </li>
            </div>
          ))
        ) : (
          <div>
            <p> You don't have any items</p>
            <Link to="/add-items">Add your first item!</Link>
          </div>
        )}
      </ul>
    </div>
  );
};

export default ViewList;
