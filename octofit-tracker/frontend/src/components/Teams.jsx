import { useState, useEffect } from 'react'
import { fetchFromApi } from '../utils/apiClient'

function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadTeams = async () => {
      try {
        setLoading(true)
        const data = await fetchFromApi('/teams/')
        // Handle both array and paginated responses
        const teamsList = Array.isArray(data) ? data : data.teams || []
        setTeams(teamsList)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadTeams()
  }, [])

  if (loading) return <div className="container mt-4"><p>Loading teams...</p></div>
  if (error) return <div className="container mt-4"><p className="text-danger">Error: {error}</p></div>

  return (
    <div className="container mt-4">
      <h2>Teams</h2>
      {teams.length === 0 ? (
        <p>No teams found</p>
      ) : (
        <div className="row">
          {teams.map((team) => (
            <div key={team.id} className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  {team.members && <p className="card-text">Members: {team.members}</p>}
                  {team.description && <p className="card-text text-muted">{team.description}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Teams
