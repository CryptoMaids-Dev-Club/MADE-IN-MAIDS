import { Loader2 } from 'lucide-react'

import { Button, type ButtonProps } from '@/components/ui/button'

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
