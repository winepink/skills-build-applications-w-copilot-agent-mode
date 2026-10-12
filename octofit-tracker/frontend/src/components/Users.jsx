import { useCallback } from 'react'
import { apiBaseUrl, parseCollectionResponse } from '../api.js'
import CollectionPage from './CollectionPage.jsx'

const columns = [
  { label: 'Name', value: (user) => user.name },
  { label: 'Email', value: (user) => user.email },
  { label: 'Team', value: (user) => user.team },
]

export default function Users() {
  const load = useCallback(
    (signal) => fetch(`${apiBaseUrl}/api/users/`, { signal }).then(parseCollectionResponse),
    [],
  )

  return (
    <CollectionPage
      columns={columns}
      description="Meet the people on your OctoFit team."
      load={load}
      title="Users"
    />
  )
}
