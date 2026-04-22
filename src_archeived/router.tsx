import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'

// Pages (lazy loaded for performance)
import { lazy, Suspense } from 'react'

const Landing   = lazy(() => import('@/pages/Landing').then(m => ({ default: m.Landing })))
const Blog      = lazy(() => import('@/pages/Blog').then(m => ({ default: m.Blog })))
const BlogPost  = lazy(() => import('@/pages/BlogPost').then(m => ({ default: m.BlogPost })))
const Lab       = lazy(() => import('@/pages/Lab').then(m => ({ default: m.Lab })))
const Dashboard = lazy(() => import('@/pages/Dashboard').then(m => ({ default: m.Dashboard })))
const About     = lazy(() => import('@/pages/About').then(m => ({ default: m.About })))
const NotFound  = lazy(() => import('@/pages/NotFound').then(m => ({ default: m.NotFound })))

// Page loading fallback
function PageLoader() {
  return (
    <div style={{
      minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <span style={{
        fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text3)',
        letterSpacing: '0.3em', animation: 'fadeUp 0.5s ease infinite alternate',
      }}>
        LOADING...
      </span>
    </div>
  )
}

// Root layout with Nav + Footer
function RootLayout() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: 'var(--nav-h)' }}>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}

// Dashboard has its own layout (no footer, full viewport)
function DashboardLayout() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh' }}>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true,         element: <Landing /> },
      { path: 'blog',        element: <Blog /> },
      { path: 'blog/:slug',  element: <BlogPost /> },
      { path: 'lab',         element: <Lab /> },
      { path: 'about',       element: <About /> },
      { path: '*',           element: <NotFound /> },
    ],
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Dashboard /> },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
