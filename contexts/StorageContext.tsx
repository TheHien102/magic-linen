import React, { createContext, useContext, useState } from 'react';
import { PermissionPrams, UserStorage } from '../services/types';

interface IStorageProvider {
  children: React.ReactNode;
}

export type StorageContent = {
  permissions?: any;
  setPermissions?: (value: any) => void;
  userInfo?: UserStorage;
  setUserInfo?: (value: UserStorage | undefined) => void;
};

export const StorageContext = createContext<StorageContent>({});

export const useStorageContext = () => useContext(StorageContext);

export const StorageProvider = ({ children }: IStorageProvider) => {
  const [permissions, setPermissions] = useState<any>();
  const [userInfo, setUserInfo] = useState<UserStorage | undefined>();

  return (
    <StorageContext.Provider
      value={{
        permissions,
        setPermissions,
        userInfo,
        setUserInfo,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};
