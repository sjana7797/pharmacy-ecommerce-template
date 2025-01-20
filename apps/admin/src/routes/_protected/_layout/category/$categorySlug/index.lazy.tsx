import PageTitle from '@/admin/components/global/title'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/_protected/_layout/category/$categorySlug/',
)({
  component: CategoryPage,
})

function CategoryPage() {
  return (
    <main>
      <PageTitle
        title="Dashboard"
        actionsBar={<div className="flex items-center space-x-2"></div>}
      />
    </main>
  )
}
