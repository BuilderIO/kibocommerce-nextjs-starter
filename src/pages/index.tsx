import { BuilderComponent, builder } from '@builder.io/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import getConfig from 'next/config'

import { FullWidthLayout } from '@/components/layout'
import getCategoryTree from '@/lib/api/operations/get-category-tree'
import type { CategoryTreeResponse, NextPageWithLayout } from '@/lib/types'

import type { GetServerSidePropsContext } from 'next'

interface HomePageProps {
  homepage: any
}

const { publicRuntimeConfig } = getConfig()
const apiKey = publicRuntimeConfig?.builderIO?.apiKey

builder.init(apiKey)


export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale } = context
  const categoriesTree: CategoryTreeResponse = await getCategoryTree()

  const homepage = await builder
    .get('homepage', {
      options: {
        includeUnpublished: true
      },
      userAttributes: {
        urlPath: '/',
      },
    })
    .toPromise()
  return {
    props: {
      homepage: homepage || null,
      categoriesTree: categoriesTree || null,
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const Home: NextPageWithLayout<HomePageProps> = (props) => {
  const { homepage } = props
  return (
    <>
      <BuilderComponent model="homepage" content={homepage} />
    </>
  )
}

Home.getLayout = FullWidthLayout

export default Home
