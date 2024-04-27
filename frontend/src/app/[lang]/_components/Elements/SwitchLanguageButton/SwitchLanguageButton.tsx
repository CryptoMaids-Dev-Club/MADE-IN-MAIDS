'use client'

import { usePathname, useRouter } from 'next/navigation'
import { availableLanguages } from '@/app/i18n/settings'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const SwitchLanguageButton = () => {
  const pathname = usePathname()
  const lang = pathname.match(/\/[a-z]{2}/)?.[0].slice(1) ?? availableLanguages[0]
  const pathWithoutLang = pathname.replace(/\/[a-z]{2}/, '')

  const router = useRouter()
  const handleSelect = (lang: string) => {
    router.push('/' + lang + pathWithoutLang)
  }

  return (
    <div className='select-none flex-row justify-center bg-black'>
      <div className='right-1 flex flex-row items-center '>
        <Select onValueChange={handleSelect} defaultValue={lang}>
          <SelectTrigger className='w-[60px]'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {availableLanguages.map((lang) => (
              <SelectItem key={lang} value={lang}>
                {lang.toUpperCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default SwitchLanguageButton
