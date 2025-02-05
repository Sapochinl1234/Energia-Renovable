import React, { useRef } from "react";
import html2canvas from "html2canvas";
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
import { Typography, Button } from "@mui/material";
import styles from "./RenewableEnergyDashboard.module.css";

const dataBar = [
  { fuente: "Eólica", valor: 180 },
  { fuente: "Solar", valor: 140 },
  { fuente: "Hidroeléctrica", valor: 350 },
  { fuente: "Biocombustible", valor: 90 },
  { fuente: "Geotérmica", valor: 70 },
];

const dataPie = [
  { fuente: "Renovables", valor: 65 },
  { fuente: "Eólica", valor: 30 },
  { fuente: "Solar", valor: 25 },
  { fuente: "Hidroeléctrica", valor: 10 },
];

const dataLine = [
  { año: 2015, renovable: 120, convencional: 280 },
  { año: 2016, renovable: 160, convencional: 270 },
  { año: 2017, renovable: 210, convencional: 260 },
  { año: 2018, renovable: 270, convencional: 250 },
  { año: 2019, renovable: 320, convencional: 240 },
];

const dataArea = [...dataLine];

const RenewableEnergyDashboard = () => {
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const lineChartRef = useRef(null);
  const areaChartRef = useRef(null);

  const downloadChart = (chartRef, fileName) => {
    if (chartRef.current) {
      html2canvas(chartRef.current).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = `${fileName}.png`;
        link.click();
      });
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.contentWrapper}>
        {/* 🔹 Gráfica Mejorada: PieChart */}
        <div className={styles.chartCard}>
          <Typography variant="h5" className={styles.chartTitle}>
            Participación de Energías Renovables en Colombia
          </Typography>
          <div className={styles.chartWrapper} ref={pieChartRef}>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Tooltip />
              <Legend layout="horizontal" align="center" verticalAlign="bottom" />
              <Pie
                data={dataPie}
                dataKey="valor"
                nameKey="fuente"
                cx="50%"
                cy="45%"
                outerRadius={130}  // 🔹 Aumenta el tamaño de la gráfica para más espacio
                stroke="white"
                strokeWidth={2}
                fill="#007bff"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                labelLine={{ length: 20, stroke: "#000" }}  // 🔹 Extiende las líneas de las etiquetas
                labelStyle={{ fontSize: "14px", fontWeight: "bold", fill: "#333" }}  // 🔹 Letras más grandes y legibles
              />
            </PieChart>
          </ResponsiveContainer>


          </div>
          <Button onClick={() => downloadChart(pieChartRef, "pie_chart_colombia")}>
            Descargar 📥
          </Button>
        </div>

        {/* 🔹 Otras gráficas (sin cambios) */}
        <div className={styles.chartCard}>
          <Typography variant="h5" className={styles.chartTitle}>
            Producción de Energía Renovable en Colombia
          </Typography>
          <div className={styles.chartWrapper} ref={barChartRef}>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={dataBar}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                <XAxis dataKey="fuente" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="valor" fill="#28a745" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <Button onClick={() => downloadChart(barChartRef, "bar_chart_colombia")}>
            Descargar 📥
          </Button>
        </div>

        <div className={styles.chartCardWide}>
          <Typography variant="h5" className={styles.chartTitle}>
            Tendencia de Capacidad Instalada en Colombia
          </Typography>
          <div className={styles.chartWrapper} ref={lineChartRef}>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={dataLine}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                <XAxis dataKey="año" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="renovable" stroke="#ff9800" />
                <Line type="monotone" dataKey="convencional" stroke="#e91e63" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <Button onClick={() => downloadChart(lineChartRef, "line_chart_colombia")}>
            Descargar 📥
          </Button>
        </div>

        <div className={styles.chartCardWide}>
          <Typography variant="h5" className={styles.chartTitle}>
            Comparación Consumo Renovable vs Convencional en Colombia
          </Typography>
          <div className={styles.chartWrapper} ref={areaChartRef}>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={dataArea}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                <XAxis dataKey="año" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="renovable" stackId="1" stroke="#4caf50" fill="#4caf50" />
                <Area type="monotone" dataKey="convencional" stackId="1" stroke="#f44336" fill="#f44336" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <Button onClick={() => downloadChart(areaChartRef, "area_chart_colombia")}>
            Descargar 📥
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyDashboard;
