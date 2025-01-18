import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/product/')({
  component: Products,
})

function Products() {
  return <div>Hello "/product/"!</div>
}
