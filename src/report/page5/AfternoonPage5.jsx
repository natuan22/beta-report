import React from "react";
import banner from "../../app/asset/img/banner.png";
import HeaderAfternoon from "../utils/component/HeaderAfternoon";
import FooterAfternoon from "../utils/component/FooterAfternoon";

const AfternoonPage5 = () => {
  return (
    <div className="h-[1480px] w-[800px]  ">
      <div className="header">
        <HeaderAfternoon />
      </div>
      <div className="banner flex flex-col items-center mt-[10px]">
        <img src={banner} alt="banner" width={760} height={350} />
      </div>
      <div className="content flex flex-col items-center mt-2">
        <div className=" h-[620px] w-[750px]">
          <div className="intro">
            <p className="text-[#0155B7] font-bold text-[18px] m-0">
              GIỚI THIỆU
            </p>
            <p className="font-bold m-0">Công ty Cổ phần Chứng khoán BETA </p>
            <p className="font-bold m-0">
              Tầng 4-5, 55 Nam Kỳ Khởi Nghĩa - P. Nguyễn Thái Bình - Quận 1 - Hồ
              Chí Minh
            </p>
            <div className="w-[300px]">
              <div className="flex justify-between  font-semibold py-1">
                <p className=" m-0">Tel</p>
                <p className="w-[190px]  m-0">: (84)28 3914 2929</p>
              </div>
              <div className="flex justify-between font-semibold py-1">
                <p className=" m-0">Fax</p>
                <p className="w-[190px]  m-0">: (84)28 3914 2626</p>
              </div>
              <div className="flex justify-between font-semibold py-1">
                <p className=" m-0">Email</p>
                <p className="w-[190px]  m-0">: support@bsi.com.vn</p>
              </div>
              <div className="flex justify-between font-semibold py-1">
                <p className=" m-0">Website</p>
                <p className="w-[190px]  m-0">: www.bsi.com.vn</p>
              </div>
            </div>
          </div>
          <div className="body mt-2">
            <p className="m-0 text-[#0155B7] font-bold text-[18px]">
              TUYÊN BỐ MIỄN TRÁCH NHIỆM
            </p>
            <div>
              <p className="m-0 text-[15px] mt-1 leading-5 text-justify indent-[30px] ">
                Báo cáo này được viết và phát hành bởi <strong>BETA</strong>.
                Thông tin, tuyên bố, dự đoán trong báo cáo này bao gồm cả các
                nhận định cá nhân là dựa trên các nguồn thông tin tin cậy. Tuy
                nhiên, <strong>BETA</strong> không đảm bảo về sự hoàn chỉnh cũng
                như độ chính xác của các nguồn thông tin này. Các ý kiến dự báo
                chỉ thể hiện quan điểm của người viết tại thời điểm phát hành và
                có thể thay đổi mà không cần thông báo với người đọc.{" "}
                <strong>BETA</strong> không có nghĩa vụ phải cập nhật, sửa đổi
                báo cáo này dưới mọi hình thức cũng như thông báo với người đọc
                trong trường hợp các quan điểm dự báo trong báo cáo này thay đổi
                hoặc trở nên không chính xác.
              </p>
              <p className="m-0 text-[15px] mt-1 leading-5 text-justify indent-[30px] ">
                Các thông tin cũng như ý kiến trong báo cáo không mang tính chất
                mời chào mua bán bất kỳ loại chứng khoán, quyền chọn, hợp đồng
                tương lai hay bất cứ công cụ phái sinh nào. Bản tin này được
                viết với mục tiêu cung cấp những thông tin khái quát. Báo cáo
                này không nhắm tới những mục tiêu đầu tư cụ thể, tình trạng tài
                chính cụ thể hay nhu cầu cụ thể của bất kỳ người nào nhận được
                hoặc đọc báo cáo này. Nhà đầu tư cần phải lưu ý rằng thị trường
                luôn biến động và những diễn biến trong quá khứ, nếu có, rất có
                thể không hàm ý cho những kết quả tương lai.
              </p>
              <p className="m-0 text-[15px] mt-1 leading-5 text-justify indent-[30px] ">
                Các công cụ tài chính được sử dụng hoặc đề cập trong báo cáo này
                có thể sẽ không phù hợp với tất cả các nhà đầu tư. Nhà đầu tư
                phải có quyết định riêng của mình bằng cách tham khảo các nhà tư
                vấn tài chính độc lập nếu thấy cần thiết và căn cứ vào tình hình
                tài chính cũng như mục tiêu đầu tư cụ thể của chính nhà đầu tư.
                <strong> BETA</strong> sẽ không chịu trách nhiệm đối với tất cả
                hay bất kỳ thiệt hại nào hay sự kiện bị coi là thiệt hại đối với
                việc sử dụng toàn bộ hay bất kỳ thông tin hoặc ý kiến nào của
                báo cáo này. Không ai được sao chép, tái bản hoặc phát hành cũng
                như tái phân phối báo cáo vì bất kỳ mục đích nào nếu không được
                sự đồng ý bằng văn bản của <strong>BETA</strong>. Xin vui lòng
                ghi rõ nguồn khi trích dẫn các thông tin trong báo cáo này.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[3px]">
        <FooterAfternoon pageNum={6} />
      </div>
    </div>
  );
};

export default AfternoonPage5;
