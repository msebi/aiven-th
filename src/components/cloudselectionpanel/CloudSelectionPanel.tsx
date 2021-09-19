import React, { useMemo } from 'react'
// TODO:
// react-table-config.d.ts must always be placed in /src/types/ directory
// https://github.com/tannerlinsley/react-table/issues/2970#issuecomment-790751558
import { useTable, useSortBy, useGlobalFilter } from 'react-table'
import { PANEL_COLUMNS } from './PanelColumns';
import './CloudSelectionPanel.css'
import { GetCloudServiceProviders } from '../../hooks/GetCloudServiceProviders';
import { GlobalFilter } from './GlobalFilter';

export const CloudSelectionPanel = () => {
    // Memoize don't recreate table on every render 
    const cloudProviders = GetCloudServiceProviders().clouds
    const columns = useMemo(() => PANEL_COLUMNS, [])
    const data = useMemo(() => cloudProviders, [cloudProviders])    

    // Get hooks for table creation
    const {
        getTableProps,
        getTableBodyProps,    
        headerGroups,
        rows,
        prepareRow,
        // Table state
        state,
        setGlobalFilter,
    } = useTable({
        columns,
        data
    },
    useGlobalFilter,
    // https://github.com/tannerlinsley/react-table/issues/2970
    useSortBy)

    // Get global filter from state
    const { globalFilter } = state

    return (
        <>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
            <table {...getTableProps()}>
                <thead>
                    {
                        headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map(column => (
                                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                            {
                                                column.render('Header')
                                            }
                                            <span>
                                                {column.isSorted
                                                ? column.isSortedDesc
                                                    ? " 🔽"
                                                    : " 🔼"
                                                : ""}
                                            </span>
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
        </>
    );    
}


