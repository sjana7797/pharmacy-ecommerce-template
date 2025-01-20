import { createFileRoute } from '@tanstack/react-router'
import HomePage from '@/admin/pages/home'

export const Route = createFileRoute('/_protected/_layout/')({
  component: HomePage,
})
