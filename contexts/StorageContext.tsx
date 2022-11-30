import React, { createContext, useContext, useState } from 'react';
import { PermissionPrams } from '../services/types';

interface IStorageProvider {
  children: React.ReactNode;
}

export type StorageContent = {
  permissions?: any;
  setPermissions?: (value: any) => void;
};

export const StorageContext = createContext<StorageContent>({});

export const useStorageContext = () => useContext(StorageContext);

export const StorageProvider = ({ children }: IStorageProvider) => {
  const [permissions, setPermissions] = useState<any>();

  return (
    <StorageContext.Provider
      value={{
        permissions,
        setPermissions,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};
