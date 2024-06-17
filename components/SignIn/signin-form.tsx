import EmailSignin from './email-singin'
import OauthSignIn from './oauth-singin'
import MainLogo from '@/public/MainLogo.png'
import Separator from '../Seperator/seperator'
import Image from 'next/image'
export default function SignInForm() {
  return (
    <div className='flex w-full flex-col items-center gap-5 p-8'>
      <Image src={MainLogo} alt='Shipi.fyi Logo' width={200} height={200} />
      <EmailSignin />
      <Separator text='Or sign in with' />
      <OauthSignIn />
    </div>
  )
}
