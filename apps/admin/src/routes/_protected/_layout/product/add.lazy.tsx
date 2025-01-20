import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_protected/_layout/product/add')({
  component: AddProduct,
})

function AddProduct() {
  return <div>Hello "/product/$postId"!</div>
}
