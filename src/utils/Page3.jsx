import React from 'react'
import Footer from "../component/Footer";
import Header from "../component/Header";
const Page3 = () => {
    return (
        <div className="h-[842px] w-[595px] ">
            <div className="header">
                <Header date={"21/11/2023"} type={1} />
            </div>
            <div className="content">

            </div>
            <div className="mt-10">
                <Footer pageNum={3} />
            </div>
        </div>
    )
}

export default Page3