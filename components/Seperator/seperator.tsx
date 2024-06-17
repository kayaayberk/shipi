export default function Separator({ text }: { text: string }) {
  return (
    <div className='relative w-full'>
      <div className='relative flex items-center py-1'>
        <div className='grow border-t border-zinc-700'></div>
        <span className='mx-3 shrink text-sm leading-8 text-zinc-500'>{text}</span>
        <div className='grow border-t border-zinc-700'></div>
      </div>
    </div>
  )
}
