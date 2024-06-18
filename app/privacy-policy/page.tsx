import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function PrivacyPolicy() {
  return (
    <div className='mx-auto w-full px-10 py-10 md:w-[600px] md:px-0'>
      <Link
        href='/'
        className='mb-10 flex max-w-min items-center gap-2 transition-transform duration-300 hover:scale-105'
      >
        <ArrowLeft size={14} /> Back
      </Link>
      <h1 className='mb-10 text-3xl font-bold'>Privacy Policy</h1>

      <p className='text-neutral-400'>
        Your privacy is important to us. It is Shipi.fyi&apos;s policy to respect your privacy
        regarding any information we may collect from you across our website, and other sites we own
        and operate.
        <br />
        <br />
        We only ask for personal information when we truly need it to provide a service to you. We
        collect it by fair and lawful means, with your knowledge and consent. We also let you know
        why we&apos;re collecting it and how it will be used.
        <br />
        <br />
        We collect and use your name and email address to communicate with you regarding the sign-up
        process and to send marketing emails if you have given consent.
        <br />
        <br />
        We only retain collected information for as long as necessary to provide you with your
        requested service. What data we store, we&apos;ll protect within commercially acceptable
        means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use,
        or modification.
        <br />
        <br />
        We don&apos;t share any personally identifying information publicly or with third parties,
        except when required to by law.
        <br />
        <br />
        We act in the capacity of a data controller and a data processor with regard to the personal
        data processed through Shipi.fyi and the services in terms of the applicable data protection
        laws, including the EU General Data Protection Regulation (GDPR).
        <br />
        <br />
        Our website may link to external sites that are not operated by us. Please be aware that we
        have no control over the content and practices of these sites, and cannot accept
        responsibility or liability for their respective privacy policies.
        <br />
        <br />
        You are free to refuse our request for your personal information, with the understanding
        that we may be unable to provide you with some of your desired services.
        <br />
        <br />
        Your continued use of our website will be regarded as acceptance of our practices around
        privacy and personal information.
      </p>
    </div>
  )
}
