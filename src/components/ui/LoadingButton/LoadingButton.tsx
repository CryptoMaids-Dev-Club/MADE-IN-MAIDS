import { Loader2 } from 'lucide-react'

import { Button, ButtonProps } from '@/components/ui/Button'

type ButtonLoadingProps = ButtonProps & {
  loading: boolean
}

export function LoadingButton({ loading, ...props }: ButtonLoadingProps) {
  return (
    <Button {...props}>
      {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
      {props.children}
    </Button>
  )
}
