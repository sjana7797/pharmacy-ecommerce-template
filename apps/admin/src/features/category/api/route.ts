export const categoriesRoutes = {
  all: "/categories",
  id: (id: string) => `/categories/id/${id}`,
  slug: (slug: string) => `/categories/${slug}`,
};
