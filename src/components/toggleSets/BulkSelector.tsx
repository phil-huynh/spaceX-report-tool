import { useStore } from "../../ContextStore"

export default function BulkSelector({toggleSet}: {toggleSet: string}) {

  const { bulkSelect } = useStore()
  if (!bulkSelect) throw new Error('function cannot be undefined')

  return (
    <div className="bulk-selectors-container">
    <span className="bulk-select" onClick={() => bulkSelect(toggleSet, '')}>Select All</span>
    <span className="selector-divider">{' | '}</span>
    <span className="bulk-select" onClick={() => bulkSelect(toggleSet, 'clear')}> Clear </span>
  </div>
  )
}