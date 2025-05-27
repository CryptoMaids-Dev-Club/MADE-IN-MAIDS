import Top from '@/app/[lang]/(features)/top/_components/Top'

const Page = async ({ params }: { params: { lang: string } }) => {
  const { lang } = params

  return <Top lang={lang} />
}

export default Page
