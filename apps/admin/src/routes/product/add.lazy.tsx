import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/product/add")({
  component: AddProduct,
});

function AddProduct() {
  return <div>Hello "/product/$postId"!</div>;
}
