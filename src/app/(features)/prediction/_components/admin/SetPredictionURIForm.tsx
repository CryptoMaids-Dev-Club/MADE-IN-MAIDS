'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LoadingButton } from '@/components/ui/loading-button'
import { maidsPredictionContractConfig } from '@/config/client'
import { useDebounce } from '@/hooks/useDebounce'

const schema = z.object({
  predictionURI: z.string().url(),
})
type FormSchema = z.infer<typeof schema>

type SetPredictionURIFormProps = {
  id: number
}

const SetPredictionURIForm = ({ id }: SetPredictionURIFormProps) => {
  const [predictionURI, setPredictionURI] = useState('')
  const debouncePredictionURI = useDebounce(predictionURI, 500)

  const setPredictionURIConfig = usePrepareContractWrite({
    ...maidsPredictionContractConfig,
    functionName: 'setPredictionURI',
    args: [id, debouncePredictionURI],
  }).config
  const writePredictionURI = useContractWrite({ ...setPredictionURIConfig })
  const writePredictionURITx = useWaitForTransaction({
    hash: writePredictionURI.data?.hash,
  })

  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => writePredictionURI.write?.())} className='w-56'>
        <FormField
          control={form.control}
          name='predictionURI'
          render={({ field }) => (
            <FormItem>
              <FormLabel>PredictionURI</FormLabel>
              <FormControl>
                <Input {...field} onChange={(event) => setPredictionURI(event.target.value)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton loading={writePredictionURI.isLoading || writePredictionURITx.isLoading}>
          Set PredictionURI
        </LoadingButton>
      </form>
    </Form>
  )
}

export default SetPredictionURIForm
