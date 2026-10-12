import { useCallback } from 'react'
import { apiBaseUrl, parseCollectionResponse } from '../api.js'
import CollectionPage from './CollectionPage.jsx'

const columns = [
  { label: 'Activity', value: (activity) => activity.type },
  { label: 'User', value: (activity) => activity.user },
  { label: 'Duration (minutes)', value: (activity) => activity.durationMinutes },
  { label: 'Distance (km)', value: (activity) => activity.distanceKm },
  { label: 'Date', value: (activity) => activity.performedAt },
]

export default function Activities() {
  const load = useCallback(
    (signal) => fetch(`${apiBaseUrl}/api/activities/`, { signal }).then(parseCollectionResponse),
    [],
  )

  return (
    <CollectionPage
      columns={columns}
      description="Log movement and celebrate your progress."
      load={load}
      title="Activities"
    />
  )
}
