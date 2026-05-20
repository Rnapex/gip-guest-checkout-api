import axios
  from "axios";

// =====================================
// GET ACCESS TOKEN
// =====================================

async function getAccessToken() {

  const response =
    await axios.post(

      `${process.env.GIP_BASE_URL}/api/v1/customer/auth/access-token`,

      {
        clientId:
          process.env.GIP_CLIENT_ID,

        clientSecret:
          process.env.GIP_CLIENT_SECRET,
      },

      {
        headers: {
          "Content-Type":
            "application/json",

          "Accept-Language":
            "en",
        },
      }
    );

  return response.data
    ?.data
    ?.accessToken;
}

// =====================================
// CREATE GIP ORDER
// =====================================

export async function createGipOrder({

  orderType,

  payload,
}) {

  const token =
    await getAccessToken();

  const endpoint =

    orderType ===
    "ondemand"

      ? "/api/v1/customer/order/ondemand"

      : "/api/v1/customer/order/pickup-delivery";

  const response =
    await axios.post(

      `${process.env.GIP_BASE_URL}${endpoint}`,

      payload,

      {
        headers: {

          Authorization:
            `Bearer ${token}`,

          "Accept-Language":
            "en",

          "Content-Type":
            "application/json",
        },
      }
    );

  return response.data;
}