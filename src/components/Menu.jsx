import React, { useState } from "react";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import TableChartIcon from "@mui/icons-material/TableChart"; // Icono para Tabla de Datos
import CalculateIcon from "@mui/icons-material/Calculate"; // Icono para Calculadora
import InfoIcon from "@mui/icons-material/Info"; // Icono para Información
import DashboardIcon from "@mui/icons-material/Dashboard"; // Icono para Dashboard
import DataTable from "./DataTable";
import RenewableCalculator from "./RenewableCalculator";
import InfoSection from "./InfoSection";
import RenewableEnergyDashboard from "./RenewableEnergyDashboard"; // Importa el componente de gráficos

const Menu = () => {
  const [currentComponent, setCurrentComponent] = useState("info"); // Mostrar Información al inicio

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
        return <InfoSection />; // Muestra la sección de información por defecto
    }
  };

  return (
    <>
      {/* Barra de navegación */}
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ display: "flex", flexGrow: 1 }}>
            <Button
              color="inherit"
              startIcon={<TableChartIcon />} 
              onClick={() => setCurrentComponent("table")}
            >
              Tabla de Datos
            </Button>
            <Button
              color="inherit"
              startIcon={<CalculateIcon />} 
              onClick={() => setCurrentComponent("calculator")}
            >
              Calculadora
            </Button>
            <Button
              color="inherit"
              startIcon={<InfoIcon />} 
              onClick={() => setCurrentComponent("info")}
            >
              Información
            </Button>
            <Button
              color="inherit"
              startIcon={<DashboardIcon />} 
              onClick={() => setCurrentComponent("dashboard")}
            >
              Producción y consumo de energía
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Renderiza el componente seleccionado */}
      <Box sx={{ padding: 4 }}>{renderComponent()}</Box>
    </>
  );
};

export default Menu;
