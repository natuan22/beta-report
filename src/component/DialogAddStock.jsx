import React, { Fragment, forwardRef, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { message } from "antd";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});


export default function DialogAddStock() {
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



    return (
        <Fragment>
            {contextHolder}
            <Button variant="contained" onClick={handleClickOpen}>
                Thêm cổ phiếu khuyến nghị
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
                    </div>
                </DialogContent>
            </Dialog>
        </Fragment>
    );
}
