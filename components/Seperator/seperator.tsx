export default function Separator() {
  return (
    <div className='w-full relative'>
      <div className='relative flex items-center py-1'>
        <div className='grow border-t border-zinc-700'></div>
        <span className='mx-3 shrink text-sm leading-8 text-zinc-500'>Or sign in with</span>
        <div className='grow border-t border-zinc-700'></div>
      </div>
    </div>
  )
}
