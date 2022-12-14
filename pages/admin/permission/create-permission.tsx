import Head from 'next/head';
import Layout from '../../../components/Admin/LayoutAdmin/LayoutAdmin';
import { getCookie } from '../../../services/cookies';
import { GetServerSidePropsContext } from 'next';
import Permission from '../../../components/Admin/Permission/Permission';
import { AccountApi } from '../../../services/api/account';
import { useEffect, useState } from 'react';
import { FilterPermissions } from '../../../services/types';

export default function CreatePermission() {
  const [permissionsList, setPermissionsList] = useState<FilterPermissions[]>(
    []
  );
  let menu: FilterPermissions[] = [];

  const handleGet = async () => {
    const token = await getCookie('token');

    if (token) {
      AccountApi.permissionsList(token).then((res) => {
        const tempArray = res.data.data;

        console.log('tempArray', tempArray);

        for (let i = 0; i < tempArray.length; i++) {
          const index = menu.findIndex(
            (I: { name: string }) => I.name === tempArray[i].nameGroup
          );
          if (index !== -1) {
            menu.map((data) => {
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
        setPermissionsList(menu);
      });
    }
  };

  useEffect(() => {
    handleGet();
  }, []);

  return (
    <>
      <Head>
        <title>Create Permission</title>
        <meta name='description' content='Generated by create next app' />
      </Head>
      <Layout>
        {permissionsList.length > 0 ? (
          <Permission permissionsList={permissionsList} />
        ) : (
          <></>
        )}
      </Layout>
    </>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const token = await getCookie('token', ctx);
  if (token) {
    try {
      //   console.log('token server: ', token);

      return {
        props: {
          //   permissionsList: res,
        },
      };
    } catch (e) {
      console.log('server error: ', e);
    }

    return {
      props: {},
    };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
}
