import React, { Fragment, forwardRef, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { https } from "../services/configService";
import { message } from 'antd';
import FormGroup from '@mui/material/FormGroup';
import { FaFileCirclePlus } from "react-icons/fa6";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});




export default function DialogNews({ type, query }) {
    const [messageApi, contextHolder] = message.useMessage();
    const [open, setOpen] = useState(false);
    const [dataNews, setDataNews] = useState();
    const [newsSelected, setNewsSelected] = useState([])
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const warning = (text) => {
        messageApi.open({
            type: 'warning',
            content: text,
        });
    };
    useEffect(() => {
        const fetchDataNews = async () => {
            try {
                const response = await https.get(`api/v1/report/tin-${query}`, {
                    params: {
                        quantity: 30
                    }
                });
                setDataNews(response.data.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchDataNews();
    }, []);

    const handleSelectNews = (title) => {
        if (newsSelected.length < 7) {
            if (!newsSelected.includes(title)) {
                setNewsSelected(prevNewsSelected => [...prevNewsSelected, title]);
            } else {
                warning("Tiêu đề đã được chọn trước đó.");
            }
        } else {
            warning("Bạn chỉ có thể chọn tối đa 7 tin.");
        }
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
                    },
                }}

            >
                <div className="border-b-1 border-x-0 border-t-0 border-solid border-collapse border-blue-500 shadow-md">
                    <h2 className="text-center font-semibold">Chọn tối đa 07 tin </h2>
                </div>
                <DialogContent
                    className="flex flex-col items-center"
                >
                    <div className="w-[1000px] h-[400px] overflow-y-scroll  shadow-md p-2 rounded-lg bg-worldBackground bg-no-repeat bg-cover">
                        <FormGroup>
                            {dataNews?.map((item, index) => {
                                return (
                                    <div className="mb-2 flex items-center hover:bg-slate-300 duration-500 p-1 rounded-lg ">
                                        <div className="w-[80%]">
                                            <span className="font-semibold"> {index + 1}</span>.   {item.title}
                                        </div>
                                        <div>
                                            <Button onClick={
                                                () => {
                                                    handleSelectNews(item.title)
                                                }
                                            }>
                                                <FaFileCirclePlus className="text-[30px]" />
                                            </Button>
                                        </div>
                                    </div>
                                )
                            })}
                        </FormGroup>
                    </div>
                    <div className="itemChosen w-[1000px] h-[400px] shadow-xl mt-5 rounded-lg bg-cityBackground bg-no-repeat bg-[length:1000px_360px] bg-bottom ">
                        <h2 className="text-center font-semibold border-b-1 border-x-0 border-t-0 border-solid border-collapse border-blue-500 m-0">Tin đã chọn</h2>
                        <div className=" px-2">
                            {newsSelected.map((item, index) => (<p className="mb-2"><span >{index + 1}. </span>{item}</p>))}
                        </div>
                    </div>

                </DialogContent>
            </Dialog>
        </Fragment>
    );
}
