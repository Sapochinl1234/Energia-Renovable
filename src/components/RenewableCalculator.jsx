import React, { useState, useMemo } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import CalculateIcon from "@mui/icons-material/Calculate";
import styles from "./RenewableCalculator.module.css"; // Importamos el CSS separado

const RenewableCalculator = () => {
  const [totalConsumption, setTotalConsumption] = useState("");
  const [renewablePercentage, setRenewablePercentage] = useState(0);
  const [renewableConsumption, setRenewableConsumption] = useState(0);
  const [renewableCapacityTotal, setRenewableCapacityTotal] = useState(0);

  const totalColombiaConsumption = 70000; // GWh (supuesto consumo total anual de Colombia)
  const renewableCapacity = 1871; // MW (capacidad instalada de energía renovable en Colombia)
  const capacityFactor = 0.32; // Factor de capacidad actualizado

  const renewableProduction = useMemo(() => {
    return (renewableCapacity * capacityFactor * 8760) / 1000; // GWh/año
  }, [renewableCapacity, capacityFactor]);

  const calculatedRenewablePercentage = useMemo(() => {
    return (renewableProduction / totalColombiaConsumption) * 100;
  }, [renewableProduction, totalColombiaConsumption]);

  const calculateRenewables = () => {
    const totalConsumptionValue = parseFloat(totalConsumption);
    if (isNaN(totalConsumptionValue) || totalConsumptionValue <= 0) {
      setRenewablePercentage(0);
      setRenewableConsumption(0);
      setRenewableCapacityTotal(0);
      return;
    }

    const renewableEnergyUsage = (calculatedRenewablePercentage / 100) * totalConsumptionValue;
    const renewableCapacityTotalValue = renewableProduction * 1000; // Convertir a kWh

    setRenewablePercentage(calculatedRenewablePercentage);
    setRenewableConsumption(renewableEnergyUsage);
    setRenewableCapacityTotal(renewableCapacityTotalValue);
  };

  const COLORS = ["#4CAF50", "#F44336"];

  return (
    <Box className={styles.background}>
      <Box className={styles.container}>
        <Box className={styles.calculatorBox}>
          <Typography variant="h5" gutterBottom className={styles.title}>
            Calculo de Energía Renovable en Colombia
          </Typography>

          <TextField
            label="Consumo Total (kWh)"
            variant="outlined"
            fullWidth
            value={totalConsumption}
            onChange={(e) => setTotalConsumption(e.target.value)}
            className={styles.inputField}
          />

          <Box className={styles.buttonContainer}>
            <Button
              variant="contained"
              color="primary"
              onClick={calculateRenewables}
              className={styles.calculateButton}
              startIcon={<CalculateIcon />}
            >
              Calcular
            </Button>
          </Box>

          {totalConsumption && (
            <Box className={styles.resultsContainer}>
              <Typography variant="body1" className={styles.resultText}>
                Porcentaje de Energía Renovable: {renewablePercentage.toFixed(2)}%
              </Typography>
              <Typography variant="body1" className={styles.resultText}>
                Consumo Renovable Aproximado: {renewableConsumption.toFixed(2)} kWh
              </Typography>
              <Typography variant="body1" className={styles.resultText}>
                Capacidad Renovable Total: {renewableCapacityTotal.toFixed(2)} kWh
              </Typography>
            </Box>
          )}

          {renewablePercentage > 0 && (
            <Box className={styles.chartContainer}>
              <PieChart width={300} height={300}>
                <Pie
                  data={[
                    { name: "Energía Renovable", value: renewableConsumption },
                    { name: "No Renovable", value: totalConsumption - renewableConsumption },
                  ]}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={50}
                  paddingAngle={5}
                  label={({ name, value }) => `${name}: ${value.toFixed(2)} kWh`}
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default RenewableCalculator;
