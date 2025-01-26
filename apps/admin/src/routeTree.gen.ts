/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './app/routes/__root'
import { Route as ProtectedImport } from './app/routes/_protected'
import { Route as AuthLoginImport } from './app/routes/auth/login'
import { Route as ProtectedLayoutImport } from './app/routes/_protected/_layout'

// Create Virtual Routes

const ProtectedLayoutIndexLazyImport = createFileRoute('/_protected/_layout/')()
const ProtectedLayoutProductIndexLazyImport = createFileRoute(
  '/_protected/_layout/product/',
)()
const ProtectedLayoutCategoryIndexLazyImport = createFileRoute(
  '/_protected/_layout/category/',
)()
const ProtectedLayoutProductAddLazyImport = createFileRoute(
  '/_protected/_layout/product/add',
)()
const ProtectedLayoutCategoryAddLazyImport = createFileRoute(
  '/_protected/_layout/category/add',
)()
const ProtectedLayoutProductProductSlugIndexLazyImport = createFileRoute(
  '/_protected/_layout/product/$productSlug/',
)()
const ProtectedLayoutCategoryCategorySlugIndexLazyImport = createFileRoute(
  '/_protected/_layout/category/$categorySlug/',
)()
const ProtectedLayoutProductProductSlugEditLazyImport = createFileRoute(
  '/_protected/_layout/product/$productSlug/edit',
)()

// Create/Update Routes

const ProtectedRoute = ProtectedImport.update({
  id: '/_protected',
  getParentRoute: () => rootRoute,
} as any)

const AuthLoginRoute = AuthLoginImport.update({
  id: '/auth/login',
  path: '/auth/login',
  getParentRoute: () => rootRoute,
} as any)

const ProtectedLayoutRoute = ProtectedLayoutImport.update({
  id: '/_layout',
  getParentRoute: () => ProtectedRoute,
} as any)

const ProtectedLayoutIndexLazyRoute = ProtectedLayoutIndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => ProtectedLayoutRoute,
} as any).lazy(() =>
  import('./app/routes/_protected/_layout/index.lazy').then((d) => d.Route),
)

const ProtectedLayoutProductIndexLazyRoute =
  ProtectedLayoutProductIndexLazyImport.update({
    id: '/product/',
    path: '/product/',
    getParentRoute: () => ProtectedLayoutRoute,
  } as any).lazy(() =>
    import('./app/routes/_protected/_layout/product/index.lazy').then(
      (d) => d.Route,
    ),
  )

const ProtectedLayoutCategoryIndexLazyRoute =
  ProtectedLayoutCategoryIndexLazyImport.update({
    id: '/category/',
    path: '/category/',
    getParentRoute: () => ProtectedLayoutRoute,
  } as any).lazy(() =>
    import('./app/routes/_protected/_layout/category/index.lazy').then(
      (d) => d.Route,
    ),
  )

const ProtectedLayoutProductAddLazyRoute =
  ProtectedLayoutProductAddLazyImport.update({
    id: '/product/add',
    path: '/product/add',
    getParentRoute: () => ProtectedLayoutRoute,
  } as any).lazy(() =>
    import('./app/routes/_protected/_layout/product/add.lazy').then(
      (d) => d.Route,
    ),
  )

const ProtectedLayoutCategoryAddLazyRoute =
  ProtectedLayoutCategoryAddLazyImport.update({
    id: '/category/add',
    path: '/category/add',
    getParentRoute: () => ProtectedLayoutRoute,
  } as any).lazy(() =>
    import('./app/routes/_protected/_layout/category/add.lazy').then(
      (d) => d.Route,
    ),
  )

const ProtectedLayoutProductProductSlugIndexLazyRoute =
  ProtectedLayoutProductProductSlugIndexLazyImport.update({
    id: '/product/$productSlug/',
    path: '/product/$productSlug/',
    getParentRoute: () => ProtectedLayoutRoute,
  } as any).lazy(() =>
    import(
      './app/routes/_protected/_layout/product/$productSlug/index.lazy'
    ).then((d) => d.Route),
  )

