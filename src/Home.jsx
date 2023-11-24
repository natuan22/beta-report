import React, { useEffect, useRef, useState } from 'react';
import Page1 from './utils/Page1';
import Page2 from './utils/Page2';
import Page3 from './utils/Page3';
import Page4 from './utils/Page4';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Home = () => {
    const pageRefs = {
        page1: useRef(null),
        page2: useRef(null),
        page3: useRef(null),
        page4: useRef(null),
    };

    const generateImage = async (pageRef) => {
        const canvas = await html2canvas(pageRef.current, { width: 800, height: 1480 }); // Kích thước A4
        return canvas.toDataURL('image/png');
    };

    const downloadImage = async (pageNumber) => {
        const image = await generateImage(pageRefs[`page${pageNumber}`]);
        const link = document.createElement('a');
        link.href = image;
        link.download = `Page${pageNumber}.png`;
        link.click();
    };

    const generatePDF = async () => {
        const pdf = new jsPDF()
        // Component 1
        const img1 = await generateImage(pageRefs.page1);
        pdf.addImage(img1, 'PNG', 0, 0);

        // Component 2
        pdf.addPage();
        const img2 = await generateImage(pageRefs.page2);
        pdf.addImage(img2, 'PNG', 0, 0);

        // Component 3
        pdf.addPage();
        const img3 = await generateImage(pageRefs.page3);
        pdf.addImage(img3, 'PNG', 0, 0);

        // Component 4
        pdf.addPage();
        const img4 = await generateImage(pageRefs.page4);
        pdf.addImage(img4, 'PNG', 0, 0);
        pdf.save('BetaNews.pdf');
    };

    useEffect(() => {
        // Do any additional setup if needed
    }, []);




    return (
        <div>
            {/* Các components được bao bọc trong div với ref để sử dụng html2canvas */}
            <div ref={pageRefs.page1}>
                <Page1 />
            </div>
            <div ref={pageRefs.page2}>
                <Page2 />
            </div>
            <div ref={pageRefs.page3}>
                <Page3 />
            </div>
            <div ref={pageRefs.page4}>
                <Page4 />
            </div>



            <div>
                <button onClick={generatePDF}>Tạo PDF</button>
            </div>
        </div>
    );
};

export default Home;
