import { getLotteryInfo } from '@/app/[lang]/(features)/lottery/_api/query'
import LotteryInfoCard from '@/app/[lang]/(features)/lottery/_components/LotteryCard'

const LotteryList = async () => {
  const lotteryInfos = await getLotteryInfo()

  return (
    <div className='box-border rounded-2xl border-4 border-dashed border-pink-500 p-4'>
      <div className='grid grid-cols-1 items-center justify-center gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {lotteryInfos.reverse().map((lotteryInfo, index) => (
          <div key={index}>
            <LotteryInfoCard lotteryId={index} lotteryInfo={lotteryInfo} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default LotteryList
