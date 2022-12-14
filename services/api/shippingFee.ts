import axios from 'axios';
const TOKEN_GHN = 'e553bfce-7b85-11ed-be76-3233f989b8f3';

export const ShippingFeeApi = {
  getFeeShip: async function (id: number) {
    return await axios.get(
      ` https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee`,
      {
        headers: {
          token: TOKEN_GHN,
          shop_id: 3061735,
        },
        params: {
          service_id: 53321,
          insurance_value: 500000,
          coupon: null,
          from_district_id: 1542,
          to_district_id: 1444,
          to_ward_code: '20314',
          height: 15,
          length: 15,
          weight: 1000,
          width: 15,
        },
        withCredentials: false,
      }
    );
  },
};
