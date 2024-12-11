import { Checkbox, message, Tooltip } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { BsClockHistory } from "react-icons/bs";
import {
  IoMdCheckmarkCircleOutline,
  IoMdCloseCircleOutline,
} from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getApi } from "../../../helper/getApi";
import { postApi } from "../../../helper/postApi";
import Loading from "../../../loading/Loading";

const Posts = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [dataPosts, setDataPosts] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [selectedItems, setSelectedItems] = useState([]);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const warning = (text, type) => {
    messageApi.open({ type, content: text });
  };
  const fetchDataPosts = async () => {
    try {
      const data = await getApi(`/api/v1/blogs-admin/post`);
      setDataPosts(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDataPosts();
  }, []);

  const handleCheckboxChange = (id, checked) => {
    setSelectedItems((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id)
    );

    if (!checked) {
      setIsSelectAll(false);
    } else if (
      dataPosts.every(
        (post) => selectedItems.includes(post.key) || post.id === id
      )
    ) {
      setIsSelectAll(true);
    }
  };

  const handleSelectAll = (checked) => {
    setIsSelectAll(checked);
    if (checked) {
      // Chọn tất cả các bài viết
      const allIds = dataPosts.map((post) => post.id);
      setSelectedItems(allIds);
    } else {
      // Bỏ chọn tất cả
      setSelectedItems([]);
    }
  };

  const handleDelPost = async () => {
    if (selectedItems.length === 0) {
      warning("Vui lòng chọn ít nhất một bài viết để xóa!", "warning");
      return;
    }
    
    try {
      const confirmDelete = await Swal.fire({
        title: `Bạn có chắc chắn?`,
        text: `Bạn muốn xóa ${selectedItems.length} bài viết?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Hủy",
      });

      if (confirmDelete.isConfirmed) {
        // Gọi API xóa danh sách bài viết
        const response = await postApi(`/api/v1/blogs-admin/post/delete-post`, {
          id: selectedItems,
        });

        if (response?.deletedCount === selectedItems.length) {
          warning(`Xóa thành công ${selectedItems.length} bài viết!`, "success");
          fetchDataPosts(); // Cập nhật lại danh sách bài viết
          setSelectedItems([]); // Xóa danh sách bài viết đã chọn
        } else {
          warning("Xóa thất bại. Vui lòng thử lại.", "error");
        }
      }
    } catch (error) {
      console.error("Error deleting posts:", error);
      warning("Có lỗi xảy ra khi xóa bài viết.", "error");
    }
  };

  return (
    <div className="p-4 w-full max-w-9xl mx-auto">
      {contextHolder}
      {/* Dashboard actions */}
      <div className="sm:flex sm:justify-between sm:items-center mb-4">
        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
            Bài viết
          </h1>
        </div>

        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          <NavLink
            end
            to="add"
            className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white no-underline"
          >
            <svg
              className="fill-current shrink-0 xs:hidden"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="max-xs:sr-only">Thêm bài viết</span>
          </NavLink>
          <button
            className="btn bg-red-900 text-red-100 hover:bg-red-800 dark:bg-red-100 dark:text-red-800 dark:hover:bg-white"
            onClick={handleDelPost}
          >
            <svg
              className="fill-current shrink-0 xs:hidden"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="max-xs:sr-only">Xoá bài viết</span>
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
        <div className="p-3">
          {/* Table */}
          <div className="overflow-x-auto overflow-y-auto max-h-[665px]">
            <table className="table-auto w-full">
              {/* Table header */}
              <thead className="sticky top-0 text-sm font-semibold uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="p-1 whitespace-nowrap w-[3%]">
                    <div className="font-semibold text-center">
                      <Checkbox
                        checked={isSelectAll}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                      ></Checkbox>
                    </div>
                  </th>
                  <th className="p-1 whitespace-nowrap">
                    <div className="font-semibold text-left">Bài viết</div>
                  </th>
                  <th className="p-1 whitespace-nowrap w-[150px]">
                    <div className="font-semibold text-left">Danh mục</div>
                  </th>
                  <th className="p-1 whitespace-nowrap w-[262px]">
                    <div className="font-semibold text-left">Tags</div>
                  </th>
                  <th className="p-1 whitespace-nowrap w-[4%]">
                    <div className="font-semibold text-center">Hiển thị</div>
                  </th>
                  <th className="p-1 whitespace-nowrap w-[9%]">
                    <div className="font-semibold text-center">Ngày tạo</div>
                  </th>
                  <th className="p-1 whitespace-nowrap w-[9%]">
                    <div className="font-semibold text-center">
                      Ngày chỉnh sửa
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
                {!loading && dataPosts ? (
                  dataPosts.map((post, index) => {
                    const isChecked = selectedItems.includes(post.id);

                    return (
                      <tr key={index}>
                        <td className="p-1 whitespace-nowrap text-center">
                          <Checkbox
                            checked={isChecked}
                            onChange={(e) =>
                              handleCheckboxChange(post.id, e.target.checked)
                            }
                          ></Checkbox>
                        </td>
                        <td className="p-1">
                          <div
                            className="font-medium text-gray-800 dark:text-gray-100 text-lg hover:underline cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/admin-blogs/bai-viet/edit/${post.id}`);
                            }}
                          >
                            {post.title}
                          </div>
                          <div className="line-clamp-1 text-left">
                            {post.description}
                          </div>
                        </td>
                        <td className="p-1 w-[150px]">{post.category.name}</td>
                        <td className="p-1 whitespace-nowrap">
                          <div className="flex w-[262px] overflow-hidden flex-wrap">
                            {post.tags?.map((tag, tagIndex) => (
                              <div
                                className="items-center w-fit text-xs font-medium text-white bg-violet-400 px-1 py-[2px] rounded m-[1.5px] truncate"
                                key={tagIndex}
                              >
                                {tag.name}
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="p-1 whitespace-nowrap">
                          <div className="text-center">
                            {post.published === 1 ? (
                              <IoMdCheckmarkCircleOutline className="w-6 h-6 text-green-400" />
                            ) : post.published === 0 &&
                              (post.scheduledAt === null ||
                                moment(post.scheduledAt).isBefore(moment())) ? (
                              <IoMdCloseCircleOutline className="w-6 h-6 text-red-400" />
                            ) : (
                              <Tooltip
                                placement="bottom"
                                title={
                                  <div>
                                    {moment(post.scheduledAt).format(
                                      "DD/MM/YYYY HH:mm"
                                    )}
                                  </div>
                                }
                              >
                                <BsClockHistory className="w-6 h-6 text-yellow-400" />
                              </Tooltip>
                            )}
                          </div>
                        </td>
                        <td className="p-1 whitespace-nowrap">
                          <div className="text-center">
                            {moment(post.created_at).format("DD/MM/YYYY HH:mm")}
                          </div>
                        </td>
                        <td className="p-1 whitespace-nowrap">
                          <div className="text-center">
                            {moment(post.updated_at).format("DD/MM/YYYY HH:mm")}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5}>
                      <div className="my-14">
                        <Loading />
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
