import { apiSlice } from "./apiSlice";

const ITEM_URL = "/api/product";

export const productSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProducts: builder.query({
			query: () => ({
				url: `${ITEM_URL}/`,
			}),
			// transformResponse: (res) => {
			// 	const newData = res.map((item) => {
			// 		item.id = item._id;
			// 		return item;
			// 	});
			// },
		}),
		addProduct: builder.mutation({
			query: (newData) => ({
				url: `${ITEM_URL}/`,
				method: "POST",
				body: { ...newData },
			}),
		}),
		updateProduct: builder.mutation({
			query: (updatedData) => ({
				url: `${ITEM_URL}/`,
				method: "PUT",
				body: { ...updatedData },
			}),
		}),
		deleteProduct: builder.mutation({
			query: ({ id }) => ({
				url: `${ITEM_URL}/`,
				method: "DELETE",
				body: { id },
			}),
		}),
	}),
});

export const {
	useGetProductsQuery,
	useDeleteProductMutation,
	useUpdateProductMutation,
	useAddProductMutation,
} = productSlice;
