import React, { useEffect, useState } from "react";
import HeaderWeek from "../../utils/HeaderWeek";
import FooterWeek from "../../utils/FooterWeek";
import formatNumber from "../../../helper/formatNumber";
import { getColorBaseOnValue } from "../../../helper/getColorBaseOnValue";
import banner from "../../../app/asset/img/testBanner.png";
import { https } from "../../../services/configService";
import DialogAddImgAndTextWeek from "./component/DialogAddImgAndTextWeek";
import convertUrlToDataURL from "../../../helper/convertUrlToDataURL";
const resourceURL = process.env.REACT_APP_IMG_URL;

const Page3Week = ({ role }) => {
  const [data, setData] = useState();
  const [imgSrc, setImgSrc] = useState();

  const getData = async () => {
    try {
      const response = await https.get("api/v1/report/ban-tin-tuan-2");
      setData(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };
  const getImgFromInput = (src) => {
    setImgSrc(src);
  };
  const onSubmitSuccess = () => {
    getData();
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (data && data.image) {
      convertUrlToDataURL(`${resourceURL}${data.image}`).then((dataUrl) => {
        setImgSrc(dataUrl);
      });
    } else {
      setImgSrc("");
    }
  }, [data]);
  return (
    <div className="h-[1480px] w-[800px] relative">
      <div className="header">
        <HeaderWeek />
      </div>

      {role === "V0U1S" ? (
        <div className="absolute top-0 right-0 translate-x-[250px] translate-y-[250px]">
          <DialogAddImgAndTextWeek
            onSubmitSuccess={onSubmitSuccess}
            getImgFromInput={getImgFromInput}
          />
        </div>
      ) : (
        <div></div>
      )}

      <div className="content h-[950px] w-full flex flex-col items-center mt-[20px]">
        {data ? (
          <div className="w-[95%]">
            <div className="content-top my-[10px] flex flex-col items-center h-[160px]">
              <table className="bg-transparent border-collapse w-[95%]">
                <thead className="bg-[#0155B7]  border-1 border-[#0155B7] border-solid border-collapse">
                  <tr className="text-white ">
                    <th className="font-semibold px-2 py-1 text-left w-[100px] ">
                      Chỉ số
                    </th>
                    <th className="font-semibold px-1 py-1 w-[100px] ">
                      Điểm số
                    </th>
                    <th className="font-semibold px-1 py-1 ">%W</th>
                    <th className="font-semibold px-1 py-1 ">%1M</th>
                    <th className="font-semibold px-1 py-1 ">%YtD</th>
                    <th className="font-semibold px-1 py-1 ">%YoY</th>
                    <th className="font-semibold px-1 py-1  w-[100px] ">
                      GTGD <span className="text-[11px]">(tỷ VNĐ)</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="border-1 ">
                  {data.table?.map((item, index) => (
                    <tr
                      className="border-[#0155B7] border-solid border-[0.5px] border-l-0 border-r-0 border-collapse font-semibold "
                      key={index}
                    >
                      <td className="text-left pl-2 py-1 font-bold">
                        {item.name}
                      </td>
                      <td className="text-right px-2 py-1">
                        <p className="m-0 translate-x-[-15px]">
                          {formatNumber(item.price)}
                        </p>
                      </td>

                      <td
                        className={` ${getColorBaseOnValue(
                          item.week
                        )} text-center px-1 py-1`}
                      >
                        {formatNumber(item.week)}
                      </td>
                      <td
                        className={` ${getColorBaseOnValue(
                          item.month
                        )} text-center px-1 py-1`}
                      >
                        {formatNumber(item.month)}
                      </td>
                      <td
                        className={` ${getColorBaseOnValue(
                          item.ytd
                        )} text-center px-1 py-1`}
                      >
                        {formatNumber(item.ytd)}
                      </td>
                      <td
                        className={` ${getColorBaseOnValue(
                          item.year
                        )} text-center px-1 py-1`}
                      >
                        {formatNumber(item.year)}
                      </td>
                      <td className={`  text-right px-1 py-1`}>
                        <p className="m-0 translate-x-[-18px]">
                          {formatNumber(item.totalVal / 1000000000)}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="content-bot w-full flex flex-col items-center justify-center">
              <div className="content-bot_img mt-[25px] mb-[10px]">
                <img src={imgSrc} width={675} height={367} alt="img" />
              </div>
              <div className="content-bot_text1 min-h-[235x]">
                <p className="my-1 text-[#00429B] underline  underline-offset-1 font-bold">
                  Nhận định thị trường:
                </p>
                <p className="my-1 indent-[20px] text-justify leading-[22px] ">
                  {data?.text[[0]]}
                </p>
              </div>

              <div className="min-h-[140px]">
                <p className=" my-2 content-bot_text2   indent-[22px]  text-justify leading-[20px]">
                  {data?.text[[1]]}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-[50px] text-center ">Loading...</div>
        )}
      </div>

      <div className="footer">
        <FooterWeek pageNum={2} />
      </div>
    </div>
  );
};

export default Page3Week;
