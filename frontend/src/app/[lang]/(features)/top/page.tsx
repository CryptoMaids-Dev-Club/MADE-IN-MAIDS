import Top from '@/app/[lang]/(features)/top/_components/Top'

const Page = async (props: { params: Promise<{ lang: string }> }) => {
  const { lang } = await props.params

  return <Top lang={lang} />
}

export default Page
