import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import styles from "./InfoSection.module.css";

import SolarPanelImage from "../imagenes/solar.png";
import RenewableEnergyImage from "../imagenes/nnn2.png";
import WindTurbineImage from "../imagenes/aii.jpg";
import HydroPowerImage from "../imagenes/pexels2.jpg";
import BiomassImage from "../imagenes/pexels.jpg";
import SolarVideo from "../video/energíasrenovables.mp4";

const mediaItems = [
  { type: "image", src: SolarPanelImage, alt: "Paneles solares generando electricidad" },
  { type: "image", src: RenewableEnergyImage, alt: "Energía renovable en acción" },
  { type: "image", src: WindTurbineImage, alt: "Aerogeneradores en funcionamiento" },
  { type: "image", src: HydroPowerImage, alt: "Central hidroeléctrica en operación" },
  { type: "image", src: BiomassImage, alt: "Producción de energía a partir de biomasa" },
];

const InfoSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
  };

  const [formData, setFormData] = useState({ nombre: "", email: "", mensaje: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Box className={styles.container}>
      <Typography variant="h3" gutterBottom>
        Energía Solar: Una Fuente de Energía Limpia
      </Typography>

      <Typography variant="body1" paragraph>
        La energía solar es una de las fuentes renovables más abundantes y sostenibles.
        Su instalación es cada vez más accesible, permitiendo a comunidades y hogares 
        generar su propia energía limpia y reducir la dependencia de fuentes no renovables.
      </Typography>

      <Box className={styles.carouselContainer}>
        <Slider {...settings}>
          {mediaItems.map((item, index) => (
            <Box key={index} component="img" src={item.src} alt={item.alt} className={styles.carouselImage} />
          ))}
        </Slider>
      </Box>

      <Box className={styles.videoContainer}>
        <video controls src={SolarVideo} className={styles.video} />
      </Box>

      <Box className={styles.formContainer}>
        <Typography variant="h5" gutterBottom>
          ¿Tienes dudas o comentarios? Contáctanos
        </Typography>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <TextField fullWidth label="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} required className={styles.input} />
            <TextField fullWidth label="Correo Electrónico" type="email" name="email" value={formData.email} onChange={handleChange} required className={styles.input} />
            <TextField fullWidth label="Mensaje" name="mensaje" value={formData.mensaje} onChange={handleChange} required multiline rows={4} className={styles.input} />
            <Button type="submit" variant="contained" color="secondary" startIcon={<MailOutlineIcon />}>
              Enviar
            </Button>
          </form>
        ) : (
          <Typography variant="h6" className={styles.successMessage}>
            ¡Gracias por tu mensaje! Te responderemos pronto.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default InfoSection;
