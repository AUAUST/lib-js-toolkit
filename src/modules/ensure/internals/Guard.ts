export type Guard<Guarded> = (candidate: any) => candidate is Guarded;
