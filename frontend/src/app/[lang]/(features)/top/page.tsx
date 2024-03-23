import Top from '@/app/[lang]/(features)/top/_components/Top'

const Page = ({ params }: { params: { lang: string } }) => {
  const lang = params.lang

  return <Top lang={lang} />
}

export default Page
