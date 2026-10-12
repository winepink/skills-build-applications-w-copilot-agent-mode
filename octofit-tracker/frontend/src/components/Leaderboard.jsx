import { useCallback } from 'react'
import { apiBaseUrl, parseCollectionResponse } from '../api.js'
import CollectionPage from './CollectionPage.jsx'

const columns = [
  { label: 'User', value: (entry) => entry.user },
  { label: 'Team', value: (entry) => entry.team },
  { label: 'Period', value: (entry) => entry.period },
  { label: 'Points', value: (entry) => entry.points },
]

export default function Leaderboard() {
  const load = useCallback(
    (signal) => fetch(`${apiBaseUrl}/api/leaderboard/`, { signal }).then(parseCollectionResponse),
    [],
  )

  return (
    <CollectionPage
      columns={columns}
      description="See how your team effort adds up."
      load={load}
      title="Leaderboard"
    />
  )
}
