import { create } from 'zustand'

interface Options {
  option1: string
  option2: string
  option3: string
}

interface Store {
  op: string
  setOp: (value: string) => void
  formOptions: Options
  setFormOptions: (value: Options) => void
}

export const useBearStore = create<Store>((set) => ({
  op: '',
  setOp: (value) => set({ op: value }),
  formOptions: { option1: '', option2: '', option3: '' },
  setFormOptions: (value) => set({ formOptions: value }),
}))
