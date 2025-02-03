import React, { useState } from "react"; // Importa React y el hook useState para manejar el estado
import RenewableCalculator from "./RenewableCalculator"; // Importa el componente de la calculadora de energía renovable
import DataTable from "./DataTable"; // Importa el componente de la tabla de datos
import { Box, Typography } from "@mui/material"; // Importa componentes de Material-UI para el diseño
import styles from "./ParentComponent.module.css"; // Importa los estilos CSS del componente

const ParentComponent = () => {
  // Estado para almacenar los datos cargados desde la tabla
  const [loadedData, setLoadedData] = useState([]);

  // Función para actualizar el estado con los datos cargados desde la tabla
  const handleDataLoad = (data) => {
    setLoadedData(data);
  };

  return (
    <Box className={styles.container}>
      {/* Título principal del componente */}
      <Typography variant="h3" className={styles.title} gutterBottom>
        Transición Energética Justa
      </Typography>

      {/* Subtítulo que describe la funcionalidad del componente */}
      <Typography variant="h6" className={styles.subtitle} gutterBottom>
        Visualización y Cálculo de Energía Renovable
      </Typography>

      {/* Renderiza la tabla de datos y pasa la función handleDataLoad como prop */}
      <DataTable onDataLoad={handleDataLoad} />

      {/* Renderiza la calculadora de energía renovable y le pasa los datos cargados */}
      <RenewableCalculator data={loadedData} />
    </Box>
  );
};

export default ParentComponent;
