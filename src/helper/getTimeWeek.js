export default function getTimeWeek() {
    const ngayHienTai = new Date();
    const soNgayDenNgayBatDauTuan = ngayHienTai.getDay() - 1; // Trừ 1 vì ngày bắt đầu tuần là thứ 2
    const ngayBatDauTuan = new Date(ngayHienTai);
    ngayBatDauTuan.setDate(ngayHienTai.getDate() - soNgayDenNgayBatDauTuan);

    const ngayKetThucTuan = new Date(ngayBatDauTuan);
    ngayKetThucTuan.setDate(ngayBatDauTuan.getDate() + 4);

    const dinhDangNgay = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const ngayBatDauFormat = ngayBatDauTuan.toLocaleDateString('vi-VN', dinhDangNgay).replace(/\//g, '.');
    const ngayKetThucFormat = ngayKetThucTuan.toLocaleDateString('vi-VN', dinhDangNgay).replace(/\//g, '.');

    return `${ngayBatDauFormat.slice(0, -5)} - ${ngayKetThucFormat}`;


}


