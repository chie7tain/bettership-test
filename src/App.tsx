import { useState,useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux";

import {fetchUsers} from "./usersSlice"
import {addFavorite, removeFavorite} from "./favoritesSlice";


function App() {

  const dispatch = useDispatch();
  const {data:users,loading, error} = useSelector(state => state.users);
  const favorites = useSelector(state => state.favorites);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const filteredUsers = users.filter(user => user.name.toLowerCase().includes(search.toLowerCase())).sort((a,b) => a.name.localeCompare(b.name))

  return (
    <div>
      <h1>User Management Dashboard </h1>
      <input
        placeholder="Search users by name"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {loading && <p>Loading users ...</p>}
      {error && <p>Error: {error}</p>}

      <ul>
        {
          filteredUsers.map(user => (
            <li key={user.id}>
              <span onClick={() => setSelectedUser(user)} style={{cursor:'pointer'}}>
                {user.name} ({user.email}) - {user.company.name}
              </span>
              <button onClick={()=> dispatch(addFavorite(user))}>Add to Favorites</button>
            </li>
          ))
        }
      </ul>

      <h2>Favorites</h2>
      <ul>
        {favorites.map( user => (
          <li key={user.id}>
            {user.name}
            <button onClick={()=> dispatch(removeFavorite(user.id))}>Remove</button>
          </li>
        ))}
      </ul>

      {
        selectedUser && (
          <div className="modal">
            <h3>{selectedUser.name}</h3>
            <p>Phone:{selectedUser.phone}</p>
           <p>Website:{selectedUser.website}</p>
            <p>Company:{selectedUser.company.name}</p>
            <p>Address: {selectedUser.address.city}, {selectedUser.address.street}</p>

            <button onClick={() => setSelectedUser(null)}>Close</button>
          </div>
        )
      }
    </div>
  )
}

export default App
