import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { message } from "antd";
import React, { Fragment, forwardRef, useEffect, useState } from "react";
import { postApi } from "../helper/postApi";
import { https } from "../services/configService";
import Textarea from "./utils/Textarea";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const MAX_WORDS = 170; // Số từ tối đa cho mỗi TextArea

export default function DialogIdentify({ catchText }) {
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState(false);
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [textArr, setTextArr] = useState({
    text: [],
  });
  const [wordCount1, setWordCount1] = useState(0);
  const [wordCount2, setWordCount2] = useState(0);

  const success = (text) => {
    messageApi.open({
      type: "success",
      content: text,
    });
  };
  useEffect(() => {
    const getText = async () => {
      try {
        const response = await https.get(
          "/api/v1/report/nhan-dinh-thi-truong-redis"
        );
        setText1(response.data.data?.text[0]);
        setText2(response.data.data?.text[1]);
        setWordCount1(countWords(response.data.data?.text[0]) - 1);
        setWordCount2(countWords(response.data.data?.text[1]) - 1);
        catchText(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    getText();
  }, [textArr]);
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
      setWordCount1(countWords(newText) - 1);
    }
  };

  const handleTextChange2 = (event) => {
    const newText = event.target.value;
    if (countWords(newText) <= MAX_WORDS) {
      setText2(newText);
      setWordCount2(countWords(newText) - 1);
    }
  };

  const handleAddText = async () => {
    if (text1.trim() !== "" && text2.trim() !== "") {
      const newTextArr = [text1, text2];
      await postApi("/api/v1/report/luu-nhan-dinh-thi-truong", {
        text: newTextArr,
      });
      // Cập nhật textArr sau khi gọi API thành công
      setTextArr((prev) => ({
        text: newTextArr,
      }));
      success("Thêm nhận định thành công");
      setOpen(false);
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
        <DialogContent className="relative">
          <div className="w-[1000px] h-[400px] shadow-md p-2 rounded-lg  ">
            <div className="flex flex-col h-full items-center justify-center">
              <div className="text-center mt-2 text-gray-500">
                Số từ: {wordCount1}/{MAX_WORDS}
              </div>
              <Textarea
                value={text1}
                onChange={handleTextChange1}
                sx={{
                  width: "900px",
                }}
                aria-label="minimum height"
                minRows={4}
                placeholder="Nhập vào nội dung đoạn 1"
              />
            </div>
          </div>
          <div className="w-[1000px] h-[400px] shadow-md p-2 rounded-lg  ">
            <div className="flex flex-col h-full items-center justify-center">
              <div className="text-center mt-2 text-gray-500">
                Số từ: {wordCount2}/{MAX_WORDS}
              </div>
              <Textarea
                value={text2}
                onChange={handleTextChange2}
                sx={{
                  width: "900px",
                }}
                aria-label="minimum height"
                minRows={4}
                placeholder="Nhập vào nội dung đoạn 2"
              />
            </div>
          </div>
          <div className="absolute bottom-[30px] right-[50%] translate-x-[50%]">
            <Button
              onClick={handleAddText}
              variant="contained"
              size="medium"
              color="info"
            >
              Thêm nhận định
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
