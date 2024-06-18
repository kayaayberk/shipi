import { Icons } from '../Icons/icons'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

const AvatarImages = [
  {
    src: '/Avatars/Avatar1.jpeg',
    alt: 'Avatar 1'
  },
  {
    src: '/Avatars/Avatar2.jpeg',
    alt: 'Avatar 2'
  },
  {
    src: '/Avatars/Avatar3.jpeg',
    alt: 'Avatar 3'
  },
  {
    src: '/Avatars/Avatar5.jpeg',
    alt: 'Avatar 5'
  },
  {
    src: '/Avatars/Avatar4.jpeg',
    alt: 'Avatar 4'
  }
]

export default function Reviews() {
  return (
    <div className='flex flex-col w-full items-center lg:items-start gap-3'>
      <div className='flex max-w-min -space-x-6 rtl:space-x-reverse'>
        {AvatarImages.map((avatar, index) => (
          <Avatar className='h-12 w-12 border' key={index + avatar.src}>
            <AvatarImage
              src={avatar.src}
              alt={avatar.alt}
              className='object-cover'
              width={48}
              height={48}
            />
            <AvatarFallback>SH</AvatarFallback>
          </Avatar>
        ))}
      </div>
      <div className='flex flex-col gap-4 items-center lg:items-start'>
        <div className='flex gap-1'>
          {Array.from({ length: 5 }).map((_, index) => (
            <Icons.Star key={index} className='size-6 text-[#EAB30B]' fill='#EAB30B'  />
          ))}
        </div>
        <div>
          <span className='flex items-center gap-1 leading-none'>98 developers already started using Shipi</span>
        </div>
      </div>
    </div>
  )
}
