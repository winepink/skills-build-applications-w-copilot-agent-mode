import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function displayValue(value) {
  if (value === null || value === undefined || value === '') {
    return '—'
  }
  if (Array.isArray(value)) {
    return value.map(displayValue).join(', ')
  }
  if (typeof value === 'object') {
    return displayValue(value.name ?? value.email ?? value._id ?? '[Record]')
  }
  return String(value)
}

export default function CollectionPage({ title, description, load, columns }) {
  const [state, setState] = useState({ status: 'loading', records: [], error: '' })

  useEffect(() => {
    const controller = new AbortController()

    load(controller.signal)
      .then((records) => setState({ status: 'loaded', records, error: '' }))
      .catch((error) => {
        if (!controller.signal.aborted) {
          setState({
            status: 'error',
            records: [],
            error: error instanceof Error ? error.message : 'Unable to load this collection',
          })
        }
      })

    return () => controller.abort()
  }, [load])

  return (
    <main className="container py-5">
      <p className="eyebrow mb-2">OctoFit Tracker</p>
      <h1 className="display-6 fw-bold">{title}</h1>
      <p className="text-body-secondary">{description}</p>

      {state.status === 'loading' && (
        <p aria-live="polite" className="text-body-secondary">Loading {title.toLowerCase()}…</p>
      )}

      {state.status === 'error' && (
        <div className="alert alert-danger" role="alert">
          Could not load {title.toLowerCase()}: {state.error}
        </div>
      )}

      {state.status === 'loaded' && state.records.length === 0 && (
        <p className="alert alert-info">No {title.toLowerCase()} found yet.</p>
      )}

      {state.status === 'loaded' && state.records.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                {columns.map(({ label }) => <th key={label} scope="col">{label}</th>)}
              </tr>
            </thead>
            <tbody>
              {state.records.map((record, index) => (
                <tr key={record._id ?? record.id ?? `${title}-${index}`}>
                  {columns.map(({ label, value }) => (
                    <td key={label}>{displayValue(value(record))}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Link className="btn btn-outline-primary mt-2" to="/">Back to dashboard</Link>
    </main>
  )
}
