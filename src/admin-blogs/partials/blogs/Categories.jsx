import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import {
  IoMdCheckmarkCircleOutline,
  IoMdCloseCircleOutline,
} from "react-icons/io";
import { getApi } from "../../../helper/getApi";
import Loading from "../../../loading/Loading";
import ModalAdd from "../../components/Category/ModalAdd";
import ModalEdit from "../../components/Category/ModalEdit";

const Categories = () => {
  const [dataCategories, setDataCategories] = useState();
  const [loading, setLoading] = useState(true);
  const [expandedRows, setExpandedRows] = useState([]);

  const toggleExpandRow = (id) => {
    setExpandedRows((prevExpandedRows) =>
      prevExpandedRows.includes(id)
        ? prevExpandedRows.filter((rowId) => rowId !== id)
        : [...prevExpandedRows, id]
    );
  };

  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);

  const showModalEit = (category) => {
    setIsModalEditOpen(true);
    setDataEdit(category);
  };

  const fetchDataCategories = async () => {
    try {
      const data = await getApi(`/api/v1/blogs-admin/category`);
      setDataCategories(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDataCategories();
  }, []);

  const renderCategoryRow = (category, index, depth = 0) => {
    const isExpanded = expandedRows.includes(category.id);

    return (
      <Fragment key={index}>
        <tr>
          <td className="p-1 whitespace-nowrap">
            {category.children && category.children.length > 0 && (
              <div
                className="flex shrink-0 ml-[3px] cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpandRow(category.id);
                }}
              >
                <svg
                  className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${
                    isExpanded ? "" : "-rotate-90"
                  }`}
                  viewBox="0 0 12 12"
                >
                  <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                </svg>
              </div>
            )}
          </td>
          <td className="p-1">
            <div>
              <div style={{ paddingLeft: `${depth * 40}px` }}>
                <div
                  className="font-medium text-gray-800 dark:text-gray-100 text-lg hover:underline cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    showModalEit(category);
                  }}
                >
                  {category.name}
                </div>
                <div className="text-left line-clamp-1">
                  {category.description}
                </div>
              </div>
            </div>
          </td>
          <td className="p-1 whitespace-nowrap">
            <div className="text-center">
              {category.published === 1 ? (
                <IoMdCheckmarkCircleOutline className="w-6 h-6 text-green-400" />
              ) : (
                <IoMdCloseCircleOutline className="w-6 h-6 text-red-400" />
              )}
            </div>
          </td>
          <td className="p-1 whitespace-nowrap">
            <div className="text-center">
              {moment(category.created_at).format("DD/MM/YYYY HH:mm")}
            </div>
          </td>
          <td className="p-1 whitespace-nowrap">
            <div className="text-center">
              {moment(category.updated_at).format("DD/MM/YYYY HH:mm")}
            </div>
          </td>
        </tr>
        {/* Hiển thị children nếu hàng được mở rộng */}
        {isExpanded &&
          category.children &&
          category.children.map((childCategory, childIndex) =>
            renderCategoryRow(childCategory, childIndex, depth + 1)
          )}
      </Fragment>
    );
  };

  return (
    <div className="p-4 w-full max-w-9xl mx-auto">
      {/* Categories actions */}
      <div className="sm:flex sm:justify-between sm:items-center mb-4">
        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
            Danh mục
          </h1>
        </div>

        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          {/* Add New Category */}
          <ModalAdd
            dataCategories={dataCategories}
            fetchDataCategories={fetchDataCategories}
          />
        </div>
      </div>

      {/* Edit Category */}
      <ModalEdit
        dataEdit={dataEdit}
        isModalEditOpen={isModalEditOpen}
        setIsModalEditOpen={setIsModalEditOpen}
        dataCategories={dataCategories}
        fetchDataCategories={fetchDataCategories}
      />

      {/* Content */}
      <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
        <div className="p-3">
          {/* Table */}
          <div className="overflow-x-auto overflow-y-auto max-h-[680px]">
            <table className="table-auto w-full">
              {/* Table header */}
              <thead className="sticky top-0 text-sm font-semibold uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="p-1 whitespace-nowrap w-[3%]">
                    <div className="font-semibold text-center">#</div>
                  </th>
                  <th className="p-1 whitespace-nowrap">
                    <div className="font-semibold text-left">Danh mục</div>
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
              {/* Table body */}
              <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
                {!loading && dataCategories ? (
                  dataCategories.map((category, index) =>
                    renderCategoryRow(category, index)
                  )
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

export default Categories;
