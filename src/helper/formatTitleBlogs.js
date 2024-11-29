export const formatTitle = (title) => {
  const removeVietnameseTones = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Xóa dấu Unicode
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  };

  return removeVietnameseTones(title)
    .trim()
    .replace(/\s+/g, "-") // Thay khoảng trắng bằng dấu gạch ngang
    .replace(/[^a-zA-Z0-9\-]/g, "") // Loại bỏ các ký tự không hợp lệ
    .toLowerCase();
};
