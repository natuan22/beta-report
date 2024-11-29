import moment from "moment";
import React, { useEffect, useState } from "react";
import { IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import { getApi } from "../../../helper/getApi";
import Loading from "../../../loading/Loading";

const Posts = () => {
  const [dataPosts, setDataPosts] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchDataPosts = async () => {
    try {
      const data = await getApi(`/api/v1/blogs/post`);
      setDataPosts(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDataPosts();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      {/* Dashboard actions */}
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
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
                  <th className="p-2 whitespace-nowrap w-[3%]">
                    <div className="font-semibold text-center">#</div>
                  </th>
                  <th className="p-2 whitespace-nowrap ">
                    <div className="font-semibold text-left">Bài viết</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Danh mục</div>
                  </th>
                  <th className="p-2 whitespace-nowrap w-[12%]">
                    <div className="font-semibold text-left">Tags</div>
                  </th>
                  <th className="p-2 whitespace-nowrap w-[4%]">
                    <div className="font-semibold text-center">Hiển thị</div>
                  </th>
                  <th className="p-2 whitespace-nowrap w-[9%]">
                    <div className="font-semibold text-center">Ngày tạo</div>
                  </th>
                  <th className="p-2 whitespace-nowrap w-[9%]">
                    <div className="font-semibold text-center">Ngày chỉnh sửa</div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
                {!loading && dataPosts ? (
                  dataPosts.map((post, index) => {
                    return (
                      <tr key={index}>
                        <td className="p-2 whitespace-nowrap"></td>
                        <td className="p-2">
                          <div 
                            className="font-medium text-gray-800 dark:text-gray-100 text-lg hover:underline cursor-pointer" 
                            onClick={(e) => { 
                              e.stopPropagation(); 
                              navigate(`/admin-blogs/bai-viet/edit/${post.id}`);
                            }}
                          >
                            {post.title}
                          </div>
                          <div className="line-clamp-1 text-left">{post.description}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          {post.category.name}
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="grid grid-cols-2">
                            {post.tags?.map((tag, tagIndex) => (
                              <span className="inline-flex items-center justify-center h-5 text-xs font-medium text-white bg-violet-400 px-2 rounded m-[1px]" key={tagIndex}>
                                {tag.name}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-center">
                            {post.published === 1 ? <IoMdCheckmarkCircleOutline className="w-6 h-6 text-green-400"/>: <IoMdCloseCircleOutline className="w-6 h-6 text-red-400"/>}
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-center">
                            {moment(post.created_at).format("DD/MM/YYYY HH:mm")}
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
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
