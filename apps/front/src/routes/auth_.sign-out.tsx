import { useToken } from '@/hooks/useToken'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/auth_/sign-out')({
  preload: false,
  component: RouteComponent,
  loader: ({ context }) => {
    useToken.getState().clearTokens()
    context.queryClient.clear()
    return redirect({ to: '/', replace: true })
  },
})

function RouteComponent() {
  return <div />
}
