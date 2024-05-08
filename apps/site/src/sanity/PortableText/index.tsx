import {PortableText, PortableTextReactComponents} from '@portabletext/react'
import {PremiumContentBlock} from './PremiumContent'
import {customBlockComponents} from './customComponents'
import {BarChart} from '@media-starter/charts'

const customComponents = (isMember: boolean): Partial<PortableTextReactComponents> => ({
  types: {
    ...customBlockComponents.types,
    premiumContent: (props) => <PremiumContentBlock isMember={isMember} {...props} />,
    barChart: (props: any) => {
      const {backgroundColorFrom, backgroundColorTo, barColor, xAxisKey, yAxisKey, verticalMargin, barPadding} = props.value.chart
      const fileUrl = props.value.chart.data.fileUrl

      return <BarChart
        width={500}
        height={400}
        backgroundColorFrom={backgroundColorFrom?.hex}
        backgroundColorTo={backgroundColorTo?.hex}
        barColor={barColor?.hex}
        xAxisKey={xAxisKey}
        yAxisKey={yAxisKey}
        csvFile={fileUrl}
        verticalMargin={verticalMargin}
        barPadding={barPadding}
      />
    },
  },
})

type Props = React.ComponentProps<typeof PortableText> & {
  isMember: boolean
}

export const CustomPortableText = ({isMember, ...props}: Props) => {
  return <PortableText {...props} components={customComponents(isMember)} />
}
