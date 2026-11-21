import { lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { Layout } from './components/layout/Layout'
import { RouteError } from './pages/RouteError'

import Home from './pages/Home' // eager: the landing page renders without a loading step
const About = lazy(() => import('./pages/About'))
const Speaking = lazy(() => import('./pages/Speaking'))
const Masterclasses = lazy(() => import('./pages/Masterclasses'))
const Insights = lazy(() => import('./pages/Insights'))
const Article = lazy(() => import('./pages/Article'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Privacy = lazy(() => import('./pages/Legal').then((m) => ({ default: m.Privacy })))
const Terms = lazy(() => import('./pages/Legal').then((m) => ({ default: m.Terms })))

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'speaking', element: <Speaking /> },
      { path: 'masterclasses', element: <Masterclasses /> },
      { path: 'insights', element: <Insights /> },
      { path: 'insights/:slug', element: <Article /> },
      { path: 'contact', element: <Contact /> },
      { path: 'privacy', element: <Privacy /> },
      { path: 'terms', element: <Terms /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <RouterProvider router={router} />
    </MotionConfig>
  )
}
