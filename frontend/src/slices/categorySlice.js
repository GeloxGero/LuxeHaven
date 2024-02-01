import { apiSlice } from "./apiSlice";

const CATEGORY_URL = "/api/category";

export const categorySlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getCategories: builder.query({
			query: () => ({
				url: `${CATEGORY_URL}/`,
			}),
		}),
		addCategory: builder.mutation({
			query: (newData) => ({
				url: `${CATEGORY_URL}/`,
				method: "POST",
				body: { ...newData },
			}),
		}),
		deleteCategory: builder.mutation({
			query: ({ id }) => ({
				url: `${CATEGORY_URL}/`,
				method: "DELETE",
				body: { id },
			}),
		}),
	}),
});

export const {
	useGetCategoriesQuery,
	useAddCategoryMutation,
	useDeleteCategoryMutation,
} = categorySlice;
