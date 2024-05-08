import {CheckmarkCircleIcon, CloseCircleIcon} from '@sanity/icons'
import {Box, Code, Popover, Text} from '@sanity/ui'
import {useState} from 'react'
import {seoChecks} from './checks'

type Props = {
  checkName: string
  result: boolean
}

export const CheckResultCard = ({checkName, result}: Props) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false)

  const check = checkName in seoChecks ? seoChecks[checkName as keyof typeof seoChecks] : undefined

  if (!check) {
    return null
  }

  const checkPassed = result === check.expected

  let timerId: number | undefined = undefined
  const handleMouseEnter = () => {
    window.clearTimeout(timerId)
    setIsTooltipOpen(true)
  }

  const handleMouseLeave = () => {
    timerId = window.setTimeout(() => {
      setIsTooltipOpen(false)
    }, 150)
  }

  const handlePopoverMouseEnter = () => {
    window.clearTimeout(timerId)
  }

  if (result === null || result === undefined) {
    return null
  }

  return (
    <div
      style={{
        border: '1px solid var(--card-border-color)',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      <Popover
        open={isTooltipOpen}
        portal
        animate
        placement="right-start"
        onMouseEnter={handlePopoverMouseEnter}
        onMouseLeave={handleMouseLeave}
        content={
          <Box
            padding={2}
            style={{
              maxWidth: '32ch',
            }}
          >
            <Text muted size={1}>
              {check.description} Expected value:{' '}
              <Code style={{display: 'inline-block', verticalAlign: 'middle'}} size={1}>
                {check.expected.toString()}
              </Code>
              .
            </Text>
          </Box>
        }
      >
        <h3
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            color: checkPassed
              ? 'var(--card-badge-positive-fg-color)'
              : check.severity === 'warning'
                ? 'var(--card-badge-caution-fg-color)'
                : 'var(--card-badge-critical-fg-color)',
            backgroundColor: checkPassed
              ? 'var(--card-badge-positive-bg-color)'
              : check.severity === 'warning'
                ? 'var(--card-badge-caution-bg-color)'
                : 'var(--card-badge-critical-bg-color)',
            fontSize: '12px',
            margin: '0',
            padding: '8px',
            borderBottom: '1px solid var(--card-border-color)',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span>{check.label}</span>

          {checkPassed ? (
            <CheckmarkCircleIcon
              height={18}
              width={18}
              style={{
                transform: 'scale(1.25)',
              }}
            />
          ) : (
            <CloseCircleIcon
              height={18}
              width={18}
              style={{
                transform: 'scale(1.25)',
              }}
            />
          )}
        </h3>
      </Popover>

      <p
        style={{
          fontSize: '14px',
          margin: '0',
          padding: '8px',
          color: checkPassed
            ? 'var(--card-badge-default-fg-color)'
            : check.severity === 'warning'
              ? 'var(--card-badge-caution-fg-color)'
              : 'var(--card-badge-critical-fg-color)',
        }}
      >
        {typeof result === 'boolean' || typeof result === 'number' ? result.toString() : result}
      </p>
    </div>
  )
}
