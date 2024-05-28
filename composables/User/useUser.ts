// import { useUserData } from '~/src/runtime/composables';

export const useUser = () => {
  const user = ref();

  const setUserdata = (data: any) => {
    // user.value = data;
    // const userData = useUserData();
    // userData.value = JSON.stringify(data);
  };
  // const { result: userData, refetch } = useUserProfile();

  // watch(userData, (val) => {
  //   setUserdata(val?.getVendorProfile);
  // });

  return {
    user,
    // refetch,
    setUserdata,
  };
};