const ProtectedLayoutCategoryCategorySlugIndexLazyRoute =
  ProtectedLayoutCategoryCategorySlugIndexLazyImport.update({
    id: '/category/$categorySlug/',
    path: '/category/$categorySlug/',
    getParentRoute: () => ProtectedLayoutRoute,
  } as any).lazy(() =>
    import(
      './app/routes/_protected/_layout/category/$categorySlug/index.lazy'
    ).then((d) => d.Route),
  )

const ProtectedLayoutProductProductSlugEditLazyRoute =
  ProtectedLayoutProductProductSlugEditLazyImport.update({
    id: '/product/$productSlug/edit',
    path: '/product/$productSlug/edit',
    getParentRoute: () => ProtectedLayoutRoute,
  } as any).lazy(() =>
    import(
      './app/routes/_protected/_layout/product/$productSlug/edit.lazy'
    ).then((d) => d.Route),
  )

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_protected': {
      id: '/_protected'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof ProtectedImport
      parentRoute: typeof rootRoute
    }
    '/_protected/_layout': {
      id: '/_protected/_layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof ProtectedLayoutImport
      parentRoute: typeof ProtectedImport
    }
    '/auth/login': {
      id: '/auth/login'
      path: '/auth/login'
      fullPath: '/auth/login'
      preLoaderRoute: typeof AuthLoginImport
      parentRoute: typeof rootRoute
    }
    '/_protected/_layout/': {
      id: '/_protected/_layout/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof ProtectedLayoutIndexLazyImport
      parentRoute: typeof ProtectedLayoutImport
    }
    '/_protected/_layout/category/add': {
      id: '/_protected/_layout/category/add'
      path: '/category/add'
      fullPath: '/category/add'
      preLoaderRoute: typeof ProtectedLayoutCategoryAddLazyImport
      parentRoute: typeof ProtectedLayoutImport
    }
    '/_protected/_layout/product/add': {
      id: '/_protected/_layout/product/add'
      path: '/product/add'
      fullPath: '/product/add'
      preLoaderRoute: typeof ProtectedLayoutProductAddLazyImport
      parentRoute: typeof ProtectedLayoutImport
    }
    '/_protected/_layout/category/': {
      id: '/_protected/_layout/category/'
      path: '/category'
      fullPath: '/category'
      preLoaderRoute: typeof ProtectedLayoutCategoryIndexLazyImport
      parentRoute: typeof ProtectedLayoutImport
    }
    '/_protected/_layout/product/': {
      id: '/_protected/_layout/product/'
      path: '/product'
      fullPath: '/product'
      preLoaderRoute: typeof ProtectedLayoutProductIndexLazyImport
      parentRoute: typeof ProtectedLayoutImport
    }
    '/_protected/_layout/product/$productSlug/edit': {
      id: '/_protected/_layout/product/$productSlug/edit'
      path: '/product/$productSlug/edit'
      fullPath: '/product/$productSlug/edit'
      preLoaderRoute: typeof ProtectedLayoutProductProductSlugEditLazyImport
      parentRoute: typeof ProtectedLayoutImport
    }
    '/_protected/_layout/category/$categorySlug/': {
      id: '/_protected/_layout/category/$categorySlug/'
      path: '/category/$categorySlug'
      fullPath: '/category/$categorySlug'
      preLoaderRoute: typeof ProtectedLayoutCategoryCategorySlugIndexLazyImport
      parentRoute: typeof ProtectedLayoutImport
    }
    '/_protected/_layout/product/$productSlug/': {
      id: '/_protected/_layout/product/$productSlug/'
      path: '/product/$productSlug'
      fullPath: '/product/$productSlug'
      preLoaderRoute: typeof ProtectedLayoutProductProductSlugIndexLazyImport
      parentRoute: typeof ProtectedLayoutImport
    }
  }
}

// Create and export the route tree

