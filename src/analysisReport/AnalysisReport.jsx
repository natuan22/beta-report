import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useRef, useState } from "react";
import NavBar from "../app/component/NavBar";
import AnalysisPage1 from "./component/AnalysisPage1/AnalysisPage1";
import AnalysisPage2 from "./component/AnalysisPage2/AnalysisPage2";
import AnalysisPage3 from "./component/AnalysisPage3/AnalysisPage3";
import { Button, TextField } from "@mui/material";
import { useDebounce } from "react-use";
import Dialog from "./component/utils/Dialog";

const AnalysisReport = () => {
    const [code, setCode] = useState("hpg");
    const [val, setVal] = useState("");
    const [debouncedValue, setDebouncedValue] = useState("");
    const pageRefs = {
        page1: useRef(null),
        page2: useRef(null),
        page3: useRef(null),
    };
    const generateImage = async (pageRefs, height) => {
        if (!pageRefs.current) return null
        const canvas = await html2canvas(pageRefs.current, { width: 900, height })
        return canvas.toDataURL('image/png')
    }
    const downloadImages = async () => {
        const img1 = await generateImage(pageRefs.page1, 1121)
        const img2 = await generateImage(pageRefs.page2, 1121)
        const img3 = await generateImage(pageRefs.page3, 1121);

        const link1 = document.createElement('a')
        link1.href = img1
        link1.download = 'BetaAfternoonNews-Trang1.png'
        link1.click()

        const link2 = document.createElement('a')
        link2.href = img2
        link2.download = 'BetaAfternoonNews-Trang2.png'
        link2.click()

        const link3 = document.createElement('a')
        link3.href = img3
        link3.download = 'BetaAfternoonNews-Trang3.png'
        link3.click()


    }
    const generatePDF = async () => {
        const pdf = new jsPDF()
        const img1 = await generateImage(pageRefs.page1, 1480)
        const img2 = await generateImage(pageRefs.page2, 1480);
        const img3 = await generateImage(pageRefs.page3, 1480);

        pdf.addImage(img1, 'PNG', 0, 0)
        pdf.addPage()
        pdf.addImage(img2, 'PNG', 0, 0);
        pdf.addPage();
        pdf.addImage(img3, 'PNG', 0, 0);



        pdf.save(`Phan-tich-ky-thuat.pdf`);
    }

    const [, cancel] = useDebounce(
        () => {
            setDebouncedValue(val);
        },
        500,
        [val]
    );

    return (
        <div className="relative">
            <div className="absolute right-[250px] top-[50px]">
                <NavBar />
            </div>
            <div className="absolute  left-0 top-[50px] translate-x-[900px] z-10 ">
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
            <div className="absolute top-[300px] left-[900px] z-30 ">
                <Dialog />
            </div>
            <div>
                <div ref={pageRefs.page1}>
                    <AnalysisPage1 stock={debouncedValue} />
                </div>
                <div ref={pageRefs.page2}>
                    <AnalysisPage2 stock={debouncedValue} />
                </div>
                <div ref={pageRefs.page3}>
                    <AnalysisPage3 />
                </div>
            </div>

            <div className="">
                <Button variant="contained" color="success" onClick={generatePDF}>
                    Tạo PDF
                </Button>
            </div>
        </div>
    );
};

export default AnalysisReport;
