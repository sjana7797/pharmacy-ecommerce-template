import AddCategory from '@/admin/pages/category/add'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_protected/_layout/category/add')({
  component: AddCategory,
})