interface ProtectedLayoutRouteChildren {
  ProtectedLayoutIndexLazyRoute: typeof ProtectedLayoutIndexLazyRoute
  ProtectedLayoutCategoryAddLazyRoute: typeof ProtectedLayoutCategoryAddLazyRoute
  ProtectedLayoutProductAddLazyRoute: typeof ProtectedLayoutProductAddLazyRoute
  ProtectedLayoutCategoryIndexLazyRoute: typeof ProtectedLayoutCategoryIndexLazyRoute
  ProtectedLayoutProductIndexLazyRoute: typeof ProtectedLayoutProductIndexLazyRoute
  ProtectedLayoutProductProductSlugEditLazyRoute: typeof ProtectedLayoutProductProductSlugEditLazyRoute
  ProtectedLayoutCategoryCategorySlugIndexLazyRoute: typeof ProtectedLayoutCategoryCategorySlugIndexLazyRoute
  ProtectedLayoutProductProductSlugIndexLazyRoute: typeof ProtectedLayoutProductProductSlugIndexLazyRoute
}

const ProtectedLayoutRouteChildren: ProtectedLayoutRouteChildren = {
  ProtectedLayoutIndexLazyRoute: ProtectedLayoutIndexLazyRoute,
  ProtectedLayoutCategoryAddLazyRoute: ProtectedLayoutCategoryAddLazyRoute,
  ProtectedLayoutProductAddLazyRoute: ProtectedLayoutProductAddLazyRoute,
  ProtectedLayoutCategoryIndexLazyRoute: ProtectedLayoutCategoryIndexLazyRoute,
  ProtectedLayoutProductIndexLazyRoute: ProtectedLayoutProductIndexLazyRoute,
  ProtectedLayoutProductProductSlugEditLazyRoute:
    ProtectedLayoutProductProductSlugEditLazyRoute,
  ProtectedLayoutCategoryCategorySlugIndexLazyRoute:
    ProtectedLayoutCategoryCategorySlugIndexLazyRoute,
  ProtectedLayoutProductProductSlugIndexLazyRoute:
    ProtectedLayoutProductProductSlugIndexLazyRoute,
}

const ProtectedLayoutRouteWithChildren = ProtectedLayoutRoute._addFileChildren(
  ProtectedLayoutRouteChildren,
)

interface ProtectedRouteChildren {
  ProtectedLayoutRoute: typeof ProtectedLayoutRouteWithChildren
}

const ProtectedRouteChildren: ProtectedRouteChildren = {
  ProtectedLayoutRoute: ProtectedLayoutRouteWithChildren,
}

const ProtectedRouteWithChildren = ProtectedRoute._addFileChildren(
  ProtectedRouteChildren,
)

export interface FileRoutesByFullPath {
  '': typeof ProtectedLayoutRouteWithChildren
  '/auth/login': typeof AuthLoginRoute
  '/': typeof ProtectedLayoutIndexLazyRoute
  '/category/add': typeof ProtectedLayoutCategoryAddLazyRoute
  '/product/add': typeof ProtectedLayoutProductAddLazyRoute
  '/category': typeof ProtectedLayoutCategoryIndexLazyRoute
  '/product': typeof ProtectedLayoutProductIndexLazyRoute
  '/product/$productSlug/edit': typeof ProtectedLayoutProductProductSlugEditLazyRoute
  '/category/$categorySlug': typeof ProtectedLayoutCategoryCategorySlugIndexLazyRoute
  '/product/$productSlug': typeof ProtectedLayoutProductProductSlugIndexLazyRoute
}

