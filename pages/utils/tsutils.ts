export type Merge<F extends object, S extends object> = { [P in keyof F | keyof S]: P extends keyof S ? S[P] : P extends keyof F ? F[P] : never };
