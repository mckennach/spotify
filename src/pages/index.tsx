import type { NextPageWithLayout } from './_app'

import Layout from '../components/Layout'
import NestedLayout from '../components/NestedLayout'

import { getServerSession } from 'next-auth';
import { authOptions } from "./api/auth/[...nextauth]"
import { useSession } from "next-auth/react"


const Index: NextPageWithLayout =  () => { 
  const { data: session, status } = useSession();
 
  return (
    <Layout> 
      <NestedLayout>
        <></>
      </NestedLayout>
    </Layout>
  )
}
 


export const getServerSideProps = async (context: any) => {
  const session = await getServerSession(context.req, context.res, authOptions)
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    }
  }
}




export default Index