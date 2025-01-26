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
  { source: "Wind", value: 200 },
  { source: "Solar", value: 150 },
  { source: "Hydropower", value: 300 },
  { source: "Biofuel", value: 100 },
  { source: "Geothermal", value: 80 },
];

const dataPie = [
  { source: "Renewables", value: 60 },
  { source: "Wind", value: 25 },
  { source: "Solar", value: 20 },
  { source: "Hydro", value: 15 },
];

const dataLine = [
  { year: 2015, wind: 50, solar: 30, geothermal: 20 },
  { year: 2016, wind: 70, solar: 50, geothermal: 25 },
  { year: 2017, wind: 90, solar: 70, geothermal: 30 },
  { year: 2018, wind: 110, solar: 90, geothermal: 40 },
  { year: 2019, wind: 130, solar: 120, geothermal: 50 },
];

const dataArea = [
  { year: 2015, renewable: 100, conventional: 300 },
  { year: 2016, renewable: 150, conventional: 290 },
  { year: 2017, renewable: 200, conventional: 280 },
  { year: 2018, renewable: 250, conventional: 270 },
  { year: 2019, renewable: 300, conventional: 260 },
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
            <XAxis dataKey="source" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#82ca9d" />
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
              dataKey="value"
              nameKey="source"
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
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="wind" stroke="#8884d8" />
            <Line type="monotone" dataKey="solar" stroke="#82ca9d" />
            <Line type="monotone" dataKey="geothermal" stroke="#ffc658" />
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
              dataKey="renewable"
              stackId="1"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
            <Area
              type="monotone"
              dataKey="conventional"
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
