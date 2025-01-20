import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/_layout/product/')({
  component: Products,
})

function Products() {
  return <div>Hello "/product/"!</div>
}
