import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/_protected/_layout/product/$productSlug/edit',
)({
  component: Product,
})

function Product() {
  return <div>Hello "/product/$postId"!</div>
}
