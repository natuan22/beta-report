import { Button, TextField } from "@mui/material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useDebounce } from "react-use";
import { userLogoutAction } from "../Auth/thunk";
import NavBar from "../app/component/NavBar";
import { https } from "../services/configService";
import AnalysisPage1 from "./component/AnalysisPage1/AnalysisPage1";
import AnalysisPage2 from "./component/AnalysisPage2/AnalysisPage2";
import AnalysisPage3 from "./component/AnalysisPage3/AnalysisPage3";

const AnalysisReportAutomation = () => {
  const dispatch = useDispatch();
  const { code } = useParams();

  const [valStock, setValStock] = useState(code);
  const [debouncedValue, setDebouncedValue] = useState(code);
  const [dataSearch, setDataSearch] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const wrapperRef = useRef(null); // Ref cho phần div chứa dữ liệu

  const [isLogin, setIsLogin] = useState(localStorage.getItem("_il"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const handleUserLogout = () => {
    if (isLogin) {
      setIsLogin(null);
      dispatch(userLogoutAction());
      localStorage.setItem("_il", "4E8WL");
      localStorage.removeItem("user");
    }
  };
  const onSubmitSuccess = () => {
    setIsLogin(localStorage.getItem("_il"));
    setUser(JSON.parse(localStorage.getItem("user")));
  };
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
      setDebouncedValue(valStock);
    },
    500,
    [valStock]
  );

  useEffect(() => {
    function handleClickOutside(event) {
      // Kiểm tra xem người dùng có click ra ngoài giao diện không
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsFocus(false); // Nếu click ra ngoài, ẩn div chứa dữ liệu
      }
    }

    // Thêm sự kiện click vào document
    document.addEventListener("mousedown", handleClickOutside);

    // Xóa sự kiện khi component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (debouncedValue === "") {
      setDataSearch([]);
      return;
    }

    const searchData = async (stock) => {
      try {
        const res = await https.get("/api/v1/investment/search", {
          params: {
            stock,
          },
        });
        setDataSearch(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    searchData(debouncedValue);
  }, [debouncedValue]);

  const handleEnterPress = () => {
    if (dataSearch.length > 0) {
      window.location.href = `/phan-tich-ky-thuat-tu-dong/${dataSearch[0].code}`;
    }
  };

  useEffect(() => {
    document.title = `${code} - Phân tích kỹ thuật tự động`;
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
      <div className="absolute left-0 top-[50px] translate-x-[850px] z-10 ">
        <TextField
          onChange={({ currentTarget }) => {
            setValStock(currentTarget.value);
          }}
          onFocus={() => {
            setIsFocus(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleEnterPress();
            }
          }}
          value={valStock}
          inputProps={{ maxLength: 3 }}
          id="outlined-basic"
          label="Mã CP"
          variant="outlined"
          autoComplete="off"
        />
        {dataSearch?.length > 0 && isFocus && (
          <div
            ref={wrapperRef}
            className="absolute w-[400px] h-[300px] top-[56px] bg-white shadow-lg z-[30] p-3 rounded-bl-xl rounded-br-xl overflow-y-auto"
          >
            {dataSearch?.map((item, index) => {
              const isFirstItem = index === 0;

              return (
                <a
                  key={index}
                  className={`${
                    isFirstItem ? "bg-[#0000000a]" : "bg-transparent"
                  } text-black flex justify-between items-center border-solid border border-b-2 border-t-0 border-x-0 border-black/50 p-2 hover:bg-[#0000000a] duration-500 cursor-pointer no-underline`}
                  href={`/phan-tich-ky-thuat-tu-dong/${item.code}`}
                >
                  <div className="font-semibold">
                    <div className="w-[50px]">{item.code}</div>
                  </div>
                  <div className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    {item.company_name}
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
      <div>
        <div ref={pageRefs.page1}>
          <AnalysisPage1 stock={code} type={0} />
        </div>
        <div ref={pageRefs.page2}>
          <AnalysisPage2 stock={code} />
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
