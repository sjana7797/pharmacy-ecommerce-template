import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/product/$postId/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/product/$postId/"!</div>
}
