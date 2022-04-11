import axios from "axios";

export const getToken = async (): Promise<string> => {
  const {
    data: { token },
  } = await axios.post(`http://localhost:3000/users/mfa`);
  return token;
};
