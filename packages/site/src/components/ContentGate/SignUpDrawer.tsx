import {SignUpForm} from './SignUpForm'

type Props = {
  isPremium: boolean
}

export const SignUpDrawer = ({isPremium}: Props) => {
  return (
    <div className="animate-slide-up translate-y-full px-5 pt-5 pb-6 bg-brand text-white text-center fixed bottom-0 w-screen inset-x-0 flex justify-center flex-col gap-2">
      <h2 className="text-white m-0 text-3xl font-title leading-none mb-2">
        {isPremium
          ? 'This is a member exclusive article.'
          : 'You’ve reached your limit of 3 free articles this month.'}
        <br />
      </h2>

      <p className="text-white text-lg leading-tight">
        Sign up for unlimited access to all articles, premium content, and other exclusive perks.
      </p>

      <SignUpForm  />
    </div>
  )
}
