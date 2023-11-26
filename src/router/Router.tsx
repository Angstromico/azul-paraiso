import { Routes, Route, Navigate } from 'react-router-dom'
import NotFound from './NotFound'
import { GET_PAGES_INFO, generatePage, type Pages } from 'q'
import { useQuery } from '@apollo/client'

const Router = () => {
  const { loading, error, data } = useQuery(GET_PAGES_INFO)

  if (loading) return
  if (error) return

  const renderRoutes = () => {
    const routes: React.ReactElement[] = []
    data.pages.data.forEach((page: Pages) => {
      generatePage(routes, page)
    })
    return routes
  }

  return (
    <Routes>
      {renderRoutes()}
      <Route path='/404' element={<NotFound />} />
      <Route path='*' element={<Navigate to='/404' />} />
    </Routes>
  )
}
export default Router
