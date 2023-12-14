import React, { Fragment, forwardRef, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { message } from "antd";
import Textarea from "./utils/Textarea";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const MAX_WORDS = 150; // Số từ tối đa cho mỗi TextArea

export default function DialogIdentify() {
    const [messageApi, contextHolder] = message.useMessage();
    const [open, setOpen] = useState(false);
    const [text1, setText1] = useState("");
    const [text2, setText2] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const countWords = (text) => {
        const words = text.split(/\s+/);
        return words.length;
    };

    const handleTextChange1 = (event) => {
        const newText = event.target.value;
        if (countWords(newText) <= MAX_WORDS) {
            setText1(newText);
        }
    };

    const handleTextChange2 = (event) => {
        const newText = event.target.value;
        if (countWords(newText) <= MAX_WORDS) {
            setText2(newText);
        }
    };

    return (
        <Fragment>
            {contextHolder}
            <Button variant="contained" onClick={handleClickOpen}>
                Thêm nhận định
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
                <DialogContent className="">
                    <div className="w-[1000px] h-[400px] shadow-md p-2 rounded-lg ">
                        <div className="flex flex-col h-full items-center justify-center">
                            <Textarea
                                value={text1}
                                onChange={handleTextChange1}
                                sx={{
                                    width: '900px',
                                }}
                                aria-label="minimum height"
                                minRows={4}
                                placeholder="Nhập vào nội dung đoạn 1"
                            />
                        </div>
                    </div>
                    <div className="w-[1000px] h-[400px] shadow-md p-2 rounded-lg ">
                        <div className="flex flex-col h-full items-center justify-center">
                            <Textarea
                                value={text2}
                                onChange={handleTextChange2}
                                sx={{
                                    width: '900px',
                                }}
                                aria-label="minimum height"
                                minRows={4}
                                placeholder="Nhập vào nội dung đoạn 2"
                            />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </Fragment>
    );
}
