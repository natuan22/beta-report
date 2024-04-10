export const postApi = async (apiUrl, url, data) => {
  try {
    const response = await axios
      .create({
        baseURL: apiUrl,
        headers: {
          mac: localStorage.getItem("deviceId"),
          Authorization: "Bearer " + Cookies.get("at"),
        },
      })
      .post(url, data);
    // console.log(response)
  } catch (err) {
    console.error(err);
  }
};
