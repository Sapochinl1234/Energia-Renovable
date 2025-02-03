import React, { useState, useEffect } from "react";
import { Box, Typography, Snackbar, MenuItem, Select } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Papa from "papaparse";
import MuiAlert from "@mui/material/Alert";
import "./DataTable.css";

// Si la imagen está en src/imagenes
import gggImage from "../imagenes/ggg.jpg"; // Ajusta la ruta de la imagen

const csvFiles = [
  { label: "Energía Renovable Compartida", file: "renewable-share-energy1.csv" },
  { label: "Participación Solar en Energía", file: "solar-share-energy.csv" },
  { label: "Consumo de Energía Solar", file: "solar-energy-consumption.csv" },
  { label: "Capacidad Solar PV Instalada", file: "installed-solar-PV-capacity.csv" },
  { label: "Electricidad Solar Compartida", file: "share-electricity-solar.csv" },
];

const DataTable = ({ onDataLoad }) => {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [selectedFile, setSelectedFile] = useState(csvFiles[0].file);

  useEffect(() => {
    handleLoadData(selectedFile);
  }, [selectedFile]);

  const handleLoadData = (file) => {
    fetch(`/${file}`)
      .then((response) => response.text())
      .then((csvText) => handleCSVData(csvText))
      .catch((error) => console.error("Error al cargar el archivo CSV:", error));
  };

  const handleCSVData = (csvText) => {
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const data = result.data;
        if (data.length > 0) {
          const cols = Object.keys(data[0]).map((key) => ({
            field: key,
            headerName: key,
            minWidth: 200,
            flex: 1,
            headerClassName: "custom-header",
          }));
          setColumns(cols);

          const rowsWithId = data.map((row, index) => ({ id: index, ...row }));
          setRows(rowsWithId);

          if (onDataLoad) {
            onDataLoad(data);
          }
          setOpenSnackbar(true);
        }
      },
    });
  };

  return (
    <Box className="data-table-container" style={{ backgroundImage: `url(${gggImage})` }}>
      <Typography variant="h4" className="data-table-title">
        Visualización de Datos Energéticos
      </Typography>

      <Select
        value={selectedFile}
        onChange={(e) => setSelectedFile(e.target.value)}
        className="data-table-select"
      >
        {csvFiles.map((csv) => (
          <MenuItem key={csv.file} value={csv.file}>
            {csv.label}
          </MenuItem>
        ))}
      </Select>

      {rows.length > 0 ? (
        <Box className="data-table-wrapper">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 20, 50]}
            autoHeight
            sx={{
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: "#1976d2",
                color: "white",
                fontWeight: "bold",
                whiteSpace: "normal",
                wordWrap: "break-word",
                textAlign: "center",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                overflow: "visible",
                lineHeight: "1.2",
              },
            }}
          />
        </Box>
      ) : (
        <Typography variant="body1" className="data-table-title">
          No hay datos cargados.
        </Typography>
      )}

      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <MuiAlert severity="success" onClose={() => setOpenSnackbar(false)}>
          Archivo CSV cargado correctamente.
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default DataTable;
