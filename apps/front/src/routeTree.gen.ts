/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AboutImport } from './routes/about'
import { Route as IndexImport } from './routes/index'
import { Route as AuthSignUpImport } from './routes/auth/sign-up'
import { Route as AuthSignOutImport } from './routes/auth/sign-out'
import { Route as AuthSignInImport } from './routes/auth/sign-in'

// Create/Update Routes

const AboutRoute = AboutImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthSignUpRoute = AuthSignUpImport.update({
  id: '/auth/sign-up',
  path: '/auth/sign-up',
  getParentRoute: () => rootRoute,
} as any)

const AuthSignOutRoute = AuthSignOutImport.update({
  id: '/auth/sign-out',
  path: '/auth/sign-out',
  getParentRoute: () => rootRoute,
} as any)

const AuthSignInRoute = AuthSignInImport.update({
  id: '/auth/sign-in',
  path: '/auth/sign-in',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/auth/sign-in': {
      id: '/auth/sign-in'
      path: '/auth/sign-in'
      fullPath: '/auth/sign-in'
      preLoaderRoute: typeof AuthSignInImport
      parentRoute: typeof rootRoute
    }
    '/auth/sign-out': {
      id: '/auth/sign-out'
      path: '/auth/sign-out'
      fullPath: '/auth/sign-out'
      preLoaderRoute: typeof AuthSignOutImport
      parentRoute: typeof rootRoute
    }
    '/auth/sign-up': {
      id: '/auth/sign-up'
      path: '/auth/sign-up'
      fullPath: '/auth/sign-up'
      preLoaderRoute: typeof AuthSignUpImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/auth/sign-in': typeof AuthSignInRoute
  '/auth/sign-out': typeof AuthSignOutRoute
  '/auth/sign-up': typeof AuthSignUpRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/auth/sign-in': typeof AuthSignInRoute
  '/auth/sign-out': typeof AuthSignOutRoute
  '/auth/sign-up': typeof AuthSignUpRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/auth/sign-in': typeof AuthSignInRoute
  '/auth/sign-out': typeof AuthSignOutRoute
  '/auth/sign-up': typeof AuthSignUpRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/about'
    | '/auth/sign-in'
    | '/auth/sign-out'
    | '/auth/sign-up'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/about' | '/auth/sign-in' | '/auth/sign-out' | '/auth/sign-up'
  id:
    | '__root__'
    | '/'
    | '/about'
    | '/auth/sign-in'
    | '/auth/sign-out'
    | '/auth/sign-up'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AboutRoute: typeof AboutRoute
  AuthSignInRoute: typeof AuthSignInRoute
  AuthSignOutRoute: typeof AuthSignOutRoute
  AuthSignUpRoute: typeof AuthSignUpRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AboutRoute: AboutRoute,
  AuthSignInRoute: AuthSignInRoute,
  AuthSignOutRoute: AuthSignOutRoute,
  AuthSignUpRoute: AuthSignUpRoute,
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
        "/",
        "/about",
        "/auth/sign-in",
        "/auth/sign-out",
        "/auth/sign-up"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/auth/sign-in": {
      "filePath": "auth/sign-in.tsx"
    },
    "/auth/sign-out": {
      "filePath": "auth/sign-out.tsx"
    },
    "/auth/sign-up": {
      "filePath": "auth/sign-up.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
