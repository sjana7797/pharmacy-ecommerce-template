import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/_layout/product/add')({
  component: AddProduct,
})

function AddProduct() {
  return <div>Hello "/product/$postId"!</div>
}
