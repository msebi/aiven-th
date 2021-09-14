import React, { useMemo } from 'react'
import { useTable } from 'react-table'
import { PANEL_COLUMNS } from './PanelColumns';
import './CloudSelectionPanel.css'
import { GetCloudServiceProviders } from '../../hooks/GetCloudServiceProviders';

export const CloudSelectionPanel = () => {
    // Memoize don't recreate table on every render 
    const cloudProviders = GetCloudServiceProviders().clouds
    const columns = useMemo(() => PANEL_COLUMNS, [])
    const data = useMemo(() => cloudProviders, [cloudProviders])

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


