import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useRef, useState } from "react";
import AnalysisPage1 from "./component/AnalysisPage1/AnalysisPage1";
import AnalysisPage2 from "./component/AnalysisPage2/AnalysisPage2";
import AnalysisPage3 from "./component/AnalysisPage3/AnalysisPage3";
import { Button, TextField } from "@mui/material";
import { useDebounce } from "react-use";
import NavBar from "../app/component/NavBar";

const AnalysisReportAutomation = () => {
  const [val, setVal] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const pageRefs = {
    page1: useRef(null),
    page2: useRef(null),
    page3: useRef(null),
  };
  const generateImage = async (pageRefs, height) => {
    if (!pageRefs.current) return null;
    const canvas = await html2canvas(pageRefs.current, {
      width: 800,
      height,
      scale: 2,
    });
    return canvas.toDataURL("image/png");
  };
  const downloadImages = async () => {
    const img1 = await generateImage(pageRefs.page1, 1121);
    const img2 = await generateImage(pageRefs.page2, 1121);
    const img3 = await generateImage(pageRefs.page3, 1121);

    const link1 = document.createElement("a");
    link1.href = img1;
    link1.download = `BetaAnalysisReportAutomation${debouncedValue.toUpperCase()}-Trang1.png`;
    link1.click();

    const link2 = document.createElement("a");
    link2.href = img2;
    link2.download = `BetaAnalysisReportAutomation${debouncedValue.toUpperCase()}-Trang2.png`;
    link2.click();

    const link3 = document.createElement("a");
    link3.href = img3;
    link3.download = `BetaAnalysisReportAutomation${debouncedValue.toUpperCase()}-Trang3.png`;
    link3.click();
  };
  const generatePDF = async () => {
    const pdf = new jsPDF();
    const img1 = await generateImage(pageRefs.page1, 1480);
    const img2 = await generateImage(pageRefs.page2, 1480);
    const img3 = await generateImage(pageRefs.page3, 1480);

    pdf.addImage(img1, "PNG", 0, 0, 210, 392);
    pdf.addPage();
    pdf.addImage(img2, "PNG", 0, 0, 210, 392);
    pdf.addPage();
    pdf.addImage(img3, "PNG", 0, 0, 210, 391);

    pdf.save(`Phan-tich-ky-thuat-${debouncedValue.toUpperCase()}.pdf`);
  };

  const [, cancel] = useDebounce(
    () => {
      setDebouncedValue(val);
    },
    500,
    [val]
  );

  return (
    <div className="relative">
      <div className="absolute right-[10%] top-[1%]">
        <NavBar />
      </div>
      <div className="absolute left-0 top-[50px] translate-x-[850px] z-10 ">
        <TextField
          onChange={({ currentTarget }) => {
            setVal(currentTarget.value);
          }}
          value={val}
          inputProps={{ maxLength: 3 }}
          id="outlined-basic"
          label="Mã CP"
          variant="outlined"
        />
      </div>
      <div>
        <div ref={pageRefs.page1}>
          <AnalysisPage1 stock={debouncedValue} type={0} />
        </div>
        <div ref={pageRefs.page2}>
          <AnalysisPage2 stock={debouncedValue} />
        </div>
        <div ref={pageRefs.page3}>
          <AnalysisPage3 />
        </div>
      </div>

      <div className="flex justify-evenly w-[50%] mb-5">
        <Button variant="contained" color="success" onClick={generatePDF}>
          Tạo PDF
        </Button>

        <Button color="success" onClick={downloadImages} variant="contained">
          Tải ảnh
        </Button>
      </div>
    </div>
  );
};

export default AnalysisReportAutomation;
