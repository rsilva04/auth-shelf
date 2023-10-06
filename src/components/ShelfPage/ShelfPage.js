import { useState, useEffect } from 'react';
import axios from 'axios';
import './ShelfPage.css';

function ShelfPage() {
  const [shelfList, setShelfList] = useState([]);
  const [itemName, setItemName] = useState('')
  const [image, setImage] = useState('')

  useEffect(() => {
    fetchShelf();
  }, []);

  const fetchShelf = () => {
    axios.get('/api/shelf').then((response) => {
      setShelfList(response.data);
    }).catch((error) => {
      console.log(error);
      alert('Something went wrong.');
    });
  }

  const addItem = (e) => {
    e.preventDefault();
    axios.post('/api/shelf', { description: itemName, image_url: image })
      .then(response => fetchShelf())
      .catch(error => {
        console.error(error);
        alert('Something went wrong.');
      });

    
  }

  return (
    <div className="container">
       <h2>Add an Item</h2>
      <form onSubmit={addItem}>
        Description: <input type="text" value={itemName} onChange={e => setItemName(e.target.value)} />
        <button>Submit</button>
      </form>
      <hr />
      <h2>Shelf</h2>
      <p>All of the available items can be seen here.</p>
      {
        shelfList.length === 0 && (
          <div>No items on the shelf</div>
        )
      }
      {
        shelfList.map(item => {
          return <div className="responsive" key={item.id}>
                    <div className="gallery">
                        <img src={item.image_url} alt={item.description} />
                        <br />
                        <div className="desc">{item.description}</div>
                        <div style={{textAlign: 'center', padding: '5px'}}>
                          <button style={{cursor: 'pointer'}}>Delete</button>
                        </div>
                    </div>
                 </div>
        })
      }
      <div className="clearfix"></div>
    </div>
  );
}

export default ShelfPage;
