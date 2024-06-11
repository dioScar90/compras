import {
  // Form,
  FormControl,
  FormDescription,
  // FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ActionFunctionArgs, Form, redirect, useActionData } from 'react-router-dom'
import { ZodError, z } from 'zod'

const schema = z.object({
  name: z.string({ message: 'Nome inválido' }).min(3, { message: 'Nome precisa ter pelo menos 3 caracteres' }),
})

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = Object.fromEntries(await request.formData())
  
  try {
    const { name } = await schema.parseAsync(formData)
    console.log('name', name)
    // return redirect('/compra/:id')
    return null
  } catch (err) {
    if (err instanceof ZodError) {
      // console.log('ZodError', err)
      return err.issues.reduce((acc, { message, path }) => ({ ...acc, [path[0]]: { message } }), {})
    }

    // console.log('Error', err)
    return null
  }
}

export const NovaCompra = () => {
  const error = useActionData()
  // console.log(error)

  return (
    <Form method="post" className="w-2/3 space-y-6">
      <div>
        <label htmlFor="name">Name</label>
        <Input placeholder="obrigatório" name='name' id='name' />
        {error?.name && <span style={{ color: 'red' }}>{error.name.message}</span>}
      </div>
      <Button type="submit">Submit</Button>
    </Form>
  )
}
