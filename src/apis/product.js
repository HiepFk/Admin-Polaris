const linkApi = process.env.REACT_APP_API_LINK;

export const getListProduct = async () => {
  try {
    const response = await fetch(linkApi);

    // Kiểm tra nếu phản hồi không thành công
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Chuyển đổi phản hồi thành JSON
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Đã xảy ra lỗi khi lấy dữ liệu:", error);
    throw error; // Ném lỗi để có thể xử lý ở component
  }
};
