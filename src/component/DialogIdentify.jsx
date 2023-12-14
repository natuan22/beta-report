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

export default function DialogIdentify() {
    const [messageApi, contextHolder] = message.useMessage();
    const [open, setOpen] = useState(false);





    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Fragment>
            {contextHolder}
            <Button variant="contained" onClick={handleClickOpen} >
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
                    <div className="w-[1000px] h-[400px] overflow-y-scroll  shadow-md p-2 rounded-lg bg-worldBackground bg-no-repeat bg-cover"></div>
                </DialogContent>
            </Dialog>
        </Fragment>
    );
}
