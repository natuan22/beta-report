import { Select } from "antd";
import { motion } from "framer-motion";
import moment from "moment";
import React, { useState } from "react";
import { FaAngleDoubleDown } from "react-icons/fa";
import formatNumberCurrency from "../../helper/formatNumberCurrency";
import { getColorBaseOnValue } from "../../helper/getColorBaseOnValue";
import Loading from "../../loading/Loading";
import "./styles/closeButton.css";
import "./styles/selectCodeNews.css";
import { apiUrl } from "../../services/configService";

const TableNews = ({ data, loading }) => {
  const [clickItem, setClickItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState([]);
  const [visibleNewsItems, setVisibleNewsItems] = useState({});

  const handleItemClick = (item) => {
    setClickItem(item);
  };

  const handleCloseIframe = () => {
    setClickItem(null);
  };

  const handleChange = (value) => {
    setSelectedItem(value);
    setVisibleNewsItems({}); // Reset visible news items when selection changes
  };

  const handleShowMore = (e, code, totalNews) => {
    e.stopPropagation(); // Prevent the click event from propagating
    setVisibleNewsItems((prev) => ({
      ...prev,
      [code]: totalNews,
    }));
  };

  const options = data?.map((item) => ({
    label: item.code,
    value: item.code,
  }));

  // Lọc dữ liệu dựa trên selectedItem
  const filteredData = selectedItem.length
    ? data.filter((item) => selectedItem.includes(item.code))
    : data;

  return (
    <div className="shadow-lg">
      <div className="mx-1 mt-2">
        <Select
          mode="multiple"
          allowClear
          style={{
            width: "48.6%",
            height: "40px",
          }}
          placeholder="Chọn mã cổ phiếu"
          onChange={handleChange}
          options={options}
          className="select-code-news"
        />
      </div>
      <div className="my-2 grid grid-cols-2">
        <div className="h-[623px] 2xl:w-[800px] xl:w-[650px] lg:w-[540px] md:w-[530px] overflow-auto">
          {!loading ? (
            Array.isArray(filteredData) &&
            filteredData.map((item, index) => {
              const visibleNewsCount = visibleNewsItems[item.code] || 5;
              const visibleNews = item.news.slice(0, visibleNewsCount + 1); // Include the 6th item partially
              const totalNews = item.news.length;

              return (
                <div key={index} className="mx-1 mt-1 relative">
                  <div
                    className={`${getColorBaseOnValue(
                      item.perChange
                    )} px-2 py-1 font-semibold text-lg sticky top-0 bg-[#d9e9fd] rounded-lg shadow-lg border border-[#2D4CEF] border-solid`}
                  >
                    {item.code}: {formatNumberCurrency(item.closePrice * 1000)}{" "}
                    ({formatNumberCurrency(item.perChange)}%)
                  </div>
                  {visibleNews.map((newsItem, newsIndex) => (
                    <motion.div
                      className={`flex py-2 pl-2 cursor-pointer hover:bg-gray-100 ${
                        newsIndex === 5 && visibleNewsCount < totalNews
                          ? "relative h-[58px] overflow-hidden"
                          : ""
                      }`}
                      onClick={() => handleItemClick(newsItem)}
                      key={newsIndex}
                      whileHover={{
                        scale: 1.01,
                        transition: { duration: 1 },
                      }} // Áp dụng hiệu ứng khi hover
                      initial={{ opacity: 0, y: 10 }} // Thiết lập trạng thái ban đầu
                      animate={{ opacity: 1, y: 0 }} // Thiết lập trạng thái hiển thị
                    >
                      <motion.img
                        src={newsItem.img}
                        alt={newsItem.title}
                        width={150}
                        height={100}
                        initial={{ opacity: 0 }} // Thiết lập trạng thái ban đầu
                        animate={{ opacity: 1 }} // Thiết lập trạng thái hiển thị
                        transition={{ duration: 1 }}
                      />
                      <motion.div
                        className={`py-2 pl-2`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                      >
                        <motion.div className="font-semibold line-clamp-2">
                          {newsItem.title}
                        </motion.div>
                        <motion.div className="text-[0.8rem]">
                          {moment(newsItem.date).format("DD.MM.YYYY")}
                        </motion.div>
                      </motion.div>
                      {newsIndex === 5 && visibleNewsCount < totalNews && (
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-75 flex justify-center items-center h-full"
                          onClick={(e) =>
                            handleShowMore(e, item.code, totalNews)
                          }
                          whileHover={{ scale: 1.1 }}
                        >
                          <FaAngleDoubleDown className="w-[25px] h-[25px] text-center text-[#023e8a]" />
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              );
            })
          ) : (
            <div className="h-[623px] flex items-center justify-center">
              <Loading />
            </div>
          )}
        </div>

        <div>
          {clickItem ? (
            <div className="relative md:block sm:hidden xs:hidden xxs:hidden">
              <div
                className="close cursor-pointer"
                onClick={handleCloseIframe}
              />
              <iframe
                src={apiUrl + '/api/v1/news/proxy?url=' + clickItem.href}
                title={clickItem.title}
                className="h-[623px] 2xl:w-[800px] xl:w-[650px] lg:w-[540px] md:w-[530px]"
              />
            </div>
          ) : (
            <div className="h-[623px] flex items-center justify-center dark:text-white text-black uppercase font-bold">
              Chọn tin để đọc
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TableNews;
