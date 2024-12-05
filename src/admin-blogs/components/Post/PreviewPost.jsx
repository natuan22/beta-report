import {
  DoubleRightOutlined,
  EnvironmentOutlined,
  FacebookOutlined,
  GlobalOutlined,
  MailOutlined,
  PhoneOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { motion } from "framer-motion";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FaTiktok } from "react-icons/fa";
import { NavLink, useParams } from "react-router-dom";
import { getApi } from "../../../helper/getApi";
import { apiUrl, resourceURL } from "../../../services/configService";

moment.updateLocale("vi", {
  weekdays: [
    "Chủ nhật",
    "Thứ hai",
    "Thứ ba",
    "Thứ tư",
    "Thứ năm",
    "Thứ sáu",
    "Thứ bảy",
  ],
  weekdaysShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
  weekdaysMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
  months: [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ],
  monthsShort: [
    "Thg 1",
    "Thg 2",
    "Thg 3",
    "Thg 4",
    "Thg 5",
    "Thg 6",
    "Thg 7",
    "Thg 8",
    "Thg 9",
    "Thg 10",
    "Thg 11",
    "Thg 12",
  ],
});

const PreviewPost = () => {
  const count = 12;
  const { idPost } = useParams()
  
  const [previewPost, setPreviewPost] = useState(null);
  const [fromData, setFromData] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState(null);
  const [visibleBlogsCount, setVisibleBlogsCount] = useState(5);

  const handleShowMore = () => { setVisibleBlogsCount((prevCount) => prevCount + 5) };

  const fetchDataPost = async (id) => {
    try {
      const dataPost = await getApi(`/api/v1/blogs/post/${id}`);
      setPreviewPost(dataPost);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDataPostWithTags = async (tags) => {
    try {
      const tagsString = tags.join(",");
      const relatedBlogs = await getApi(`/api/v1/blogs/post-tags?tags=${tagsString}`);

      return relatedBlogs
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const storedPost = localStorage.getItem("previewPost");
    if (storedPost) {
      const parsedPost = JSON.parse(storedPost);
      setFromData(parsedPost.from);
      
      if (parsedPost.from === "editOnSave" && parsedPost.id && idPost == parsedPost.id) {
        fetchDataPost(idPost);
      } else {
        setPreviewPost(parsedPost);
      }
    }
  }, [idPost]);

  useEffect(() => {
    const fetchAndSetRelatedBlogs = async () => {
      if (previewPost && previewPost.tags && previewPost.tags.length > 0) {
        try {
          const relatedBlogs = await fetchDataPostWithTags(previewPost.tags);
          const filteredBlogs = relatedBlogs.filter((item) => item.id !== Number(previewPost.id));
  
          setRelatedBlogs(filteredBlogs);
        } catch (error) {
          console.error("Error fetching related blogs:", error);
        }
      }
    };
  
    fetchAndSetRelatedBlogs();
  }, [previewPost]);

  const addClassToImages = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");

    // Lấy tất cả các thẻ <img> và thêm class vào mỗi thẻ <img>
    const images = doc.querySelectorAll("img");
    images.forEach((img) => {
      img.classList.add(
        "my-1",
        "block",
        "float-none",
        "align-top",
        "relative",
        "max-w-[100%]"
      );
    });

    // Lấy tất cả các thẻ <p> và kiểm tra nếu chúng chứa thẻ <img>, nếu có thì thêm class vào thẻ <p>
    const paragraphs = doc.querySelectorAll("p");
    paragraphs.forEach((p) => {
      if (p.querySelector("img")) {
        p.classList.add("flex", "justify-center");
      }
    });

    // Trả về nội dung HTML đã thay đổi
    return doc.body.innerHTML;
  };

  const processedContent = previewPost?.content ? addClassToImages(previewPost.content) : "";

  return (
    <div>
      <div className="sticky top-0 z-40">
        <header>
          <nav className="dark:bg-black bg-white shadow-md dark:shadow-stone-900 shadow-zinc-400 mb-1">
            <div className="max-w-[87rem] mx-auto px-4 xl:px-7 lg:px-8">
              <div className="flex items-center justify-between w-full h-16">
                <div className="flex items-center sm:justify-evenly xs:justify-start w-full">
                  <div className="flex-shrink-0">
                    <img
                      className="w-[87px] h-[33px]"
                      src={`${apiUrl}/resources/icons/logo-beta-color.png`}
                      alt="Beta logo"
                    />
                  </div>
                  {/* desktop */}
                  <div className="hidden xl:block w-max">
                    <div className="ml-4 flex items-baseline space-x-3">
                      {Array.from({ length: count }, (_, index) => (
                        <NavLink
                          key={index}
                          to="/"
                          className={({ isActive }) =>
                            isActive
                              ? "no-underline text-white bg-[#0050AD] hover:bg-[#0050AD] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                              : "no-underline dark:text-gray-300 text-black hover:bg-[#0050AD] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                          }
                        >
                          Trang chủ
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>
      <div id="header-blogs" className="py-16 bg-[#f5f6f9]">
        <div className="container-blogs mx-auto">
          <div className="text-center flex flex-col gap-4">
            <h1 className="m-0 dark:text-gray-300 text-black">{previewPost?.title}</h1>
            <div className="flex justify-center items-center gap-3">
              <div className="text-[#00b71f]">{previewPost?.category.name}</div>
              <div className="text-[#bbb]">|</div>
              <div className="dark:text-gray-300 text-black">
                {previewPost?.created_at ? moment(previewPost.created_at).locale("vi").format("dddd, DD/MM/YYYY") : moment().format("dddd, DD/MM/YYYY")}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="body-blogs" className="container-blogs mx-auto px-3 pt-5 text-justify">
        <div className="text-lg pb-5">
          <strong>{previewPost?.description}</strong>
        </div>
        <div className="flex justify-center">
          <img
            src={fromData === "editOnSave" ? `${resourceURL}${previewPost?.thumbnail}` : `${previewPost?.thumbnail}`}
            alt="thumbnail-post"
            className="my-1 block float-none align-top relative max-w-[100%]"
          ></img>
        </div>
        <div dangerouslySetInnerHTML={{ __html: processedContent }}></div>
      </div>
      <div id="footer-blogs" className="container-blogs mx-auto">
        <hr className="h-px mt-7 border-0 bg-gray-600/50"></hr>
        <div>
          <div class="flex items-center gap-2">
            <div class="min-w-[3px] h-[35px] bg-[#0050AD] rounded-t-[100px]"></div>
            <h2>Bài viết liên quan</h2>
          </div>
          <div>
            {relatedBlogs && relatedBlogs.length > 0 ? (
              <>
                {relatedBlogs.slice(0, visibleBlogsCount).map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col p-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{
                      scale: 1.01,
                      transition: { duration: 0.4 },
                    }}
                  >
                    <div className="flex gap-10 justify-between">
                      <motion.div
                        className="w-[77%]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="flex gap-3">
                          {item.tags.map((tag, tagIndex) => (
                            <motion.div
                              key={tagIndex}
                              className="text-[#0050AD] text-base"
                              whileHover={{ scale: 1.1 }}
                            >
                              #{tag.name}
                            </motion.div>
                          ))}
                        </div>
                        <div className="text-lg font-medium mb-3">
                          {item.title}
                        </div>
                        <div className=" dark:text-gray-600 text-gray-400 text-[15px] mb-3 line-clamp-2">
                          {item.description}
                        </div>
                        <div className="dark:text-gray-600 text-gray-400 text-sm">
                          {moment(item.created_at).format("DD/MM/YYYY")}
                        </div>
                      </motion.div>
                      <motion.div
                        className="card-img w-[23%]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="h-[150px]">
                          <motion.img
                            src={`${resourceURL}${item.thumbnail}`}
                            alt={item.title}
                            className="w-full h-full rounded"
                            whileHover={{
                              scale: 1.1,
                              transition: { duration: 0.3 },
                            }}
                          />
                        </div>
                      </motion.div>
                    </div>
                    <div className="border-solid border-b-[1px] border-x-0 border-t-0 border-gray-600/50 mt-[14px]"></div>
                  </motion.div>
                ))}

                {visibleBlogsCount < relatedBlogs.length && (
                  <motion.div
                    className="flex justify-center items-center py-2"
                    onClick={handleShowMore}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Button
                      type="primary"
                      ghost
                      className="text-base font-medium h-[38px] rounded-3xl"
                    >
                      Xem thêm
                    </Button>
                  </motion.div>
                )}
              </>
            ) : (
              <div className="p-3 text-lg">Không có bài viết liên quan nào</div>
            )}
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <footer
          className={`relative z-10 pt-10 pb-10 px-10 my-2.5 bg-cover`}
          style={{
            backgroundImage: `url('${apiUrl}/resources/images/bg_footer.png')`,
          }}
        >
          <div className="container mx-auto">
            <div className="mb-1 w-[130px] xl:translate-x-28 lg:translate-x-16 md:translate-x-8 sm:translate-x-20 xs:translate-x-16 xxs:translate-x-12">
              <a
                href="http://www.bsi.com.vn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="w-[125px] h-[45px]"
                  src={`${apiUrl}/resources/icons/logo-beta-reverse.png`}
                  alt="Beta logo"
                />
              </a>
            </div>
            <div className="md:flex sm:block">
              <div className="md:w-[30%] sm:w-full">
                <div className="w-full">
                  <h4 className="text-[#faad14] lg:mb-3 md:mb-1 font-semibold uppercase xs:text-xl sm:text-base md:text-sm lg:text-[14px] xl:text-xl">
                    Công ty cổ phần chứng khoán BETA
                  </h4>
                  <div className="text-white text-justify md:text-xs lg:text-[15px] xl:text-base">
                    Công ty Cổ phần Chứng khoán BETA được thành lập vào ngày
                    06/12/2007, sau hơn 15 năm phát triển không ngừng, BETA từng
                    bước khẳng định vị thế của mình trên thị trường chứng khoán
                    Việt Nam. BETA hướng tới sự ổn định và phát triển bền vững
                    nguồn tài chính cho từng khách hàng.
                  </div>

                  <div className="mb-10 w-full">
                    <div className="w-fit mb-3 mt-3 flex items-center xs:translate-x-[35px] sm:translate-x-[65px] mb:translate-x-[60px] lg:translate-x-[35px] xl:translate-x-[75px]">
                      <a
                        href="https://www.facebook.com/congtychungkhoanbeta"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white mx-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E5E5]"
                      >
                        <FacebookOutlined style={{ fontSize: "35px" }} />
                      </a>
                      <a
                        href="https://www.youtube.com/channel/UCEDt7r9WgLDjUeM_PRdQB7g"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white mx-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E5E5]"
                      >
                        <YoutubeOutlined style={{ fontSize: "35px" }} />
                      </a>
                      <a
                        href="https://www.bsi.com.vn"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white mx-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E5E5]"
                      >
                        <GlobalOutlined style={{ fontSize: "35px" }} />
                      </a>
                      <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white mx-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E5E5]"
                      >
                        <FaTiktok style={{ fontSize: "35px" }} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-[70%] sm:w-full">
                <div className="grid sm:grid-cols-2 xs:grid-cols-none">
                  <div className="md:pl-14 sm:pl-0">
                    <h4 className="text-[#faad14] mb-3 font-semibold uppercase xs:text-xl sm:text-base md:text-sm lg:text-[14px] xl:text-xl">
                      Trụ sở chính
                    </h4>
                    <div>
                      <ul className="list-none text-white">
                        <li className="mb-2">
                          <EnvironmentOutlined />{" "}
                          <span className="lg:text-sm xl:text-base md:text-xs xs:text-[15px] xxs:text-[11px]">
                            55 Nam Kỳ Khởi Nghĩa, Quận 1, TP.HCM
                          </span>
                        </li>
                        <li className="mb-2">
                          <PhoneOutlined />{" "}
                          <a
                            href="tel:02839142929"
                            className="no-underline text-white sm:text-sm lg:text-base md:text-xs"
                          >
                            Điện thoại: 02839142929
                          </a>
                        </li>
                        <li className="mb-2">
                          <MailOutlined />{" "}
                          <a
                            href="mailto:support@bsi.com.vn"
                            className="no-underline text-white sm:text-sm lg:text-base md:text-xs"
                          >
                            support@bsi.com.vn
                          </a>
                        </li>
                        <li className="mb-2">
                          <a
                            href="https://www.bsi.com.vn"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="no-underline text-white mb-2 inline-block text-base leading-loose sm:text-sm lg:text-base md:text-xs"
                          >
                            <GlobalOutlined /> https://www.bsi.com.vn
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="sm:px-3 xs:px-0">
                    <div className="mb-6 w-full">
                      <h4 className="text-[#faad14] mb-3 font-semibold uppercase xs:text-xl sm:text-base md:text-sm lg:text-[14px] xl:text-xl">
                        Truy cập nhanh
                      </h4>
                      <div className="grid md:grid-cols-2 sm:grid-cols-none xs:grid-cols-2">
                        <ul className="list-none">
                          <li>
                            <NavLink
                              to="/"
                              className="no-underline text-white inline-block leading-loose"
                            >
                              <DoubleRightOutlined />{" "}
                              <span className="lg:text-base md:text-sm">
                                Trang chủ
                              </span>
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/thi-truong"
                              className="no-underline text-white inline-block leading-loose"
                            >
                              <DoubleRightOutlined />{" "}
                              <span className="lg:text-base md:text-sm">
                                Thị trường
                              </span>
                            </NavLink>
                          </li>
                          {/* <li>
                            <NavLink
                              to="/nganh"
                              className="no-underline text-white inline-block leading-loose"
                            >
                              <DoubleRightOutlined />{" "}
                              <span className="lg:text-base md:text-sm">
                                Ngành
                              </span>
                            </NavLink>
                          </li> */}
                          <li>
                            <NavLink
                              to="/co-phieu"
                              className="no-underline text-white inline-block leading-loose"
                            >
                              <DoubleRightOutlined />{" "}
                              <span className="lg:text-base md:text-sm">
                                Cổ phiếu
                              </span>
                            </NavLink>
                          </li>
                        </ul>

                        <ul className="list-none">
                          {/* <li>
                            <NavLink
                              to="/vi-mo"
                              className="no-underline text-white inline-block leading-loose"
                            >
                              <DoubleRightOutlined />{" "}
                              <span className="lg:text-base md:text-sm">
                                Vĩ mô
                              </span>
                            </NavLink>
                          </li> */}
                          <li>
                            <NavLink
                              to="/cong-cu-dau-tu"
                              className="no-underline text-white inline-block leading-loose"
                            >
                              <DoubleRightOutlined />{" "}
                              <span className="lg:text-base md:text-xs">
                                Công cụ đầu tư
                              </span>
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/trung-tam-tin-tuc"
                              className="no-underline text-white inline-block leading-loose"
                            >
                              <DoubleRightOutlined />{" "}
                              <span className="lg:text-base md:text-[11px] xs:text-[14px]">
                                Trung tâm tin tức
                              </span>
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/trung-tam-phan-tich"
                              className="no-underline text-white inline-block leading-loose"
                            >
                              <DoubleRightOutlined />{" "}
                              <span className="lg:text-base md:text-sm">
                                Trung tâm phân tích
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PreviewPost;
