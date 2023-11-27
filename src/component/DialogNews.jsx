import React, { Fragment, forwardRef, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { https } from "../services/configService";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function DialogNews({ type, query }) {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const fetchDataNews = async () => {
            try {
                const response = await https.get(`api/v1/report/tin-${query}`);
                setData(response.data.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchDataNews();
    }, []);


    return (
        <Fragment>
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
                        maxWidth: "1000px",
                    },
                }}

            >
                <h2 className="text-center font-semibold">Chọn tối đa 05 tin </h2>
                <DialogContent
                >
                    <div className="w-[800px] h-[500px]">

                    </div>
                </DialogContent>
            </Dialog>
        </Fragment>
    );
}
