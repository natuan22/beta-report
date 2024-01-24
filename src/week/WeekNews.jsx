import React, { useRef } from "react";
import Page1Week from "./component/Page1/Page1Week";
import Page2Week from "./component/Page2/Page2Week";
import Page3Week from "./component/Page3/Page3Week";
import Page4Week from "./component/Page4/Page4Week";
import Page5Week from "./component/Page5/Page5Week";
import Page6Week from "./component/Page6/Page6Week";
import Page7Week from "./component/Page7/Page7Week";
import Page8Week from "./component/Page8/Page8Week";
import Page9Week from "./component/Page9/Page9Week";
import Page10Week from "./component/Page10/Page10Week";
import Page11Week from "./component/Page11/Page11Week";
import Page12Week from "./component/Page12/Page12Week";
import { Button } from "@mui/material";
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const WeekNews = () => {
    const pageRefs = {
        page1: useRef(null),
        page2: useRef(null),
        page3: useRef(null),
        page4: useRef(null),
        page5: useRef(null),
        page6: useRef(null),
        page7: useRef(null),
        page8: useRef(null),
        page9: useRef(null),
        page10: useRef(null),
        page11: useRef(null),
        page12: useRef(null),
    };
    const generateImage = async (ref, height, width, dpi = 300) => {
        if (!ref.current) return null;
        const canvas = await html2canvas(ref.current, { width, height });
        return canvas.toDataURL('image/png');
    }


    const generatePDF = async () => {
        const pdf = new jsPDF({ orientation: 'p' });
        const img1 = await generateImage(pageRefs.page1, 1480, 800)
        const img2 = await generateImage(pageRefs.page2, 1480, 800)
        const img3 = await generateImage(pageRefs.page3, 1480, 800)
        const img4 = await generateImage(pageRefs.page4, 1480, 800)
        const img5 = await generateImage(pageRefs.page5, 1480, 800)
        const img6 = await generateImage(pageRefs.page6, 1480, 800)
        const img7 = await generateImage(pageRefs.page7, 1480, 800)
        const img8 = await generateImage(pageRefs.page8, 1480, 800)
        const img9 = await generateImage(pageRefs.page9, 800, 1480)
        const img10 = await generateImage(pageRefs.page10, 1480, 800)
        const img11 = await generateImage(pageRefs.page11, 1480, 800)
        const img12 = await generateImage(pageRefs.page12, 1480, 800)


        pdf.addImage(img1, 'JPEG', 0, 0)
        pdf.addPage(null, 'p')
        pdf.addImage(img2, 'JPEG', 0, 0);
        pdf.addPage(null, 'p')
        pdf.addImage(img3, 'JPEG', 0, 0);
        pdf.addPage(null, 'p')
        pdf.addImage(img4, 'JPEG', 0, 0);
        pdf.addPage(null, 'p')
        pdf.addImage(img5, 'JPEG', 0, 0);
        pdf.addPage(null, 'p')
        pdf.addImage(img6, 'JPEG', 0, 0);
        pdf.addPage(null, 'p')
        pdf.addImage(img7, 'JPEG', 0, 0);
        pdf.addPage(null, 'p')
        pdf.addImage(img8, 'JPEG', 0, 0);
        pdf.addPage(null, 'l')
        pdf.addImage(img9, 'JPEG', 0, 0);
        pdf.addPage(null, 'p')
        pdf.addImage(img10, 'JPEG', 0, 0);
        pdf.addPage(null, 'p')
        pdf.addImage(img11, 'JPEG', 0, 0);
        pdf.addPage(null, 'p')
        pdf.addImage(img12, 'JPEG', 0, 0);


        pdf.save('WeekNews.pdf');
    }


    return (
        <div className="relative">
            <div>
                <div ref={pageRefs.page1}>
                    <Page1Week />
                </div>
                <div ref={pageRefs.page2} >
                    <Page2Week />
                </div>
                <div ref={pageRefs.page3}>
                    <Page3Week />
                </div>
                <div ref={pageRefs.page4}>
                    <Page4Week />
                </div>
                <div ref={pageRefs.page5}>
                    <Page5Week />
                </div>
                <div ref={pageRefs.page6}>
                    <Page6Week />
                </div>
                <div ref={pageRefs.page7}>
                    <Page7Week />
                </div>
                <div ref={pageRefs.page8}>
                    <Page8Week />
                </div>
                <div className="h-[1480px]" ref={pageRefs.page9}>
                    <Page9Week />
                </div>
                <div ref={pageRefs.page10}>
                    <Page10Week />
                </div>
                <div ref={pageRefs.page11}>
                    <Page11Week />
                </div>
                <div ref={pageRefs.page12}>
                    <Page12Week />
                </div>

            </div>
            <div className="absolute top-[100px] right-[40%]">
                <Button variant="contained" color="success" onClick={generatePDF}>Tạo PDF</Button>
            </div>
        </div>
    );
};

export default WeekNews;
