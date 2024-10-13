import { useTable, useSortBy, usePagination, useGlobalFilter, Column, TableState } from 'react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TableFooter,
  TablePagination,
  Paper,
  IconButton,
  InputBase,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';

const StyledTableContainer = styled(TableContainer)({
  overflowX: 'auto',
});

const StyledTableCell = styled(TableCell)({
  whiteSpace: 'nowrap',
});

const StyledHeaderCell = styled(TableCell)({
  fontWeight: 'bold',
  whiteSpace: 'nowrap',
});

const SearchBar = styled('div')({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'hsl(0, 0%, 97.25490196078431%)',
  borderRadius: '60px',
  padding: '0 10px',
  margin: '10px 0',
  width: '100%',
  maxWidth: '300px',
});

interface CustomTableProps<T extends { id: number }> {
  columns: Column<T>[];
  data: T[];
}

const CustomTable = <T extends { id: number }>({ columns, data }: CustomTableProps<T>) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    setGlobalFilter,
    state,
    gotoPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  return (
    <div>
      <div className="flex justify-end">
        <SearchBar>
          <IconButton type="submit" sx={{ p: '10px' }}>
            <SearchIcon style={{ color: '#B0B3B8' }} />
          </IconButton>
          <InputBase
            placeholder="Search for items"
            sx={{ ml: 1, flex: 1, color: '#B0B3B8' }}
            value={(state as TableState<T>).globalFilter || ''}
            onChange={(e) => setGlobalFilter(e.target.value || undefined)}
          />
        </SearchBar>
      </div>
      <Paper>
        <StyledTableContainer>
          <Table {...getTableProps()}>
            <TableHead>
              {headerGroups.map((headerGroup) => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <StyledHeaderCell {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render('Header')}
                      <TableSortLabel active={column.isSorted} direction={column.isSortedDesc ? 'desc' : 'asc'} />
                    </StyledHeaderCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <TableRow {...row.getRowProps({ key: row.original.id })}>
                    {row.cells.map((cell) => (
                      <StyledTableCell {...cell.getCellProps()}>{cell.render('Cell')}</StyledTableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 20]}
                  count={data.length}
                  rowsPerPage={state.pageSize}
                  page={state.pageIndex}
                  onPageChange={(_, newPage) => gotoPage(newPage)}
                  onRowsPerPageChange={(e) => setPageSize(Number(e.target.value))}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </StyledTableContainer>
      </Paper>
    </div>
  );
};

export default CustomTable;
