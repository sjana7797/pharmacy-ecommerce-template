import PageTitle from '@/admin/components/global/title'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
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
