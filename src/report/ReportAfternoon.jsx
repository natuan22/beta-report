import html2canvas from 'html2canvas'
import React, { useRef } from 'react'
import jsPDF from 'jspdf'
import { Button } from '@mui/material'
import AfternoonPage1 from './page1/AfternoonPage1'
import AfternoonPage2 from './page2/AfternoonPage2'
import AfternoonPage3 from './page3/AfternoonPage3'
import AfternoonPage4 from './page4/AfternoonPage4'
import AfternoonPage5 from './page5/AfternoonPage5'
import { formattedDate } from '../helper/getDateAfternoon'
import NavBar from '../app/component/NavBar'
import AfternoonPage6 from './page6/AfternoonPage6'

const ReportAfternoon = () => {
    const pageRefs = {
        page1: useRef(null),
        page2: useRef(null),
        page3: useRef(null),
        page4: useRef(null),
        page5: useRef(null),
        page6: useRef(null)
    }

    const generateImage = async (pageRefs, height) => {
        if (!pageRefs.current) return null
        const canvas = await html2canvas(pageRefs.current, { width: 800, height })
        return canvas.toDataURL('image/png')
    }
    const downloadImages = async () => {
        const img1 = await generateImage(pageRefs.page1, 1121)
        const img2 = await generateImage(pageRefs.page2, 1121)
        const img3 = await generateImage(pageRefs.page3, 1121);
        const img4 = await generateImage(pageRefs.page4, 1121);
        const img5 = await generateImage(pageRefs.page5, 1121);

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

        const link4 = document.createElement('a')
        link4.href = img4
        link4.download = 'BetaAfternoonNews-Trang4.png'
        link4.click()
        const link5 = document.createElement('a')
        link5.href = img5
        link5.download = 'BetaAfternoonNews-Trang5.png'
        link5.click()
    }

    const generatePDF = async () => {
        const pdf = new jsPDF()
        const img1 = await generateImage(pageRefs.page1, 1480)
        const img2 = await generateImage(pageRefs.page2, 1480);
        const img3 = await generateImage(pageRefs.page3, 1480);
        const img4 = await generateImage(pageRefs.page4, 1480);
        const img6 = await generateImage(pageRefs.page6, 1480)
        const img5 = await generateImage(pageRefs.page5, 1480);


        pdf.addImage(img1, 'PNG', 0, 0)
        pdf.addPage()
        pdf.addImage(img2, 'PNG', 0, 0);
        pdf.addPage();
        pdf.addImage(img3, 'PNG', 0, 0);
        pdf.addPage();
        pdf.addImage(img4, 'PNG', 0, 0);
        pdf.addPage();
        pdf.addImage(img6, 'PNG', 0, 0);
        pdf.addPage();
        pdf.addImage(img5, 'PNG', 0, 0);


        pdf.save(`${formattedDate}.dailyreport.pdf`)
    }

    return (
        <div className=' relative'>
            <div className='absolute right-[20%] top-[35px]'>
                <NavBar />
            </div>
            <div>
                <div ref={pageRefs.page1}>
                    <AfternoonPage1 />
                </div>
                <div ref={pageRefs.page2}>
                    <AfternoonPage2 />
                </div>
                <div ref={pageRefs.page3}>
                    <AfternoonPage3 />
                </div>
                <div ref={pageRefs.page4}>
                    <AfternoonPage4 />
                </div>
                <div ref={pageRefs.page6}>
                    <AfternoonPage6 />
                </div>
                <div ref={pageRefs.page5}>
                    <AfternoonPage5 />
                </div>
            </div>
            <div className='flex justify-evenly w-[50%] mb-5'>
                <Button color="success" onClick={generatePDF} variant="contained">
                    Tạo PDF
                </Button>

                <Button color="success" onClick={downloadImages} variant="contained">
                    Tải ảnh
                </Button>

            </div>

        </div>
    )
}

export default ReportAfternoon