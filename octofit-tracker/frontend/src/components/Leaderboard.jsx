import { useState, useEffect } from 'react'
import { fetchFromApi } from '../utils/apiClient'

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        setLoading(true)
        const data = await fetchFromApi('/leaderboard')
        // Handle both array and paginated responses
        const leaderboardData = Array.isArray(data) ? data : data.leaderboard || []
        setLeaderboard(leaderboardData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadLeaderboard()
  }, [])

  if (loading) return <div className="container mt-4"><p>Loading leaderboard...</p></div>
  if (error) return <div className="container mt-4"><p className="text-danger">Error: {error}</p></div>

  return (
    <div className="container mt-4">
      <h2>Leaderboard</h2>
      {leaderboard.length === 0 ? (
        <p>No leaderboard data available</p>
      ) : (
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Points</th>
              <th>Activities</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={entry.id}>
                <td><strong>#{index + 1}</strong></td>
                <td>{entry.name || entry.user}</td>
                <td>{entry.points || entry.score || 0}</td>
                <td>{entry.activities || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Leaderboard
