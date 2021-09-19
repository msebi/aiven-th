import React from 'react'

type GlobalFilterProps = {
    filter: string, 
    setFilter: (filter: string) => void
}

export const GlobalFilter = ({filter, setFilter}: GlobalFilterProps) => {
    return (
        <span>
            Search results: {' '}
            <input value={filter || ''} 
            onChange = {(event: { target: { value: any } }) => setFilter(event.target.value)} />
        </span>
    )
}
