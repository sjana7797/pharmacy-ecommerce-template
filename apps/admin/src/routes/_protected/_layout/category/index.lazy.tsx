import CategoryPage from '@/admin/pages/category'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_protected/_layout/category/')({
  component: CategoryPage,
})
