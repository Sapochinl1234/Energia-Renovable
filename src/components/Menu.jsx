import React, { useState } from "react"; // Importa React y el hook useState para manejar el estado
import { AppBar, Toolbar, Button, Box } from "@mui/material"; // Importa componentes de Material-UI para la interfaz
import TableChartIcon from "@mui/icons-material/TableChart"; // Icono para la sección de tabla de datos
import CalculateIcon from "@mui/icons-material/Calculate"; // Icono para la calculadora
import InfoIcon from "@mui/icons-material/Info"; // Icono para la sección de información
import DashboardIcon from "@mui/icons-material/Dashboard"; // Icono para el dashboard

// Importación de los componentes a mostrar en la interfaz
import DataTable from "./DataTable";
import RenewableCalculator from "./RenewableCalculator";
import InfoSection from "./InfoSection";
import RenewableEnergyDashboard from "./RenewableEnergyDashboard";
import styles from "./Menu.module.css"; // Importación de los estilos CSS del componente

const Menu = () => {
  // Estado para controlar qué componente se está mostrando en la interfaz
  const [currentComponent, setCurrentComponent] = useState("info");

  // Función que determina qué componente se debe renderizar según el estado actual
  const renderComponent = () => {
    switch (currentComponent) {
      case "table":
        return <DataTable />;
      case "calculator":
        return <RenewableCalculator />;
      case "info":
        return <InfoSection />;
      case "dashboard":
        return <RenewableEnergyDashboard />;
      default:
        return <InfoSection />; // Si el estado no coincide con ningún caso, muestra la sección de información por defecto
    }
  };

  return (
    <>
      {/* Barra de navegación con botones para cambiar entre secciones */}
      <AppBar position="static" className={styles.appBar}>
        <Toolbar className={styles.toolbar}>
          <Box className={styles.buttonContainer}>
            {/* Botón para mostrar la tabla de datos */}
            <Button
              className={styles.button}
              startIcon={<TableChartIcon />} 
              onClick={() => setCurrentComponent("table")}
            >
              Tabla de Datos
            </Button>

            {/* Botón para mostrar la calculadora de energía renovable */}
            <Button
              className={styles.button}
              startIcon={<CalculateIcon />} 
              onClick={() => setCurrentComponent("calculator")}
            >
              Cálculo de Energía
            </Button>

            {/* Botón para mostrar la sección de información */}
            <Button
              className={styles.button}
              startIcon={<InfoIcon />} 
              onClick={() => setCurrentComponent("info")}
            >
              Información
            </Button>

            {/* Botón para mostrar el dashboard de producción y consumo de energía */}
            <Button
              className={styles.button}
              startIcon={<DashboardIcon />} 
              onClick={() => setCurrentComponent("dashboard")}
            >
              Producción y Consumo de Energía
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Contenedor donde se mostrará el componente seleccionado */}
      <Box className={styles.content}>{renderComponent()}</Box>
    </>
  );
};

export default Menu;
