import React, { useState } from "react";
import { Box, Button, Typography, createTheme, ThemeProvider } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Papa from "papaparse";
import UploadFileIcon from '@mui/icons-material/UploadFile';

const DataTable = ({ onDataLoad }) => {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".csv")) {
      alert("Por favor, suba un archivo CSV.");
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const data = result.data;
        if (data.length > 0) {
          const cols = Object.keys(data[0]).map((key) => ({
            field: key,
            headerName: key,
            width: 150,
          }));
          setColumns(cols);

          const rowsWithId = data.map((row, index) => ({
            id: index,
            ...row,
          }));
          setRows(rowsWithId);

          if (onDataLoad) {
            onDataLoad(data);
          }
        } else {
          console.error("No se encontraron datos en el archivo CSV.");
        }
      },
      error: (error) => {
        console.error("Error al procesar el archivo CSV:", error);
      },
    });
  };

  // Tema personalizado para el DataGrid
  const theme = createTheme({
    components: {
      MuiDataGrid: {
        styleOverrides: {
          root: {
            color: "black", // Color de texto blanco
            backgroundColor: "#282c34", // Fondo oscuro para contraste
          },
          columnHeaders: {
            backgroundColor: "#black", // Fondo de encabezados
            color: "black", // Color del texto de encabezados
          },
          cell: {
            color: "white", // Color de texto de celdas
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: 4 }}>
        {/* Título con color blanco */}
        <Typography variant="h4" gutterBottom sx={{ color: "white" }}>
          Visualización y Cálculo de Energía Renovable
        </Typography>
        <Button variant="contained" component="label" sx={{ marginBottom: 2 }} startIcon={<UploadFileIcon />}>
          Cargar Archivo CSV
          <input type="file" accept=".csv" hidden onChange={handleFileUpload} />
        </Button>
        {rows.length > 0 ? (
          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10, 20, 50]}
            />
          </Box>
        ) : (
          <Typography variant="body1" gutterBottom sx={{ color: "white" }}>No hay datos cargados.</Typography>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default DataTable;
