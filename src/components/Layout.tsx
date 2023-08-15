import type { ReactNode } from 'react'
 
const Layout = ({ children }: { children: ReactNode}) => {
 
  return (
    <>
      <main className="bg-neutral-900 min-w-[385px]">{children}</main>
    </>
  )
}

export default Layout;