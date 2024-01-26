import React, { Fragment, forwardRef, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { message } from "antd";
import FormGroup from "@mui/material/FormGroup";
import { FaFileCirclePlus, FaCheck, FaX } from "react-icons/fa6";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import "../../../../component/styles/btnStyle.css";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { https } from "../../../../services/configService";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function DialogAddNews({
    type,
    query,
    handleCatchDataNews,
    idQuery,
}) {
    const [messageApi, contextHolder] = message.useMessage();
    const [open, setOpen] = useState(false);
    const [dataNews, setDataNews] = useState();
    const [arrSelectedNews, setArrSelectedNews] = useState([])
    const [formData, setFormData] = useState({
        id: idQuery,
        value: [],
    });

    const [editingIndex, setEditingIndex] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editSubTitle, setEditSubTitle] = useState("");

    const handleToggleEdit = (index, title, subTitle) => {
        setEditingIndex(index);
        setEditTitle(title);
        setEditSubTitle(subTitle);
    };

    const handleEditConfirm = (index) => {
        const updatedArr = [...formData.value];
        updatedArr[index].title = editTitle;
        updatedArr[index].sub_title = editSubTitle;

        setArrSelectedNews(updatedArr);
        setEditingIndex(null);
        setEditTitle("");
        setEditSubTitle("");
    };

    const handleCancelEdit = () => {
        setEditingIndex(null);
        setEditTitle("");
        setEditSubTitle("");
    };


    const getNews = async (id) => {
        try {
            const res = await https.get('/api/v1/report/tin-tuc-redis', {
                params: {
                    id
                }
            })
            setArrSelectedNews(res.data.data.map(item => ({ title: item.title, sub_title: item.sub_title, href: '' })))
            setFormData({
                ...formData,
                value: res.data.data
            })
        } catch (err) {
            console.log(err)
        }
    }
    const saveNews = async (data) => {
        try {
            const response = await https.post('/api/v1/report/luu-tin', data)
            console.log(response)
        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        const fetchDataNews = async () => {
            try {
                const response = await https.get(`api/v1/report/tin-${query}?type=1 `, {
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

    }, []);


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

    const handleAddNews = (news) => {
        // Kiểm tra xem tin tức đã tồn tại trong mảng chưa
        const isNewsExist = arrSelectedNews.some(item => item.title === news.title);

        if (!isNewsExist) {
            // Nếu tin tức chưa tồn tại, thêm tin tức vào mảng
            setArrSelectedNews(prevArr => [...prevArr, news]);
            success("Đã thêm tin tức thành công");
        } else {
            warning("Tin tức đã được chọn trước đó");
        }
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
    useEffect(() => {
        setFormData({
            ...formData,
            value: arrSelectedNews.map(item => ({ title: item.title, sub_title: item.sub_title, href: '' }))
        })

    }, [arrSelectedNews])

    useEffect(() => {
        if (formData.value?.length > 0) {
            handleCatchDataNews(formData.value?.map(item => ({ title: item.title, sub_title: item.sub_title, href: '' })), query);
        } else {
            handleCatchDataNews([], query)
        }
    }, [formData])

    const handleDeleteNews = (index) => {
        const confirmDelete = window.confirm("Bạn có chắc muốn xóa tin tức này không?");

        if (confirmDelete) {
            setArrSelectedNews((prevArr) => {
                const newArr = [...prevArr];
                newArr.splice(index, 1);
                return newArr;
            });
        }
    };

    const handleAddNewsBtn = async () => {
        if (editingIndex !== null) {
            return warning("Vui lòng hoàn tất chỉnh sửa");
        } else {
            await saveNews(formData)
            await getNews(idQuery)

            handleCatchDataNews(formData.value?.map(item => {
                return ({ title: item.title, sub_title: item.sub_title, href: '' })
            }), query);
            setOpen(false);
            success(`Thêm bản tin ${type} thành công`);
        }
    }
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
                                    <div className="mb-2 flex items-center justify-evenly hover:bg-slate-300 duration-500 p-1 rounded-lg ">
                                        <div className="w-[80%]">
                                            <span className="font-semibold"> {index + 1}</span>.{" "}
                                            <span className="font-bold">
                                                {item.title}
                                            </span>
                                            <div>
                                                <p className="my-1 indent-5">
                                                    {item.sub_title}
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <Button
                                                onClick={() => {
                                                    handleAddNews(item)
                                                }}
                                            >
                                                <FaFileCirclePlus className="text-[30px]" />
                                            </Button>
                                        </div>
                                    </div>
                                )
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
                                    className="flex items-center  mb-2  justify-between h-[120px] hover:bg-slate-300  duration-500 rounded-xl p-1"
                                    key={index}
                                >
                                    {index === editingIndex ? (
                                        <div className="flex  w-full h-full ">
                                            <div className="w-[100%] h-full  flex flex-col items-start justify-evenly  ">
                                                <div className="w-[80%] flex  ">
                                                    <span className="font-bold ">
                                                        {editingIndex + 1}.{' '}
                                                    </span>
                                                    <input
                                                        type="text"
                                                        value={editTitle}
                                                        onChange={(e) => setEditTitle(e.target.value)}
                                                        placeholder="Tiêu đề"
                                                        className="w-full m-0 h-[25px] focus:outline-0"
                                                    />
                                                </div>
                                                <div className="w-[80%] translate-x-[13px]   ">
                                                    <textarea
                                                        type="text"
                                                        value={editSubTitle}
                                                        onChange={(e) => setEditSubTitle(e.target.value)}
                                                        placeholder="Mô tả"
                                                        className="w-full h-[55px] focus:outline-0"
                                                    />
                                                </div>
                                            </div>

                                            <div className="w-[20%] flex items-center z-0">
                                                <div className="mr-2">
                                                    <Button
                                                        color="success"
                                                        variant="outlined"
                                                        onClick={() => handleEditConfirm(index)}
                                                    >
                                                        <FaCheck />
                                                    </Button>
                                                </div>
                                                <div>
                                                    <Button
                                                        color="error"
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
                                            <div className="w-[80%] flex">
                                                <p className="font-semibold">{index + 1}. </p>
                                                <div>
                                                    <p className=" font-bold">{item.title}</p>
                                                    <p className="text-justify">{item.sub_title}</p>
                                                </div>
                                            </div>
                                            <div className="w-[15%] flex items-center z-0 ">
                                                <div className="mr-2">
                                                    <Button
                                                        variant="outlined"
                                                        onClick={() => handleToggleEdit(index, item.title, item.sub_title)}
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
                                handleAddNewsBtn()
                            }}
                            className="button mt-5">
                            Thêm tin
                        </button>
                    </div>
                    <div className="absolute right-[11%] bottom-[30px] z-10">
                        <Button variant="contained" color="warning" >
                            Xóa tất cả
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </Fragment>
    );
}
