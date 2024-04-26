import { Button } from "@mui/material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { userLogoutAction } from "./Auth/thunk";
import NavBar from "./app/component/NavBar";
import { homNay } from "./helper/getDate";
import Page1 from "./utils/Page1";
import Page2 from "./utils/Page2";
import Page3 from "./utils/Page3";
import Page4 from "./utils/Page4";
import Page5 from "./utils/Page5";

const Home = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(localStorage.getItem("_il"));
  const [role, setRole] = useState(localStorage.getItem("2ZW79"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const handleUserLogout = () => {
    if (isLogin) {
      setIsLogin(null);
      setRole(null);
      dispatch(userLogoutAction());
      localStorage.setItem("_il", "4E8WL");
      localStorage.removeItem("2ZW79");
      localStorage.removeItem("user");
    }
  };
  const onSubmitSuccess = () => {
    setIsLogin(localStorage.getItem("_il"));
    setRole(localStorage.getItem("2ZW79"));
    setUser(JSON.parse(localStorage.getItem("user")));
  };

  const pageRefs = {
    page1: useRef(null),
    page2: useRef(null),
    page3: useRef(null),
    page4: useRef(null),
    page5: useRef(null),
  };

  const generateImage = async (pageRef, height) => {
    if (!pageRef.current) return null;
    const canvas = await html2canvas(pageRef.current, {
      width: 800,
      height,
      scale: 2,
    }); // Kích thước A4
    return canvas.toDataURL("image/png");
  };

  const downloadImages = async () => {
    const img1 = await generateImage(pageRefs.page1, 1121);
    const img2 = await generateImage(pageRefs.page2, 1121);
    const img3 = await generateImage(pageRefs.page3, 1121);
    const img4 = await generateImage(pageRefs.page4, 1121);

    const link1 = document.createElement("a");
    link1.href = img1;
    link1.download = "BetaMorningNews-Trang1.png";
    link1.click();

    const link2 = document.createElement("a");
    link2.href = img2;
    link2.download = "BetaMorningNews-Trang2.png";
    link2.click();

    const link3 = document.createElement("a");
    link3.href = img3;
    link3.download = "BetaMorningNews-Trang3.png";
    link3.click();

    const link4 = document.createElement("a");
    link4.href = img4;
    link4.download = "BetaMorningNews-Trang4.png";
    link4.click();
  };
  const downloadImageMarketMorning = async () => {
    const img5 = await generateImage(pageRefs.page5, 1121);
    const link5 = document.createElement("a");
    link5.href = img5;
    link5.download = `Kết-phiên-sáng-${homNay}`;
    link5.click();
  };
  const generatePDFMarketMorning = async () => {
    const pdf = new jsPDF();
    const img5 = await generateImage(pageRefs.page5, 1480);

    pdf.addImage(img5, "PNG", 0, 0, 210, 391);

    pdf.save(`Kết-phiên-sáng-${homNay}.pdf`);
  };
  const generatePDF = async () => {
    const pdf = new jsPDF();
    const img1 = await generateImage(pageRefs.page1, 1480);
    const img2 = await generateImage(pageRefs.page2, 1480);
    const img3 = await generateImage(pageRefs.page3, 1480);
    const img4 = await generateImage(pageRefs.page4, 1480);

    pdf.addImage(img1, "PNG", 0, 0, 210, 392);
    pdf.addPage();
    pdf.addImage(img2, "PNG", 0, 0, 210, 392);
    pdf.addPage();
    pdf.addImage(img3, "PNG", 0, 0, 210, 392);
    pdf.addPage();
    pdf.addImage(img4, "PNG", 0, 0, 210, 392);

    pdf.save(`BetaMorningNews-${homNay}.pdf`);
  };

  useEffect(() => {
    document.title = "Bản tin sáng";
  }, []);

  return (
    <div className="relative">
      <div className="absolute right-[10%] top-[1%]">
        <NavBar
          isLogin={isLogin}
          user={user}
          handleUserLogout={handleUserLogout}
          onSubmitSuccess={onSubmitSuccess}
        />
      </div>
      <div>
        <div ref={pageRefs.page1}>
          <Page1 role={role} />
        </div>
        <div ref={pageRefs.page2}>
          <Page2 />
        </div>
        <div ref={pageRefs.page3}>
          <Page3 role={role} />
        </div>
        <div ref={pageRefs.page4}>
          <Page4 />
        </div>
        <div ref={pageRefs.page5}>
          <Page5 />
        </div>
      </div>
      <div className="flex justify-evenly w-[50%] mb-5">
        <Button color="success" onClick={generatePDF} variant="contained">
          Tạo PDF
        </Button>

        <Button color="success" onClick={downloadImages} variant="contained">
          Tải ảnh
        </Button>

        <Button
          color="primary"
          onClick={generatePDFMarketMorning}
          variant="contained"
        >
          Tạo PDF kết phiên sáng
        </Button>
        <Button
          color="primary"
          onClick={downloadImageMarketMorning}
          variant="contained"
        >
          Tải ảnh kết phiên sáng
        </Button>
      </div>
    </div>
  );
};

export default Home;
