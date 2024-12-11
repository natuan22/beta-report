import React, { useEffect, useState } from "react";
import iconDeco from "../app/asset/img/iconDeco.png";
import DialogAddStock from "../component/DialogAddStock";
import DialogIdentify from "../component/DialogIdentify";
import Footer from "../component/Footer";
import Header from "../component/Header";
import formatNumberPage3 from "../helper/formatNumberPage3";
import { https } from "../services/configService";

const Page3 = ({ role }) => {
  const [data, setData] = useState();
  const [dataStock, setDataStock] = useState([]);

  useEffect(() => {
    const getTextAndStock = async () => {
      try {
        const response = await https.get(
          "/api/v1/report/nhan-dinh-thi-truong-redis"
        );
        setData(response.data.data);
        setDataStock(response.data.data.stock_buy);
      } catch (err) {
        console.error(err);
      }
    };

    getTextAndStock();
  }, []);

  const catchText = (arrText) => {
    setData(arrText);
  };
  const catchStock = (arrStock) => {
    setDataStock(arrStock);
  };

  return (
    <div className="h-[1152px] w-[800px] relative ">
      {role === process.env.REACT_APP_ADMIN ? (
        <div className="absolute top-[15%] right-[-40%] flex flex-col justify-evenly h-[150px]  ">
          <div>
            <DialogIdentify catchText={catchText} />
          </div>
          <div>
            <DialogAddStock catchStock={catchStock} />
          </div>
        </div>
      ) : (
        <div></div>
      )}

      <div className="header">
        <Header date={"21/11/2023"} type={2} />
      </div>

      <div className="content-top flex flex-col items-center justify-evenly h-[580px] mt-[10px]  ">
        <div className="title text-center">
          <h2
            className="m-0 text-[30px] text-[#064BAD] "
            style={{ textShadow: "-2px 3px 3px #E88C08 " }}
          >
            NHẬN ĐỊNH THỊ TRƯỜNG
          </h2>
          <h2
            className="m-0 text-[30px] text-[#064BAD] "
            style={{ textShadow: "-2px 3px 3px #E88C08 " }}
          >
            ĐẦU PHIÊN
          </h2>
        </div>
        <div className="text bg-[#E5EFFF] h-[480px] rounded-3xl border-dashed border-[2px] border-[#064BAD] p-5 w-[760px] relative  ">
          <div className="absolute top-[10px] left-[30px]">
            <img src={iconDeco} alt="" />
          </div>
          <div className="flex flex-col items-center justify-center h-full ">
            <p className=" text-base leading-6 text-justify indent-[20px] line-clamp-[8] ">
              {data?.text[0]}
            </p>
            <p className=" text-base leading-6 text-justify indent-[20px] line-clamp-[7] ">
              {data?.text[1]}
            </p>
          </div>

          <div className="absolute bottom-[15px] right-[30px]">
            <img src={iconDeco} alt="" />
          </div>
        </div>
      </div>

      <div className="content-bot  flex flex-col items-center  h-[400px]">
        <div className="title text-center">
          <h2
            className="m-0 text-[30px] text-[#064BAD] "
            style={{ textShadow: "-2px 3px 3px #E88C08 " }}
          >
            CỔ PHIẾU KHUYẾN NGHỊ CỦA BETA
          </h2>
        </div>
        {dataStock?.length > 0 ? (
          <div
            className={`stockRecommend   w-[800px] ${
              dataStock?.length > 2
                ? "flex flex-wrap items-center justify-center"
                : "flex flex-col justify-center items-center"
            }`}
          >
            {dataStock?.map((item, index) => {
              return (
                <div
                  className={`${
                    item.isBuy ? "border-[#116DDF]" : "border-red-500"
                  } stock-card flex  items-center   w-[47%] my-[5px] border-1 border-collapse border-solid  mr-2 rounded-lg `}
                  key={index}
                >
                  <div className="flex flex-col items-center w-[130px] h-auto ">
                    <img
                      src={`/assets/logo/logo_${item.code.toUpperCase()}.png`}
                      alt="imgStock"
                      width="55%"
                      height="55%"
                      className=""
                    />
                  </div>
                  <div className="stock-card_content w-[300px]   ">
                    {item.isBuy ? (
                      <>
                        <p className="m-1">
                          Mã:{" "}
                          <span className="font-bold ml-2">
                            {item.code.toUpperCase()}
                          </span>{" "}
                        </p>
                        <p className="m-1">
                          Giá khuyến nghị:{" "}
                          <span className="font-bold ml-2">
                            {formatNumberPage3(item.buyPrice * 1)}{" "}
                            <span className="font-semibold">đồng</span>
                          </span>
                        </p>
                        <p className="m-1">
                          Giá mục tiêu:{" "}
                          <span className="font-bold ml-2">
                            {formatNumberPage3(item.sellPrice * 1)}{" "}
                            <span className="font-semibold">đồng</span>
                          </span>
                        </p>
                        <p className="m-1">
                          Giá ngưng lỗ:{" "}
                          <span className="font-bold ml-2">
                            {" "}
                            {formatNumberPage3(item.rate * 1)}{" "}
                            <span className="font-semibold">đồng</span>
                          </span>{" "}
                        </p>
                        <p className="m-1">
                          Tỷ suất sinh lời kỳ vọng:{" "}
                          <span className="font-bold ml-2">
                            {" "}
                            {formatNumberPage3(item.profit * 1)} %
                          </span>{" "}
                        </p>
                        <p className="m-1">
                          Thời gian nắm giữ:{" "}
                          <span className="font-bold ml-2"> {item.time}</span>{" "}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="m-1">
                          Mã:{" "}
                          <span className="font-bold ml-2">
                            {item.code.toUpperCase()}
                          </span>{" "}
                        </p>
                        <p className="m-1">
                          Giá mua:{" "}
                          <span className="font-bold ml-2">
                            {formatNumberPage3(item.buyPrice * 1)}{" "}
                            <span className="font-semibold">đồng</span>
                          </span>
                        </p>
                        <p className="m-1">
                          Giá bán:{" "}
                          <span className="font-bold ml-2">
                            {formatNumberPage3(item.sellPrice * 1)}{" "}
                            <span className="font-semibold">đồng</span>
                          </span>
                        </p>
                        <p className="m-1">
                          Tỷ suất sinh lời/lỗ:{" "}
                          <span className="font-bold ml-2">
                            {" "}
                            {formatNumberPage3(item.rate * 1)} %
                          </span>{" "}
                        </p>
                        <p className="m-1">
                          Chốt lời/lỗ:{" "}
                          <span className="font-bold ml-2"> {item.profit}</span>{" "}
                        </p>
                        <p className="m-1">
                          Thời gian nắm giữ:{" "}
                          <span className="font-bold ml-2"> {item.time}</span>{" "}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="">
        <Footer pageNum={3} />
      </div>
    </div>
  );
};

export default Page3;
