// Importación de React y hooks necesarios, componentes propios y Material-UI
import React, { useState } from "react";
import RenewableCalculator from "./RenewableCalculator"; // Componente para cálculos de energía renovable
import DataTable from "./DataTable"; // Componente para cargar y mostrar datos
import { Box, Typography } from "@mui/material"; // Componentes de diseño de Material-UI

// Componente funcional principal: ParentComponent
const ParentComponent = () => {
  // Hook de estado para almacenar los datos cargados desde el archivo CSV
  const [loadedData, setLoadedData] = useState([]);

  // Función para manejar la carga de datos desde el componente DataTable
  const handleDataLoad = (data) => {
    // Actualiza el estado con los datos cargados
    setLoadedData(data);
  };

  return (
    // Contenedor principal con estilos de Material-UI
    <Box sx={{ padding: 4 }}>
      {/* Título principal del componente */}
      <Typography variant="h3" gutterBottom>
        Transición Energética Justa
      </Typography>

      {/* Subtítulo descriptivo */}
      <Typography variant="h6" gutterBottom>
        Visualización y Cálculo de Energía Renovable
      </Typography>

      {/* Componente para cargar y visualizar datos en formato tabular */}
      <DataTable onDataLoad={handleDataLoad} />

      {/* Componente para realizar cálculos basados en los datos cargados */}
      <RenewableCalculator data={loadedData} />
    </Box>
  );
};

// Exportación del componente para que pueda ser usado en otros archivos
export default ParentComponent;
