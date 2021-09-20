import React, { useMemo } from 'react'
// TODO:
// react-table-config.d.ts must always be placed in /src/types/ directory
// https://github.com/tannerlinsley/react-table/issues/2970#issuecomment-790751558
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table'
import { PANEL_COLUMNS } from './PanelColumns';
import './CloudSelectionPanel.css'
import { GetCloudServiceProviders } from '../../hooks/GetCloudServiceProviders';
import { GlobalFilter } from './GlobalFilter';

export const CloudSelectionPanel = () => {
    // Memoize don't recreate table on every render 
    const cloudProviders = GetCloudServiceProviders().clouds
    console.log('cloudProviders: ', cloudProviders)
    const columns = useMemo(() => PANEL_COLUMNS, [])
    const data = useMemo(() => cloudProviders, [cloudProviders])    

    // Get hooks for table creation
    const {
        getTableProps,
        getTableBodyProps,    
        headerGroups,
        page,
        nextPage,
        canNextPage,
        previousPage,
        canPreviousPage,
        pageOptions,    
        gotoPage,
        pageCount,    
        setPageSize,
        prepareRow,
        // Table state
        state,
        setGlobalFilter,
    } = useTable({
        columns,
        data,
        initialState : {
            pageIndex : 0
        }
    },
    // https://react-table.tanstack.com/docs/api/useGlobalFilter#useglobalfilter
    useGlobalFilter,
    // https://github.com/tannerlinsley/react-table/issues/2970
    useSortBy,
    // https://react-table.tanstack.com/docs/api/usePagination#usepagination
    usePagination)

    // Get global filter from state
    const { globalFilter, pageIndex, pageSize } = state

    return (
        cloudProviders.length ? 
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
                        page.map(row => {
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
            <div>
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <span>
                    : Go to page: {' '}
                    <input type='number' defaultValue={pageIndex + 1}
                        onChange={(event) => {
                            const pageNumber = event.target.value ? Number(event.target.value) - 1 : 0
                            gotoPage(pageNumber)
                        }}
                        style={{ width: '100px'}}/>
                </span>
                <select value={pageSize} onChange={(event) => setPageSize(Number(event.target.value))}>
                    {
                        [10, 25, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))
                    }
                </select>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    Prev
                </button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    Next
                </button>
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>
            </div>
        </> : <>
            <p>
                Fetching clouds providers ... 
            </p>     
        </>
    );    
}


