import { useState, useEffect } from 'react'
import { fetchFromApi } from '../utils/apiClient'

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true)
        const data = await fetchFromApi('/users/')
        // Handle both array and paginated responses
        const usersList = Array.isArray(data) ? data : data.users || []
        setUsers(usersList)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  if (loading) return <div className="container mt-4"><p>Loading users...</p></div>
  if (error) return <div className="container mt-4"><p className="text-danger">Error: {error}</p></div>

  return (
    <div className="container mt-4">
      <h2>Users</h2>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <div className="row">
          {users.map((user) => (
            <div key={user.id} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{user.name}</h5>
                  {user.team && <p className="card-text">Team: {user.team}</p>}
                  <p className="card-text text-muted">ID: {user.id}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Users
