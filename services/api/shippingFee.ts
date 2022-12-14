import axios from 'axios';
const TOKEN_GHN = 'e553bfce-7b85-11ed-be76-3233f989b8f3';

export const ShippingFeeApi = {
  getFeeShip: async function (to_district_id: number, to_ward_code: string) {
    return await axios.get(
      ` https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee`,
      {
        headers: {
          token: TOKEN_GHN,
          shop_id: 3061735,
        },
        params: {
          service_id: 100039,
          insurance_value: 500000,
          coupon: null,
          from_district_id: 1443,
          to_district_id: to_district_id,
          to_ward_code: to_ward_code,
          height: 15,
          length: 15,
          weight: 1000,
          width: 15,
        },
        withCredentials: false,
      }
    );
  },
  getDistrict: async function (province_id?: number) {
    return await axios.get(
      `https://online-gateway.ghn.vn/shiip/public-api/master-data/district`,
      {
        headers: {
          token: TOKEN_GHN,
          shop_id: 3061735,
        },
        params: {
          province_id: province_id ? province_id : 202,
        },
        // withCredentials: false,
      }
    );
  },
  getWard: async function (district_id: number) {
    return await axios.get(
      `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward`,
      {
        headers: {
          token: TOKEN_GHN,
          shop_id: 3061735,
        },
        params: {
          district_id: district_id,
        },
        // withCredentials: false,
      }
    );
  },
  getService: async function (to_district: number) {
    return await axios.get(
      `https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services`,
      {
        headers: {
          token: TOKEN_GHN,
          shop_id: 3061735,
        },
        params: {
          shop_id: 3061735,
          from_district: 1443,
          to_district: to_district,
        },
        // withCredentials: false,
      }
    );
  },
};
