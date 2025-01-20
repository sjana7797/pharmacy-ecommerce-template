export const categoriesRoutes = {
  all: "/categories",
  id: (id: string) => `/categories/id/${id}`,
  slug: (slug: string) => `/categories/${slug}`,
};

export const authRoutes = {
  login: "/auth/login",
  logout: "/auth/logout",
  register: "/auth/register",
};
