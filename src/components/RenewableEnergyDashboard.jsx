import React from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Typography } from "@mui/material";  // Importación de Typography

const dataBar = [
  { fuente: "Eólica", valor: 200 },
  { fuente: "Solar", valor: 150 },
  { fuente: "Hidroeléctrica", valor: 300 },
  { fuente: "Biocombustible", valor: 100 },
  { fuente: "Geotérmica", valor: 80 },
];

const dataPie = [
  { fuente: "Renovables", valor: 60 },
  { fuente: "Eólica", valor: 25 },
  { fuente: "Solar", valor: 20 },
  { fuente: "Hidroeléctrica", valor: 15 },
];

const dataLine = [
  { año: 2015, renovable: 100, convencional: 300 },
  { año: 2016, renovable: 150, convencional: 290 },
  { año: 2017, renovable: 200, convencional: 280 },
  { año: 2018, renovable: 250, convencional: 270 },
  { año: 2019, renovable: 300, convencional: 260 },
];

const dataArea = [
  { año: 2015, renovable: 100, convencional: 300 },
  { año: 2016, renovable: 150, convencional: 290 },
  { año: 2017, renovable: 200, convencional: 280 },
  { año: 2018, renovable: 250, convencional: 270 },
  { año: 2019, renovable: 300, convencional: 260 },
];

const RenewableEnergyDashboard = () => {
  return (
    <div className="p-4 grid gap-4 grid-cols-2">
      {/* Bar Chart */}
      <div className="card bg-white shadow rounded-lg p-4">
        <Typography variant="h6" style={{ color: "white" }} gutterBottom>
          Producción de Energía Renovable por Fuente
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dataBar}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="fuente" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="valor" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="card bg-white shadow rounded-lg p-4">
        <Typography variant="h6" style={{ color: "white" }} gutterBottom>
          Participación de Energías Renovables
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Tooltip />
            <Legend />
            <Pie
              data={dataPie}
              dataKey="valor"
              nameKey="fuente"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart */}
      <div className="card bg-white shadow rounded-lg p-4 col-span-2">
        <Typography variant="h6" style={{ color: "white" }} gutterBottom>
          Tendencia en la Capacidad Instalada
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dataLine}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="anio" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="eolica" stroke="#8884d8" />
            <Line type="monotone" dataKey="solar" stroke="#82ca9d" />
            <Line type="monotone" dataKey="geotermica" stroke="#ffc658" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Area Chart */}
      <div className="card bg-white shadow rounded-lg p-4 col-span-2">
        <Typography variant="h6" style={{ color: "white" }} gutterBottom>
          Comparación entre Consumo de Energía Renovable y Convencional
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={dataArea}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="renovable"
              stackId="1"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
            <Area
              type="monotone"
              dataKey="convencional"
              stackId="1"
              stroke="#ffc658"
              fill="#ffc658"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RenewableEnergyDashboard;
