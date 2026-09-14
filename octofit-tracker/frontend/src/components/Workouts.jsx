import { useState, useEffect } from 'react'
import { fetchFromApi } from '../utils/apiClient'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        setLoading(true)
        const data = await fetchFromApi('/api/workouts/')
        // Handle both array and paginated responses
        const workoutsList = Array.isArray(data) ? data : data.workouts || []
        setWorkouts(workoutsList)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadWorkouts()
  }, [])

  if (loading) return <div className="container mt-4"><p>Loading workouts...</p></div>
  if (error) return <div className="container mt-4"><p className="text-danger">Error: {error}</p></div>

  return (
    <div className="container mt-4">
      <h2>Workouts</h2>
      {workouts.length === 0 ? (
        <p>No workouts found</p>
      ) : (
        <div className="row">
          {workouts.map((workout) => (
            <div key={workout.id} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{workout.name}</h5>
                  {workout.duration && <p className="card-text">Duration: {workout.duration} min</p>}
                  {workout.intensity && <p className="card-text">Intensity: {workout.intensity}</p>}
                  {workout.type && <p className="card-text text-muted">Type: {workout.type}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Workouts
