import moment from 'moment';
import { getCookie } from 'typescript-cookie';
import { AccountApi } from '../services/api/account';
import { IItemCheckVariant, IItemVariant } from '../services/interface';
import {
  FilterPermissions,
  PermissionPrams,
  VariantParams,
} from '../services/types';

export const formatDate = (value: any) => {
  return moment(value).format('MM-DD-YYYY');
};

export const removeTime = (value: any) => {
  return value.split(' ')[0];
};

export const formatDateVN = (value: any) => {
  return moment(value).format('dd/MM/yyyy HH:mm:ss');
};

export const toUTCTime = (time: string | number | Date) => {
  let newTime = new Date(time);
  // let newTimeUTC = new Date(
  //   Date.UTC(newTime.getFullYear(), newTime.getMonth(), newTime.getDay())
  // );
  // newTime.setHours(newTime.getHours() + 7);
  let newTimeUTC = new Date(newTime.getTime());
  return newTimeUTC.toLocaleString(['en-GB'], {
    hour: '2-digit',
    minute: '2-digit',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });
};

export const filterPermissions = (tempArray: any[]) => {
  let menu: any = [];

  if (tempArray) {
    for (let i = 0; i < tempArray.length; i++) {
      const index = menu.findIndex(
        (I: { name: string }) => I.name === tempArray[i].nameGroup
      );
      if (index !== -1) {
        menu.map((data: { name: string; list: PermissionPrams[] }) => {
          if (data.name === tempArray[i].nameGroup) {
            data.list.push(tempArray[i]);
            return data;
          } else {
            return data;
          }
        });
      } else {
        let newMenuParam = {
          name: tempArray[i].nameGroup,
          list: [tempArray[i]],
        };
        menu.push(newMenuParam);
      }
    }
    return menu;
  }
};

export const getAllPermission = async () => {
  const token = await getCookie('token');
  if (token) {
    const result = await AccountApi.permissionsList(token);

    if (result) {
      let filterListTemp: FilterPermissions[] = filterPermissions(
        result.data.data
      );
      return filterListTemp;
    }
  }
};

export const filterVariants = (variants: VariantParams[]) => {
  let fakeId = -1;
  let sizeArray = [];
  let colorArray = [];
  let OtherVariants = [];

  let returnArray: IItemCheckVariant[] = [];

  for (let i = 0; i < variants.length; i++) {
    let currentVariant = {
      id: variants[i].id,
      name: variants[i].name,
      property: variants[i].property,
      addPrice: variants[i].addPrice,
      checked: false,
    };
    if (currentVariant.name === 'size') {
      if (sizeArray.length === 0) {
        currentVariant.checked = true;
      }
      sizeArray.push(currentVariant);
    } else {
      if (currentVariant.name === 'color') {
        if (colorArray.length === 0) {
          currentVariant.checked = true;
        }
        colorArray.push(currentVariant);
      } else {
        let isPush = false;
        OtherVariants.map((item) => {
          if (item.name === currentVariant.name) {
            item.data.push(currentVariant);
            isPush = true;
          }
        });
        if (!isPush) {
          const newData: IItemCheckVariant = {
            id: fakeId--,
            name: currentVariant.name,
            data: [currentVariant],
          };
          OtherVariants.push(newData);
        }
      }
    }
  }
  let newDataColor: IItemCheckVariant = {
    id: fakeId--,
    name: 'color',
    data: colorArray,
  };

  let newDataSize: IItemCheckVariant = {
    id: fakeId--,
    name: 'size',
    data: sizeArray,
  };

  returnArray = returnArray.concat(newDataSize, newDataColor, OtherVariants);
  return returnArray;
};

export function formatPrice(number: number) {
  return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
}
