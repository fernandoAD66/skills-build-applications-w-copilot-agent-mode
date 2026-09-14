import { useState, useEffect } from 'react'
import { fetchFromApi } from '../utils/apiClient'

function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadActivities = async () => {
      try {
        setLoading(true)
        const data = await fetchFromApi('/activities/')
        // Handle both array and paginated responses
        const activitiesList = Array.isArray(data) ? data : data.activities || []
        setActivities(activitiesList)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadActivities()
  }, [])

  if (loading) return <div className="container mt-4"><p>Loading activities...</p></div>
  if (error) return <div className="container mt-4"><p className="text-danger">Error: {error}</p></div>

  return (
    <div className="container mt-4">
      <h2>Activities</h2>
      {activities.length === 0 ? (
        <p>No activities found</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>User</th>
              <th>Distance</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity.id}>
                <td>{activity.name}</td>
                <td>{activity.user}</td>
                <td>{activity.distance} km</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Activities
