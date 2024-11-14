import React, { useEffect, useState } from "react";
import convertUrlToDataURL from "../../helper/convertUrlToDataURL";
import formatNumber from "../../helper/formatNumber";
import { getColorBaseOnValue } from "../../helper/getColorBaseOnValue";
import { https, resourceURL } from "../../services/configService";
import DialogAddImgAndText from "../utils/component/DialogAddImgAndText";
import FooterAfternoon from "../utils/component/FooterAfternoon";
import HeaderAfternoon from "../utils/component/HeaderAfternoon";

const AfternoonPage2 = ({ role }) => {
  const [data, setData] = useState();
  const [imgSrc, setImgSrc] = useState();

  const getData = async () => {
    try {
      const response = await https.get("api/v1/report/ban-tin-chieu-2");
      setData(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onSubmitSuccess = () => {
    getData();
  };

  const getImgFromInput = (src) => {
    setImgSrc(src);
  };

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
    <div className="h-[1152px] w-[800px]">
      <div className="relative">
        {role === process.env.REACT_APP_ADMIN ? (
          <div className="absolute top-0 right-0 z-10 translate-x-[300px] translate-y-[200px]">
            <DialogAddImgAndText
              getImgFromInput={getImgFromInput}
              onSubmitSuccess={onSubmitSuccess}
            />
          </div>
        ) : (
          <div></div>
        )}

        <div className="header">
          <HeaderAfternoon />
        </div>
        {data ? (
          <div className="content h-[980px] w-full flex flex-col items-center">
            <div className="w-[93%]">
              <div className="content-top my-[10px] flex flex-col items-center">
                <table className="bg-transparent border-collapse w-[95%]">
                  <thead className="bg-[#0155B7]  border-1 border-[#0155B7] border-solid border-collapse">
                    <tr className="text-white ">
                      <th className="font-semibold px-2 py-1 text-left w-[100px] ">
                        Chỉ số
                      </th>
                      <th className="font-semibold px-1 py-1 w-[100px] ">
                        Điểm số
                      </th>
                      <th className="font-semibold px-1 py-1 ">%D</th>
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
                            item.day
                          )} text-center px-1 py-1`}
                        >
                          {formatNumber(item.day)}
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
                <div className="content-bot_img my-2">
                  <img src={imgSrc} width={675} height={367} alt="img" />
                </div>
                <div className="content-bot_text1 min-h-[239px]">
                  <p className="my-1 text-[#00429B] underline text- underline-offset-1 font-bold">
                    Nhận định thị trường:
                  </p>
                  <p className="my-2 indent-[20px] text-justify leading-[22px] ">
                    {data?.text[[0]]}
                  </p>
                </div>

                <div className="min-h-[140px]">
                  <p className=" my-2 content-bot_text2  indent-[22px]  text-justify leading-[20px]">
                    {data?.text[[1]]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}

        <div className="footer mt-[11px]">
          <FooterAfternoon pageNum={2} />
        </div>
      </div>
    </div>
  );
};

export default AfternoonPage2;
