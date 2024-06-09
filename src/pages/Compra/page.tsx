import { LoaderFunctionArgs, redirect, useLoaderData } from "react-router-dom"

export const loader = ({ params }: LoaderFunctionArgs) => {
  const { id } = params

  if (!id) {
    return redirect('/compra/nova')
  }

  return { id }
}

const Compra = () => {
  const { id } = useLoaderData() as { id: string }
  
  return (
    <div>id: {id}</div>
  )
}

export default Compra
