import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import constants from '../utils/constants';
import { setToken } from '../slices/userSlice';
import { storeToken } from '../utils/tokenUtils';
import { setUser } from '../slices/userSlice';


// const cartForStore = cartApi.endpoints.getAllCarts.useQueryState()?.data?.['REGULAR']?.[
//   storeDetails.id
// ];
// Define the base URL for API requests
export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl:  constants.API_BASE_URL}), 
  tagTypes: ["USER"],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body) => {
        return {
          url: `/auth/login`,
          method: 'POST',
          body: body
        };
      },
      async onQueryStarted(args, {dispatch, queryFulfilled}) {
        const {data} = await queryFulfilled;
        try{
          storeToken(data.accessToken)
          dispatch(setUser({ user: data,}));

        }catch{
          console.log("error storing token")
        }
      },
      providesTags: ["USER"],
      // keepUnusedDataFor: 10 * 60,
    }),
    // maintainLogin: builder.query({
    //   queryFn: () => {
    //     const patchResult = usersApi.util.updateQueryData(
    //       'loginUser',
    //       undefined,
    //       draft => {
    //         return {};
    //       },
    //     );
    //   }
    // })

  }),
});

// Export the auto-generated hook for the `getUsers` endpoint
export const { useLoginUserMutation,
  //  useFetchUserProfileQuery
   } = usersApi;
