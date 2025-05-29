import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import Top from '@/app/[lang]/(features)/top/_components/Top'

const Page = async (props: { params: Promise<{ lang: string }> }) => {
  const { lang } = await props.params

  return (
    <Suspense fallback={<Skeleton className="h-40 w-full" />}>
      <Top lang={lang} />
    </Suspense>
  )
}

export default Page
