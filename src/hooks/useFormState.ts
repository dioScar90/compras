import { useCallback, useReducer } from 'react';
import { z } from 'zod';

const suamae = z.object({
  name: z.string(),
  lastName: z.string(),
})

function getDefaults<Schema extends z.AnyZodObject>(schema: Schema) {
  return Object.fromEntries(
      Object.entries(schema.shape).map(([key, value]) => {
          if (value instanceof z.ZodDefault) return [key, value._def.defaultValue()]
          return [key, '']
      })
  )
}

const items = getDefaults(suamae)

type UserState = infer<typeof schema>

interface UserAction {
  type: 'change_email' | 'change_password' | undefined
  value: string
}

function reducer(state: infer<typeof ZodType>, action: UserAction) {
  switch (action.type) {
    case 'change_email': {
      return {
        ...state,
        email: action.value,
      }
    }
    case 'change_password': {
      return {
        ...state,
        password: action.value,
      }
    }
  }
  throw Error('Unknown action: ' + action.type);
}

function getActionType<Schema extends z.AnyZodObject>(schema: Schema) {
  return keyof z.infer<typeof schema>
}

const fruit = ["apple", "banana", "grape"] as const;
type Fruit = (typeof fruit)[number];

export function useFormState<Schema extends z.AnyZodObject>(schema: Schema) {
  const reducer = useCallback((state: z.infer<typeof schema>, action: getActionType) => {
    switch (action.type) {
      case 'change_email': {
        return {
          ...state,
          email: action.value,
        }
      }
      case 'change_password': {
        return {
          ...state,
          password: action.value,
        }
      }
    }
    throw Error('Unknown action: ' + action.type);
  }, [schema])
  
  const [state, dispatch] = useReducer(reducer, { ...getDefaults(schema)})
}