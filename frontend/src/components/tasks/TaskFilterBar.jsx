const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'completed', label: 'Completed' },
]

export function TaskFilterBar({ activeFilter, onFilterChange }) {
  return (
    <section className="filter-bar" aria-labelledby="status-filters-heading" id="status-filters">
      <div className="section-heading compact">
        <h3 id="status-filters-heading">Status filters</h3>
      </div>
      <div className="filter-actions" role="tablist" aria-label="Task filters">
        {FILTERS.map((filter) => (
          <button
            aria-pressed={activeFilter === filter.key}
            className={activeFilter === filter.key ? 'filter-button active' : 'filter-button'}
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            type="button"
          >
            {filter.label}
          </button>
        ))}
      </div>
    </section>
  )
}
