import { createLazyFileRoute } from '@tanstack/react-router'
import HomePage from '@/admin/pages/home'

export const Route = createLazyFileRoute('/_protected/_layout/')({
  component: HomePage,
})
