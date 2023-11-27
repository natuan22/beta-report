function layNgayThangNamHomNay() {
    const ngayHienTai = new Date();
    const ngay = ngayHienTai.getDate();
    const thang = ngayHienTai.getMonth() + 1; // Lưu ý: Tháng bắt đầu từ 0
    const nam = ngayHienTai.getFullYear();

    // Format ngày, tháng, năm nếu cần
    const ngayThangNam = `${ngay}/${thang}/${nam}`;

    return ngayThangNam;
}

// Sử dụng hàm
export const homNay = layNgayThangNamHomNay();