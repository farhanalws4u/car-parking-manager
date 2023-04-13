import axios from "axios";

const url = "https://httpstat.us/200";

export const makePayment = async (details: {
  car_registration: string;
  charges: number;
}) => {
  try {
    await axios.post(`${url}`, details);
    console.log("data posted successfully");
  } catch (error) {
    console.log("error posting data");
  }
};
