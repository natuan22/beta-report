import React, { useState } from "react";
import Loading from "../../loading/Loading";
import { getColorBaseOnValue } from "../../helper/getColorBaseOnValue";
import moment from "moment";
import "./styles/closeButton.css";
import formatNumberCurrency from "../../helper/formatNumberCurrency";

const TableNews = ({ data, loading }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseIframe = () => {
    setSelectedItem(null);
  };

  return (
    <div className="mt-1 grid grid-cols-2">
      <div className="h-[700px] 2xl:w-[800px] xl:w-[650px] lg:w-[540px] md:w-[530px] overflow-auto">
        {!loading ? (
          Array.isArray(data) &&
          data.map((item, index) => {
            return (
              <div key={index} className="mx-1">
                <a
                  className="md:hidden sm:block no-underline"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    className={`${getColorBaseOnValue(
                      item.perChange
                    )} px-2 py-1 font-semibold text-lg sticky top-0 bg-[#d9e9fd] rounded-lg shadow-lg border border-[#2D4CEF] border-solid`}
                  >
                    {item.code}: {formatNumberCurrency(item.closePrice * 1000)}{" "}
                    ({item.perChange.toFixed(2)}%)
                  </div>
                  {item.news.map((newsItem, newsIndex) => {
                    return (
                      <div
                        className="flex py-2 pl-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleItemClick(newsItem)}
                        key={newsIndex}
                      >
                        <img
                          src={newsItem.img}
                          alt={newsItem.title}
                          width={150}
                          height={100}
                        />
                        <div className="py-2 pl-2">
                          <div className="font-semibold line-clamp-2">
                            {newsItem.title}
                          </div>
                          <div className="text-[0.8rem]">
                            {moment(newsItem.date).format("DD.MM.YYYY")}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </a>
                <div>
                  <div
                    className={`${getColorBaseOnValue(
                      item.perChange
                    )} px-2 py-1 font-semibold text-lg sticky top-0 bg-[#d9e9fd] rounded-lg shadow-lg border border-[#2D4CEF] border-solid`}
                  >
                    {item.code}: {formatNumberCurrency(item.closePrice * 1000)}{" "}
                    ({item.perChange.toFixed(2)}%)
                  </div>
                  {item.news.map((newsItem, newsIndex) => {
                    return (
                      <div
                        className="flex py-2 pl-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleItemClick(newsItem)}
                        key={newsIndex}
                      >
                        <img
                          src={newsItem.img}
                          alt={newsItem.title}
                          width={150}
                          height={100}
                        />
                        <div className="py-2 pl-2">
                          <div className="font-semibold line-clamp-2">
                            {newsItem.title}
                          </div>
                          <div className="text-[0.8rem]">
                            {moment(newsItem.date).format("DD.MM.YYYY")}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        ) : (
          <div className="h-[700px] flex items-center justify-center">
            <Loading />
          </div>
        )}
      </div>

      <div>
        {selectedItem ? (
          <div className="relative md:block sm:hidden xs:hidden xxs:hidden">
            <div className="close cursor-pointer" onClick={handleCloseIframe} />
            <iframe
              src={selectedItem.href}
              title={selectedItem.title}
              className="h-[700px] 2xl:w-[800px] xl:w-[650px] lg:w-[540px] md:w-[530px]"
            />
          </div>
        ) : (
          <div className="h-[700px] flex items-center justify-center dark:text-white text-black uppercase font-bold">
            Chọn tin để đọc
          </div>
        )}
      </div>
    </div>
  );
};

export default TableNews;
