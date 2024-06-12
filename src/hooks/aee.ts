import { z } from 'zod';

const schema = z.object({
  name: z.string().min(3),
  age: z.number().min(12),
  address: z.object({
    street: z.string(),
    number: z.string(),
    zip: z.string().length(8),
    city: z.string(),
    state: z.string().length(2),
  }),
});


type KeyInfer = keyof z.infer<typeof schema>
type KeyTwo<T, P extends string> = z.infer<typeof schema> extends PropertyKey ?  keyof z.infer<typeof schema> : undefined

type SchemaKeys = keyof typeof schema.shape
  | typeof schema.shape.address.shape extends z.AnyZodObject ? keyof typeof schema.shape.address.shape : never
type GetEnumsOfSchema<T> = T extends string ? `change_${T}` : undefined

type Schhhh<T, B extends string | undefined> = T extends z.AnyZodObject
  ? keyof typeof T | B extends string ? keyof typeof T.shape[B] : never
  : never

type OhGloria = GetEnumsOfSchema<SchemaKeys>

type Join<K, P> = K extends string | number ? 
  P extends string | number ? 
  `${K}.${P}` : never : never;

// Função recursiva para gerar todas as chaves
type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
type Leaves<T, D extends number = 10> = [D] extends [never] ? never : T extends object ? {
  [K in keyof T]: K extends string | number ? Join<K, Leaves<T[K], Prev[D]>> : never
}[keyof T] : "";

// Função para extrair as chaves do schema
type ExtractKeys<T> = Leaves<T> | keyof T;

// Inferir o tipo Infos a partir do esquema zod
type Infos = z.infer<typeof schema>;

// Gerar todas as chaves a partir do tipo Infos
type Keys = ExtractKeys<Infos>;

// Definir o tipo keys
type keys = Keys | undefined;

// Gerar tipo UserAction dinamicamente
type UserActionType = `change_${Keys}`;
type UserAction = {
  type: UserActionType | undefined;
  value: string;
};

// Exemplo de uso:
const action: UserAction = {
  type: 'change_address.street',
  value: 'New Street'
};

console.log(action);
