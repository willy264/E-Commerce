import FormattedPrice from './FormattedPrice'
import { twMerge } from 'tailwind-merge'

const PriceTag = ({regularPrice, discountedPrice, className}) => {
  return (
    <div className={twMerge("flex items-center gap-2", className)}>
      <p className="line-through text-gray-500 font-medium">
        <FormattedPrice amount={regularPrice} />
      </p>
      <p className="font-bold text-skyText">
        <FormattedPrice amount={discountedPrice} />
      </p>
    </div>
  )
}

export default PriceTag