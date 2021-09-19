import React, { useState } from 'react'
import { useAsyncDebounce } from 'react-table'

type GlobalFilterProps = {
    filter: string, 
    setFilter: (filter: string) => void
}

export const GlobalFilter = ({filter, setFilter}: GlobalFilterProps) => {
    const [value, setValue] = useState(filter)
    // https://react-table.tanstack.com/docs/faq#how-can-i-debounce-rapid-table-state-changes
    const onChange = useAsyncDebounce(value => {
        setFilter(value || undefined)
    }, 300)

    return (
        <span>
            Search results: {' '}
            <input value={value || ''} 
            onChange = {(event: { target: { value: any } }) => 
                {
                    setValue(event.target.value)
                    onChange(event.target.value)
                }
            } />
        </span>
    )
}
