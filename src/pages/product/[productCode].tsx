import { BuilderComponent, builder, Builder } from '@builder.io/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import getConfig from 'next/config'
import { useRouter } from 'next/router'

import { ProductDetailTemplate, ProductDetailSkeleton } from '@/components/page-templates'
import { ProductRecommendations } from '@/components/product'
import getCategoryTree from '@/lib/api/operations/get-category-tree'
import getProduct from '@/lib/api/operations/get-product'
import search from '@/lib/api/operations/get-product-search'
import { productGetters } from '@/lib/getters'
import type { CategorySearchParams, CategoryTreeResponse } from '@/lib/types'

import type { NextPage, GetStaticPropsContext } from 'next'

const { publicRuntimeConfig } = getConfig()
const builderIOApiKey = publicRuntimeConfig?.builderIO?.apiKey

builder.init(builderIOApiKey)

Builder.registerComponent(ProductRecommendations, {
  name: 'ProductRecommendations',
  inputs: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'productCodes',
      type: 'KiboCommerceProductsList',
    },
  ],
})

export async function getStaticProps(context: GetStaticPropsContext) {
  const { params, locale } = context
  const { productCode } = params as any
  const { serverRuntimeConfig } = getConfig()

  const product = await getProduct(productCode)
  const categoriesTree: CategoryTreeResponse = await getCategoryTree()

  const section = await builder
    .get('kibosection', { userAttributes: { slug: productCode } })
    .promise()

  return {
    props: {
      product,
      categoriesTree,
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
    revalidate: serverRuntimeConfig.revalidate,
  }
}

export async function getStaticPaths() {
  const { serverRuntimeConfig } = getConfig()
  const searchResponse = await search({
    pageSize: serverRuntimeConfig.pageSize,
  } as CategorySearchParams)
  const items = searchResponse?.data?.products?.items || []
  const paths: string[] = []
  items?.length &&
    items?.map((item: { productCode: string }) => paths.push(`/product/${item.productCode}`))
  return { paths, fallback: true }
}

const ProductDetailPage: NextPage = (props: any) => {
  const { product, section } = props
  const { isFallback } = useRouter()

  if (isFallback) {
    return <ProductDetailSkeleton />
  }

  const breadcrumbs = product ? productGetters.getBreadcrumbs(product) : []
  return (
    <>
      <ProductDetailTemplate product={product} breadcrumbs={breadcrumbs}>
        {section && <BuilderComponent model="pdpsection" content={section} />}
      </ProductDetailTemplate>
    </>
  )
}

export default ProductDetailPage
