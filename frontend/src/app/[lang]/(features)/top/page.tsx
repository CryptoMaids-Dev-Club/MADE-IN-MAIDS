import Top from '@/app/[lang]/(features)/top/_components/Top'

const Page = async (params: { params: Promise<{ lang: string }> }) => {
  const { lang } = await params.params

  return <Top lang={lang} />
}

export default Page
