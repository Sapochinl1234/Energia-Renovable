import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import Slider from "react-slick"; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
import SolarPanelImage from "../imagenes/solar.png";
import RenewableEnergyImage from "../imagenes/nnn2.png";
import WindTurbineImage from "../imagenes/aii.jpg";
import HydroPowerImage from "../imagenes/pexels2.jpg";
import BiomassImage from "../imagenes/pexels.jpg";
import SolarVideo from "../video/energíasrenovables.mp4";
import MailOutlineIcon from '@mui/icons-material/MailOutline'; // Importando el ícono

// Lista de imágenes para el carrusel
const mediaItems = [
  { type: "image", src: SolarPanelImage, alt: "Paneles solares generando electricidad" },
  { type: "image", src: RenewableEnergyImage, alt: "Energía renovable en acción" },
  { type: "image", src: WindTurbineImage, alt: "Aerogeneradores en funcionamiento" },
  { type: "image", src: HydroPowerImage, alt: "Central hidroeléctrica en operación" },
  { type: "image", src: BiomassImage, alt: "Producción de energía a partir de biomasa" },
];

const InfoSection = () => {
  // Configuración del carrusel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    alert("Formulario enviado con éxito.");
  };

  return (
    <Box
      sx={{
        p: 4,
        backgroundColor: "#f5f5f5",
        borderRadius: 2,
        textAlign: "center",
      }}
    >
      <Typography variant="h3" gutterBottom>
        Energía Solar: Una Fuente de Energía Limpia
      </Typography>

      <Typography variant="body1" paragraph>
        La energía solar es una de las fuentes renovables más abundantes y sostenibles.
        Aprovecha la luz del sol para generar electricidad o calor, reduciendo significativamente
        las emisiones de carbono y promoviendo un futuro más ecológico.
      </Typography>

      {/* Carrusel de imágenes */}
      <Box sx={{ maxWidth: "60%", margin: "0 auto" }}>
        <Slider {...settings}>
          {mediaItems.map((item, index) => (
            item.type === "image" ? (
              <Box
                key={index}
                component="img"
                src={item.src}
                alt={item.alt}
                sx={{
                  width: "100%",
                  height: "400px",
                  borderRadius: 2,
                  objectFit: "cover",
                }}
              />
            ) : (
              <Box
                key={index}
                component="video"
                src={item.src}
                controls
                sx={{
                  width: "100%",
                  height: "400px",
                  borderRadius: 2,
                  objectFit: "cover",
                }}
              />
            )
          ))}
        </Slider>
      </Box>

      <Typography variant="body1" paragraph sx={{ mt: 2 }}>
        Su instalación es cada vez más accesible, permitiendo a comunidades y hogares 
        generar su propia energía limpia y reducir la dependencia de fuentes no renovables.
      </Typography>

      {/* Video adicional */}
      <Box sx={{ maxWidth: "60%", margin: "20px auto" }}>
        <video
          controls
          src={SolarVideo}
          style={{ width: "100%", height: "400px", borderRadius: 2 }}
        />
      </Box>

      {/* Formulario de contacto (Se agrega después del video) */}
      <Box sx={{ mt: 4, p: 3, backgroundColor: "#e3f2fd", borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          ¿Tienes dudas o comentarios? Contáctanos
        </Typography>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Correo Electrónico"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Mensaje"
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              required
              multiline
              rows={4}
              sx={{ mb: 2 }}
            />
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              startIcon={<MailOutlineIcon />} // Agregar el ícono al botón
            >
              Enviar
            </Button>
          </form>
        ) : (
          <Typography variant="h6" color="success.main" sx={{ mt: 2 }}>
            ¡Gracias por tu mensaje! Te responderemos pronto.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default InfoSection;
