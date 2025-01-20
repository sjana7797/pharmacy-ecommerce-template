import CategoryPage from '@/admin/pages/category'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/_layout/category/')({
  component: CategoryPage,
})
