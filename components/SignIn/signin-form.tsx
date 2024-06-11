import EmailSignin from './email-singin'
import OauthSignIn from './oauth-singin'

export default function SignInForm() {
  return (
    <div>
      <OauthSignIn />
      <EmailSignin />
    </div>
  )
}
