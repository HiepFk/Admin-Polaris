import image_1 from "../assets/img/1.png";
import image_2 from "../assets/img/2.png";
import image_3 from "../assets/img/3.png";
import image_4 from "../assets/img/4.png";
import image_5 from "../assets/img/5.png";

const arrImg = [image_1, image_2, image_3, image_4, image_5];

export const handleGetImage = (index) => {
  return arrImg[index % arrImg.length];
};

export const formatDateTime = (date = new Date()) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};

const formattedDateTime = formatDateTime();
