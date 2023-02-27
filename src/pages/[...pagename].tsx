import { BuilderComponent, builder } from '@builder.io/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import getConfig from 'next/config'

import getCategoryTree from '@/lib/api/operations/get-category-tree'
import type { CategoryTreeResponse } from '@/lib/types'

import type { GetServerSidePropsContext } from 'next'

const { publicRuntimeConfig } = getConfig()
const apiKey = publicRuntimeConfig?.builderIO?.apiKey

builder.init(apiKey)

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale } = context

  const pathnameArr = context.params?.pagename

  let pagename
  if (Array.isArray(pathnameArr) && pathnameArr?.length > 1) {
    pagename = pathnameArr.join('/')
  } else {
    pagename = pathnameArr
  }

  const categoriesTree: CategoryTreeResponse = await getCategoryTree()

  const page = await builder
    .get('page', {
      userAttributes: {
        urlPath: `/${pagename}`,
      },
    })
    .toPromise()

  return {
    props: {
      page: page || null,
      categoriesTree,
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const PageNotFound = () => {
  return (
    <div
      style={{
        height: '300px',
        color: 'red',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1>Page not found (404)</h1>
    </div>
  )
}

const Page = (props: any) => {
  const { page } = props

  return <div>{page ? <BuilderComponent model="page" content={page} /> : <PageNotFound />}</div>
}

export default Page
