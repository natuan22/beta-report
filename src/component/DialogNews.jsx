import React, { Fragment, forwardRef, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { https } from "../services/configService";
import { message } from "antd";
import FormGroup from "@mui/material/FormGroup";
import { FaFileCirclePlus, FaCheck, FaX } from "react-icons/fa6";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import "./styles/btnStyle.css";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function DialogNews({
    type,
    query,
    handleCatchDataNews,
    idQuery,
}) {
    const [messageApi, contextHolder] = message.useMessage();
    const [open, setOpen] = useState(false);
    const [dataNews, setDataNews] = useState();
    const [newsSelected, setNewsSelected] = useState([]);
    const [editingIndex, setEditingIndex] = useState(-1);
    const [editValue, setEditValue] = useState("");
    const [formData, setFormData] = useState({
        id: idQuery,
        value: [],
    });
    const saveNews = async (data) => {
        try {
            const response = await https.post('/api/v1/report/luu-tin', data)
            console.log(response)
        } catch (err) {
            console.log(err)
        }
    }
    const getNews = async (id) => {
        try {
            const response = await https.get('/api/v1/report/tin-tuc-redis?', {
                params: {
                    id
                }
            })

            setFormData({
                ...formData,
                value: response.data.data
            })
        } catch (err) {
            console.log(err)
        }
    }
    const handleToggleEdit = (index) => {
        setEditingIndex(index);
        setEditValue(formData.value[index].title);
    };
    const handleCancelEdit = () => {
        setEditingIndex(-1);
    };

    const handleEditConfirm = (index) => {
        // Xử lý khi người dùng xác nhận chỉnh sửa
        const updatedNewsSelected = [...newsSelected];
        updatedNewsSelected[index] = editValue;
        setNewsSelected(updatedNewsSelected);
        success(`Chỉnh sửa thành công tin số ${index + 1}`);
        // Kết thúc chế độ chỉnh sửa
        setEditingIndex(-1);
        setEditValue("");
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const warning = (text) => {
        messageApi.open({
            type: "warning",
            content: text,
        });
    };
    const success = (text) => {
        messageApi.open({
            type: "success",
            content: text,
        });
    };
    useEffect(() => {
        const fetchDataNews = async () => {
            try {
                const response = await https.get(`api/v1/report/tin-${query}`, {
                    params: {
                        quantity: 100,
                    },
                });
                setDataNews(response.data.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchDataNews();
        getNews(idQuery)

    }, []);

    const handleSelectNews = (title) => {
        if (!newsSelected.includes(title)) {
            setNewsSelected((prevNewsSelected) => [...prevNewsSelected, title]);
            success("Thêm tin thành công");

        } else {
            warning("Tiêu đề đã được chọn trước đó.");
        }
    };
    useEffect(() => {
        setFormData({
            ...formData,
            value: newsSelected.map(item => ({ title: item, href: '' }))
        })


    }, [newsSelected])

    useEffect(() => {
        if (formData.value?.length > 0) {
            handleCatchDataNews(formData.value?.map(item => item.title), query);
        } else {
            handleCatchDataNews([], query)
            warning(`Bạn đã xóa hết tin  ${type}`)
        }
    }, [formData])


    const handleAddNews = async () => {
        if (editingIndex !== -1) {
            return warning("Vui lòng hoàn tất chỉnh sửa");
        } else {
            await saveNews(formData)
            await getNews(idQuery)

            handleCatchDataNews(formData.value?.map(item => item.title), query);
            setOpen(false);
            success(`Thêm bản tin ${type} thành công`);
        }
    };

    const handleDeleteNews = (index) => {
        // Sử dụng SweetAlert để xác nhận việc xóa
        Swal.fire({
            title: "Bạn chắc chắn muốn xóa tin này?",
            text: "Thao tác này không thể hoàn tác!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Xác nhận",
            cancelButtonText: "Hủy",
        }).then((result) => {
            if (result.isConfirmed) {
                // Xác nhận xóa tin và cập nhật state
                const updatedformData = { ...formData };
                updatedformData.value.splice(index, 1);
                console.log(updatedformData)
                setFormData(updatedformData);
                success("Đã xóa tin thành công!");
            }
        });
    };

    return (
        <Fragment>
            {contextHolder}
            <Button variant="contained" onClick={handleClickOpen}>
                Chọn tin {type}
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                sx={{
                    "& .MuiPaper-root": {
                        maxWidth: "1300px",
                        maxHeight: "95%",
                    },
                }}
            >
                <div className="border-b-1 border-x-0 border-t-0 border-solid border-collapse border-blue-500 shadow-md">
                    <h2 className="text-center font-semibold">Danh sách tin tức </h2>
                </div>
                <DialogContent className="flex flex-col items-center relative">
                    <div className="w-[1000px] h-[400px] overflow-y-scroll  shadow-md p-2 rounded-lg bg-worldBackground bg-no-repeat bg-cover">
                        <FormGroup>
                            {dataNews?.map((item, index) => {
                                return (
                                    <div className="mb-2 flex items-center hover:bg-slate-300 duration-500 p-1 rounded-lg ">
                                        <div className="w-[80%]">
                                            <span className="font-semibold"> {index + 1}</span>.{" "}
                                            {item.title}
                                        </div>
                                        <div>
                                            <Button
                                                onClick={() => {
                                                    handleSelectNews(item.title);
                                                }}
                                            >
                                                <FaFileCirclePlus className="text-[30px]" />
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })}
                        </FormGroup>
                    </div>
                    <div className=" relative itemChosen w-[1000px] h-[430px] overflow-y-scroll shadow-xl mt-5 rounded-lg bg-cityBackground bg-no-repeat bg-[length:1000px_360px] bg-bottom ">
                        <h2 className=" sticky top-0 bg-white z-10 text-center font-semibold border-b-1 border-x-0 border-t-0 border-solid border-collapse border-blue-500 m-0">
                            Tin đã chọn
                        </h2>

                        <div className=" p-2  h-[400px] mt-1 rounded-xl ">
                            {formData.value?.map((item, index) => (
                                <div
                                    className="flex items-center justify-between hover:bg-slate-300 duration-500 rounded-xl p-1"
                                    key={index}
                                >
                                    {index === editingIndex ? (
                                        <div className="flex w-full">
                                            <div className=" w-[80%] flex  items-center py-3 ">
                                                <input
                                                    type="text"
                                                    value={editValue}
                                                    onChange={(e) => setEditValue(e.target.value)}
                                                    className=" w-[75%] h-[25px]   focus:outline-0 "
                                                />
                                            </div>

                                            <div className="w-[20%] flex items-center z-0">
                                                <div className="mr-2">
                                                    <Button
                                                        variant="outlined"
                                                        onClick={() => handleEditConfirm(index)}
                                                    >
                                                        <FaCheck />
                                                    </Button>
                                                </div>
                                                <div>
                                                    <Button
                                                        variant="outlined"
                                                        onClick={() => handleCancelEdit()}
                                                    >
                                                        <FaX />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex  items-center justify-between w-full">
                                            <p className=" w-[80%]">
                                                <span className="font-semibold">{index + 1}. </span>
                                                {item.title}
                                            </p>
                                            <div className="w-[20%] flex items-center z-0">
                                                <div className="mr-2">
                                                    <Button
                                                        variant="outlined"
                                                        onClick={() => handleToggleEdit(index)}
                                                    >
                                                        <AiFillEdit />
                                                    </Button>
                                                </div>
                                                <div>
                                                    <Button
                                                        variant="outlined"
                                                        onClick={() => handleDeleteNews(index)}
                                                    >
                                                        <AiOutlineDelete />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={() => {
                                handleAddNews();
                            }}
                            className="button mt-5"
                        >
                            Thêm tin
                        </button>
                    </div>
                    <div className="absolute right-[11%] bottom-[30px] z-10">
                        <Button variant="contained" color="warning">
                            Xóa tất cả
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </Fragment>
    );
}
