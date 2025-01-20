import AddCategory from '@/admin/pages/category/add'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/_layout/category/add')({
  component: AddCategory,
})
