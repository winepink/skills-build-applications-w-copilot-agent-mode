import { useCallback } from 'react'
import { apiBaseUrl, parseCollectionResponse } from '../api.js'
import CollectionPage from './CollectionPage.jsx'

const columns = [
  { label: 'Workout', value: (workout) => workout.name },
  { label: 'Category', value: (workout) => workout.category },
  { label: 'Difficulty', value: (workout) => workout.difficulty },
  { label: 'Duration (minutes)', value: (workout) => workout.durationMinutes },
  { label: 'Description', value: (workout) => workout.description },
]

export default function Workouts() {
  const load = useCallback(
    (signal) => fetch(`${apiBaseUrl}/api/workouts/`, { signal }).then(parseCollectionResponse),
    [],
  )

  return (
    <CollectionPage
      columns={columns}
      description="Discover ideas for your next session."
      load={load}
      title="Workouts"
    />
  )
}