export interface FileRoutesByTo {
  '': typeof ProtectedRouteWithChildren
  '/auth/login': typeof AuthLoginRoute
  '/': typeof ProtectedLayoutIndexLazyRoute
  '/category/add': typeof ProtectedLayoutCategoryAddLazyRoute
  '/product/add': typeof ProtectedLayoutProductAddLazyRoute
  '/category': typeof ProtectedLayoutCategoryIndexLazyRoute
  '/product': typeof ProtectedLayoutProductIndexLazyRoute
  '/product/$productSlug/edit': typeof ProtectedLayoutProductProductSlugEditLazyRoute
  '/category/$categorySlug': typeof ProtectedLayoutCategoryCategorySlugIndexLazyRoute
  '/product/$productSlug': typeof ProtectedLayoutProductProductSlugIndexLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_protected': typeof ProtectedRouteWithChildren
  '/_protected/_layout': typeof ProtectedLayoutRouteWithChildren
  '/auth/login': typeof AuthLoginRoute
  '/_protected/_layout/': typeof ProtectedLayoutIndexLazyRoute
  '/_protected/_layout/category/add': typeof ProtectedLayoutCategoryAddLazyRoute
  '/_protected/_layout/product/add': typeof ProtectedLayoutProductAddLazyRoute
  '/_protected/_layout/category/': typeof ProtectedLayoutCategoryIndexLazyRoute
  '/_protected/_layout/product/': typeof ProtectedLayoutProductIndexLazyRoute
  '/_protected/_layout/product/$productSlug/edit': typeof ProtectedLayoutProductProductSlugEditLazyRoute
  '/_protected/_layout/category/$categorySlug/': typeof ProtectedLayoutCategoryCategorySlugIndexLazyRoute
  '/_protected/_layout/product/$productSlug/': typeof ProtectedLayoutProductProductSlugIndexLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/auth/login'
    | '/'
    | '/category/add'
    | '/product/add'
    | '/category'
    | '/product'
    | '/product/$productSlug/edit'
    | '/category/$categorySlug'
    | '/product/$productSlug'
  fileRoutesByTo: FileRoutesByTo
  to:
    | ''
    | '/auth/login'
    | '/'
    | '/category/add'
    | '/product/add'
    | '/category'
    | '/product'
    | '/product/$productSlug/edit'
    | '/category/$categorySlug'
    | '/product/$productSlug'
  id:
    | '__root__'
    | '/_protected'
    | '/_protected/_layout'
    | '/auth/login'
    | '/_protected/_layout/'
    | '/_protected/_layout/category/add'
    | '/_protected/_layout/product/add'
    | '/_protected/_layout/category/'
    | '/_protected/_layout/product/'
    | '/_protected/_layout/product/$productSlug/edit'
    | '/_protected/_layout/category/$categorySlug/'
    | '/_protected/_layout/product/$productSlug/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  ProtectedRoute: typeof ProtectedRouteWithChildren
  AuthLoginRoute: typeof AuthLoginRoute
}

const rootRouteChildren: RootRouteChildren = {
  ProtectedRoute: ProtectedRouteWithChildren,
  AuthLoginRoute: AuthLoginRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_protected",
        "/auth/login"
      ]
    },
    "/_protected": {
      "filePath": "_protected.tsx",
      "children": [
        "/_protected/_layout"
      ]
    },
    "/_protected/_layout": {
      "filePath": "_protected/_layout.tsx",
      "parent": "/_protected",
      "children": [
        "/_protected/_layout/",
        "/_protected/_layout/category/add",
        "/_protected/_layout/product/add",
        "/_protected/_layout/category/",
        "/_protected/_layout/product/",
        "/_protected/_layout/product/$productSlug/edit",
        "/_protected/_layout/category/$categorySlug/",
        "/_protected/_layout/product/$productSlug/"
      ]
    },
    "/auth/login": {
      "filePath": "auth/login.tsx"
    },
    "/_protected/_layout/": {
      "filePath": "_protected/_layout/index.lazy.tsx",
      "parent": "/_protected/_layout"
    },
    "/_protected/_layout/category/add": {
      "filePath": "_protected/_layout/category/add.lazy.tsx",
      "parent": "/_protected/_layout"
    },
    "/_protected/_layout/product/add": {
      "filePath": "_protected/_layout/product/add.lazy.tsx",
      "parent": "/_protected/_layout"
    },
    "/_protected/_layout/category/": {
      "filePath": "_protected/_layout/category/index.lazy.tsx",
      "parent": "/_protected/_layout"
    },
    "/_protected/_layout/product/": {
      "filePath": "_protected/_layout/product/index.lazy.tsx",
      "parent": "/_protected/_layout"
    },
    "/_protected/_layout/product/$productSlug/edit": {
      "filePath": "_protected/_layout/product/$productSlug/edit.lazy.tsx",
      "parent": "/_protected/_layout"
    },
    "/_protected/_layout/category/$categorySlug/": {
      "filePath": "_protected/_layout/category/$categorySlug/index.lazy.tsx",
      "parent": "/_protected/_layout"
    },
    "/_protected/_layout/product/$productSlug/": {
      "filePath": "_protected/_layout/product/$productSlug/index.lazy.tsx",
      "parent": "/_protected/_layout"
    }
  }
}
ROUTE_MANIFEST_END */
