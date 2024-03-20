import { useStore } from "../../ContextStore"

export default function BulkSelector({toggleSet}) {

  const { bulkSelect } = useStore()

  return (
    <div className="bulk-selectors-container">
    <span className="bulk-select" onClick={() => bulkSelect(toggleSet)}>Select All</span>
    <span className="selector-divider">{' | '}</span>
    <span className="bulk-select" onClick={() => bulkSelect(toggleSet, 'clear')}> Clear </span>
  </div>
  )
}