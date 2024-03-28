import {Button, Badge, Heading} from '@sanity/ui'

type Props = {
  title: string
  badge?: string
  action?: {
    title: string
    onClick: () => void
    icon?: React.ReactNode
  }
}

export const PreflightSectionHeading = ({title, badge, action}: Props) => {
  return (
    <div
      style={{
        marginBottom: '8px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Heading as="h2" size={1}>
        {title}
        {badge && <Badge style={{verticalAlign: 'middle', marginLeft: 8}}>{badge}</Badge>}
      </Heading>

      {action && (
        <Button
          onClick={action.onClick}
          style={{marginLeft: 'auto'}}
          text={action.title}
          tone="default"
          mode="ghost"
          icon={action.icon}
          fontSize={1}
        />
      )}
    </div>
  )
}
