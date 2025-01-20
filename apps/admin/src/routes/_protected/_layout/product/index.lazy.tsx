import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_protected/_layout/product/')({
  component: Products,
})

function Products() {
  return <div>Hello "/product/"!</div>
}
