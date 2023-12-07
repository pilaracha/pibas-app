import React, { useRef } from "react";
import { useParams } from "react-router-dom";

import useRequest from "common/useRequest";

import { PibasService } from "services/PibasService";
import Dashboard from "models/Dashboard";
import DefaultTemplate from "templates/Default";
import DownloadTemplate from "templates/Download";
import jsPDF from "jspdf";
import Graphic from "models/Graphic";
import pibasLogo from "../assets/images/pibas-logo.png";

const Export = () => {
  const { idDashboard, idChart } = useParams();
  const { loading, beforeSubmit, afterSubmit } = useRequest();
  const [edit, setEdit] = React.useState(false);

  const [content, setContent] = React.useState(
    idDashboard ? new Dashboard() : new Graphic()
  );

  React.useEffect(() => {
    if (idDashboard) {
      beforeSubmit();
      PibasService.getDashboard(idDashboard)
        .then((response) => {
          setContent(new Dashboard(response));
        })
        .catch((error) => console.log(error))
        .finally(() => afterSubmit());
    } else if (idChart) {
      beforeSubmit();
      PibasService.getChart(idChart)
        .then((response) => {
          setContent(new Graphic(response));
        })
        .catch((error) => console.log(error))
        .finally(() => afterSubmit());
    }
  }, []);

  const ref = useRef();

  const loadImageAsync = (img) => {
    return new Promise((resolve) => {
      img.onload = () => {
        resolve();
      };
    });
  };

  const handleDownload = async () => {
    const pdf = new jsPDF({ unit: "px" });
    let pageNumber = 1;
    const pageWidth = pdf.internal.pageSize.width;
    const pageHeight = pdf.internal.pageSize.height;

    pdf.setTextColor(100);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.text(`${pageNumber}`, 415, 615);

    pdf.text(`PIBAS APP - ${content.name.toUpperCase()}`, 24, 620);

    pdf.addImage(pibasLogo, "png", 25, 5);
    pdf.setFontSize(20);
    pdf.setTextColor(40, 53, 147);
    pdf.setFont("helvetica", "bold");
    const maxWidth = pageWidth - 50; // Ancho máximo del texto
    const lineHeight = 20; // Altura de línea

    const text = content.name.toUpperCase();
    const textFragments = pdf.splitTextToSize(text, maxWidth);

    // Asegurarse de que haya al menos dos fragmentos antes de intentar imprimir dos líneas
    if (textFragments.length >= 2) {
      pdf.text(textFragments[0], 25, 55);
      pdf.text(textFragments[1], 25, 55 + lineHeight);
    } else {
      pdf.text(text, 25, 55);
    }

    let yPos = 95;
    if (content.description) {
      pdf.setFontSize(11);
      pdf.setTextColor(100);
      pdf.setFont("helvetica", "normal");
      const lineHeightText = 12; // Altura de línea

      const textFragments = pdf.splitTextToSize(content.description, maxWidth);

      for (let i = 0; i < textFragments.length; i++) {
        const textFragment = textFragments[i];
        pdf.text(textFragment, 25, yPos);
        yPos += lineHeightText;
      }
    }
    pdf.setDrawColor(100);
    pdf.line(25, yPos, pageWidth - 25, yPos);

    // Agregar imágenes desde content.graphics
    if (content.graphics && Array.isArray(content.graphics)) {
      const imagesPerPage = 2; // Número máximo de imágenes por página
      let imageIndex = 0;

      for (let i = 0; i < content.graphics.length; i++) {
        const graphic = content.graphics[i];

        // Verificar si se necesita agregar una nueva página
        if (imageIndex === imagesPerPage) {
          pageNumber++;
          pdf.addPage();
          pdf.setTextColor(100);
          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(10);
          pdf.text(`${pageNumber}`, 415, 615);

          pdf.setFont("helvetica", "bold");
          pdf.text(`PIBAS APP - ${content.name.toUpperCase()}`, 24, 615);
          yPos = 15; // Reiniciar la posición vertical en la nueva página
          imageIndex = 0;
        }
        yPos += 15;

        pdf.setFontSize(14);
        pdf.setTextColor(100);
        pdf.setFont("helvetica", "bold");
        pdf.text(graphic.name.toUpperCase(), 25, yPos);

        // Crear una nueva imagen
        const img = new Image();
        img.src = graphic.src;

        // Esperar a que la imagen se cargue antes de continuar
        await loadImageAsync(img);
        const height = img.naturalHeight;

        let imageMaxWidth = pageWidth - 150;
        let startImage = 75;
        if (height > 1000) {
          imageMaxWidth = pageWidth - 220;
          startImage = 110;
        }

        // Agregar la imagen al PDF
        pdf.addImage(img, "PNG", startImage, yPos - 5, imageMaxWidth, 0); // El valor 0 se ajusta automáticamente
        if (height > 900) {
          yPos += 240; // Ajusta la posición vertical según la imagen anterior
        } else {
          yPos += 180; // Ajusta la posición vertical según la imagen anterior
        }

        imageIndex++;
      }
    } else {
      // Crear una nueva imagen
      const img = new Image();
      img.src = content.src;
      // Esperar a que la imagen se cargue antes de continuar
      await loadImageAsync(img);
      const height = img.naturalHeight;

      let imageMaxWidth = pageWidth - 50;
      let startImage = 25;

      // Agregar la imagen al PDF
      pdf.addImage(img, "PNG", startImage, yPos, imageMaxWidth, 0);
    }

    pdf.save(idChart ? `Grafico-${content.name}` : `Tablero-${content.name}`);
  };

  const handleChange = (key, value) => {
    setContent((prevDash) => {
      return {
        ...prevDash,
        [`${key}`]: value,
      };
    });
  };

  return (
    <DefaultTemplate loading={loading}>
      <DownloadTemplate
        ref={ref}
        title={content.name}
        description={content.description}
        {...(idDashboard
          ? { graphics: content.graphics }
          : { graphics: content.src })}
        edit={edit}
        handleEdit={() => setEdit(!edit)}
        handleChange={handleChange}
        handleDownload={handleDownload}
      />
    </DefaultTemplate>
  );
};

export default Export;
