import React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import { Table as TableMUI } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

function Row({ row, handleClick }) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            color="primary"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="left">{row.objective}</TableCell>
        <TableCell align="left">{row.domain}</TableCell>
        <TableCell align="left">{row.planning_type}</TableCell>
        <TableCell align="right">
          <IconButton color="primary" onClick={() => handleClick(row.id)}>
            <AutoGraphIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant="h6"
                fontWeight={600}
                gutterBottom
                component="div"
              >
                Tareas
              </Typography>
              <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                <TableMUI size="small" aria-label="purchases">
                  <TableBody>
                    {row.tasks.map((taskRow, index) => (
                      <TableRow key={taskRow.id}>
                        <TableCell component="th" scope="row">
                          {index + 1} - {taskRow.name}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </TableMUI>
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function ActivitiesTable({ rows, handleClick }) {
  return (
    <TableContainer component={Paper}>
      <TableMUI aria-label="collapsible table">
        <TableHead>
          <TableRow sx={{ fontWeight: "600" }}>
            <TableCell />
            <TableCell>Actividad</TableCell>
            <TableCell align="left">Objetivo</TableCell>
            <TableCell align="left">Dominio</TableCell>
            <TableCell align="left">Planificacion</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.id} row={row} handleClick={handleClick} />
          ))}
        </TableBody>
        {rows.length === 0 && (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6} sx={{ fontWeight: "600" }}>
                No hay actividades creadas en DEHIA
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </TableMUI>
    </TableContainer>
  );
}
