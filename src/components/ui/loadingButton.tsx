import { Loader2 } from 'lucide-react'

import { Button, ButtonProps } from '@/components/ui/button'

type ButtonLoadingProps = ButtonProps & {
  loading: boolean
}

export function ButtonLoading({ loading, ...props }: ButtonLoadingProps) {
  return (
    <Button {...props}>
      {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
      Please wait
    </Button>
  )
}
