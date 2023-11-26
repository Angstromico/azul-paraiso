// BurgerButton.tsx

import { useState } from 'react'

interface Props {
  onClick: () => void
}

export const BurgerButton: React.FC<Props> = ({ onClick }) => {
  const [open, setOpen] = useState(false)

  return (
    <button
      className={`burger ${open ? 'open' : ''}`}
      onClick={() => {
        setOpen(!open)
        onClick()
      }}
    >
      <div className='bar1' />
      <div className='bar2' />
      <div className='bar3' />
    </button>
  )
}
