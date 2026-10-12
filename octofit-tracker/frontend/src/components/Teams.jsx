import { useCallback } from 'react'
import { apiBaseUrl, parseCollectionResponse } from '../api.js'
import CollectionPage from './CollectionPage.jsx'

const columns = [
  { label: 'Team', value: (team) => team.name },
  { label: 'Members', value: (team) => team.members },
  { label: 'Points', value: (team) => team.points },
]

export default function Teams() {
  const load = useCallback(
    (signal) => fetch(`${apiBaseUrl}/api/teams/`, { signal }).then(parseCollectionResponse),
    [],
  )

  return (
    <CollectionPage
      columns={columns}
      description="Find your people and keep each other moving."
      load={load}
      title="Teams"
    />
  )
}
