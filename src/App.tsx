import { useState, useEffect } from 'react'

import { fetchUsers } from "./usersSlice"
import { addFavorite, removeFavorite } from "./favoritesSlice";
import { useAppDispatch, useAppSelector, useDebounce } from "./hooks";
import type { User } from "./types";
import './App.css'

function initials(name: string) {
  return name
    .split(' ')
    .map(part => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function App() {

  const dispatch = useAppDispatch();
  const { data: users, loading, error } = useAppSelector(state => state.users);
  const favorites = useAppSelector(state => state.favorites);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const query = debouncedSearch.trim().toLowerCase();
  const filteredUsers = users
    .filter(user => user.name.toLowerCase().includes(query))
    .sort((a, b) => a.name.localeCompare(b.name))

  const favoriteIds = new Set(favorites.map(user => user.id));

  return (
    <div className="page">
      <header className="masthead">
        <p className="eyebrow">Betternship — Directory</p>
        <h1>
          User <em>Directory</em>
        </h1>
        <div className="masthead-meta">
          <label className="search">
            <span className="search-icon" aria-hidden="true">⌕</span>
            <input
              placeholder="Search users by name"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </label>
          <span className="count">
            {loading ? '—' : String(filteredUsers.length).padStart(2, '0')} listed
          </span>
        </div>
      </header>

      <main className="layout">
        <section className="directory">
          {loading && <p className="state">Loading users…</p>}
          {error && <p className="state state-error">Error: {error}</p>}
          {!loading && !error && filteredUsers.length === 0 && (
            <p className="state">No users match “{debouncedSearch}”.</p>
          )}

          <ul className="user-list">
            {filteredUsers.map((user, i) => (
              <li
                key={user.id}
                className="user-row"
                style={{ '--i': i } as React.CSSProperties}
              >
                <button
                  className="user-open"
                  onClick={() => setSelectedUser(user)}
                >
                  <span className="monogram">{initials(user.name)}</span>
                  <span className="user-text">
                    <span className="user-name">{user.name}</span>
                    <span className="user-email">{user.email}</span>
                  </span>
                  <span className="user-company">{user.company.name}</span>
                </button>
                <button
                  className="add-btn"
                  disabled={favoriteIds.has(user.id)}
                  onClick={() => dispatch(addFavorite(user))}
                >
                  {favoriteIds.has(user.id) ? 'Saved' : 'Save'}
                </button>
              </li>
            ))}
          </ul>
        </section>

        <aside className="favorites">
          <div className="favorites-head">
            <h2>Favorites</h2>
            <span className="count">{String(favorites.length).padStart(2, '0')}</span>
          </div>
          {favorites.length === 0 ? (
            <p className="state state-quiet">No favorites yet. Save someone from the list.</p>
          ) : (
            <ul className="fav-list">
              {favorites.map(user => (
                <li key={user.id} className="fav-row">
                  <span className="monogram monogram-sm">{initials(user.name)}</span>
                  <span className="fav-name">{user.name}</span>
                  <button
                    className="remove-btn"
                    aria-label={`Remove ${user.name}`}
                    onClick={() => dispatch(removeFavorite(user.id))}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </main>

      {selectedUser && (
        <div className="scrim" onClick={() => setSelectedUser(null)}>
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="modal-close"
              aria-label="Close"
              onClick={() => setSelectedUser(null)}
            >
              ×
            </button>
            <span className="monogram monogram-lg">{initials(selectedUser.name)}</span>
            <h3>{selectedUser.name}</h3>
            <p className="modal-sub">{selectedUser.company.name}</p>

            <dl className="detail">
              <div>
                <dt>Phone</dt>
                <dd>{selectedUser.phone}</dd>
              </div>
              <div>
                <dt>Website</dt>
                <dd>{selectedUser.website}</dd>
              </div>
              <div>
                <dt>Address</dt>
                <dd>{selectedUser.address.street}, {selectedUser.address.city}</dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
