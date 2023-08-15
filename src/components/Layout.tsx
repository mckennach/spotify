import type { ReactNode } from 'react'
 
const Layout = ({ children }: { children: ReactNode}) => {
 
  return (
    <>
      <main className="bg-neutral-900">{children}</main>
    </>
  )
}

export default Layout;