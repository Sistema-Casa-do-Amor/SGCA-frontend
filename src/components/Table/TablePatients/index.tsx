import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, IconButton } from "@mui/material"
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Column {
    id: 'nome' | 'cpf' | 'nome-da-mae' | 'acoes';
    label: string;
    minWidth?: number;
    align?: 'center';
}

const columns: readonly Column[] = [
    { id: 'nome', label: 'Nome', minWidth: 170 },
    { id: 'cpf', label: 'CPF', minWidth: 170 },
    { id: 'nome-da-mae', label: 'Nome da mãe', minWidth: 170 },
    { id: 'acoes', label: 'Ações', minWidth: 170, align: 'center' },
]

const rows = [
    { id: 1, name: 'José Silva', cpf: '123456789', date: '10/05/2005' },
    { id: 2, name: 'José Fernandes', cpf: '123456789', date: '10/05/2005' },
    { id: 3, name: 'José Santos', cpf: '123456789', date: '10/05/2005' },
    { id: 4, name: 'José Mendes', cpf: '123456789', date: '10/05/2005' },
    { id: 5, name: 'José Novaes', cpf: '123456789', date: '10/05/2005' },
    { id: 6, name: 'José Pereira', cpf: '123456789', date: '10/05/2005' },
    { id: 7, name: 'José Guimarães', cpf: '123456789', date: '10/05/2005' },
    { id: 8, name: 'José Campos', cpf: '123456789', date: '10/05/2005' },
    { id: 9, name: 'José Vieira', cpf: '123456789', date: '10/05/2005' },
    { id: 10, name: 'José Queiroz', cpf: '123456789', date: '10/05/2005' },
    { id: 11, name: 'José Luz', cpf: '123456789', date: '10/05/2005' },
]

const TablePatients = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const delay = 1000;

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    // Passar o paciente a partir do id 
    const handleViewMedicalRecords = (id: number) => {
        console.log('Visualizar ID: ', id);
        setTimeout(() => {
            navigate("/patient/information", {
                state: { patientId: id }
            });
        }, delay);
    }

    const handleEdit = (id: number) => {
        console.log('Editar ID: ', id);
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: 2 }}>
            <TableContainer sx={{ maxHeight: 440 }} >
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, backgroundColor: '#ccc' }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.cpf}</TableCell>
                                        <TableCell>{row.date}</TableCell>
                                        <TableCell align="center">
                                            <IconButton color="primary"
                                                onClick={() => handleViewMedicalRecords(row.id)}
                                                aria-label="visualizar"
                                            >
                                                <VisibilityIcon />
                                            </IconButton>
                                            <IconButton color="success"
                                                onClick={() => handleEdit(row.id)}
                                                aria-label="editar"
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
}

export default TablePatients;