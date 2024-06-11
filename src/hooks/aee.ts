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
