import React, { useState } from "react";
import DataTable from "./DataTable";
import { Box, Typography, TextField, Button } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import CalculateIcon from "@mui/icons-material/Calculate";

const RenewableCalculator = () => {
  const [data, setData] = useState([]);
  const [totalCapacity, setTotalCapacity] = useState(0);
  const [renewablePercentage, setRenewablePercentage] = useState(0);
  const [renewableConsumption, setRenewableConsumption] = useState(0);
  const [totalConsumption, setTotalConsumption] = useState("");

  const handleDataLoad = (loadedData) => {
    setData(loadedData);
  };

  const calculateRenewables = () => {
    if (!data || data.length === 0) return;

    const renewableData = data.map((row) =>
      parseFloat(row["Renewables (% equivalent primary energy)"] || 0)
    );
    const totalRenewable =
      renewableData.reduce((acc, curr) => acc + curr, 0) / renewableData.length;

    const renewableCapacity = totalRenewable / 100;
    setTotalCapacity(renewableCapacity);

    const renewablePercent = (renewableCapacity * totalConsumption) / 100;
    setRenewablePercentage(totalRenewable);
    setRenewableConsumption(renewablePercent);
  };

  const COLORS = ["#4CAF50", "#F44336"];

  return (
    <Box sx={{ padding: 4, textAlign: "center" }}>
      <DataTable onDataLoad={handleDataLoad} />

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ color: "white" }}>
          Calculadora de Energía Renovable
        </Typography>

        <TextField
          label="Consumo Total (kWh)"
          variant="outlined"
          fullWidth
          value={totalConsumption}
          onChange={(e) => setTotalConsumption(e.target.value)}
          sx={{
            marginBottom: 2,
            input: { color: "white" },
            label: { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "white" },
              "&:hover fieldset": { borderColor: "white" },
              "&.Mui-focused fieldset": { borderColor: "white" },
            },
          }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={calculateRenewables}
          sx={{ marginBottom: 2 }}
          startIcon={<CalculateIcon />}
        >
          Calcular
        </Button>

        <Typography variant="h6" sx={{ color: "white" }}>
          Capacidad Renovable Total: {totalCapacity.toFixed(2)} GW
        </Typography>
        <Typography variant="h6" sx={{ color: "white" }}>
          Porcentaje de Energía Renovable: {renewablePercentage.toFixed(2)}%
        </Typography>
        <Typography variant="h6" sx={{ color: "white" }}>
          Consumo Renovable Aproximado: {renewableConsumption.toFixed(2)} kWh
        </Typography>

        {renewablePercentage > 0 && (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
            <PieChart width={500} height={500}>
              <Pie
                data={[
                  { name: "Energía Renovable", value: renewablePercentage },
                  { name: "No Renovable", value: 100 - renewablePercentage },
                ]}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={180}
                innerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(2)}%`
                }
              >
                {[
                  { name: "Energía Renovable", value: renewablePercentage },
                  { name: "No Renovable", value: 100 - renewablePercentage },
                ].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default RenewableCalculator;
