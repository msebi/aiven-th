import React, { useMemo } from 'react'
import { useTable } from 'react-table'
import { PANEL_COLUMNS } from './PanelColumns';
import stubdata from './stubdata.json'
import './CloudSelectionPanel.css'

export const CloudSelectionPanel = () => {
    // Memoize don't recreate table on every render 
    const columns = useMemo(() => PANEL_COLUMNS, [])
    const data = useMemo(() => stubdata, [])

    const tableObject = useTable({
        columns,
        data
    })

    // Get hooks for table creation
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableObject

    return (
        <table {...getTableProps()}>
            <thead>
                {
                    headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>
                                        {
                                            column.render('Header')
                                        }
                                    </th>
                                ))
                            }
                        </tr>
                    ))
                }
            </thead>
            <tbody {...getTableBodyProps()}>
                {
                    rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {
                                    row.cells.map(cell => {
                                        return (<td {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>)
                                    })
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    );
}


