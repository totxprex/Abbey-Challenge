import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { sortData, columns } from "./data.tsx";
import "./course-analytics-table.css";
import { TAnalyticsScreen } from "../../screens/analytics/course-analytics.tsx";
import { ICourseRanker } from "../../context/interface.ts";

type Prop = {
  data: ICourseRanker[];
  setScreen?: React.Dispatch<React.SetStateAction<TAnalyticsScreen>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

function AnalyticsTable({ data, page, setPage }: Prop) {
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (!data) return;

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", height: "fit-content" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column: any) => (
                <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortData(data)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any, i: number) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                    {columns.map((column: any) => {
                      const value = row[column.id];
                      return (
                        <TableCell style={{ cursor: "pointer" }} onClick={() => {}} key={column.id}>
                          {column?.format && typeof value === "number"
                            ? column?.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={sortData(data).length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export { AnalyticsTable };
