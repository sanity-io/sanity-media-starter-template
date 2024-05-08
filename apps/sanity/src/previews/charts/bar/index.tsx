import React, {useState, useEffect} from 'react'
import {Card} from '@sanity/ui'
import {UserViewComponent} from 'sanity/structure'
import {BarChart} from '@media-starter/charts'
import {sanityClient} from '../../../sanityClient'

const fetchFileUrl = async (id: string): Promise<any> => {
  return sanityClient.fetch(`*[_id == '${id}'][0].url`)
}

export const BarChartPreview: UserViewComponent = ({document}) => {
  const {displayed}: any = document
  const [fileUrl, setFileUrl] = useState<any | null>()

    /** TODO: Style empty state **/
  if (!displayed._id) {
    return <Card></Card>
  }
  useEffect(() => {
    if (displayed?.data?.asset?._ref) {
      fetchFileUrl(displayed.data.asset._ref).then((result) => {
        setFileUrl(result)
      })
    }
  }, [displayed?.data?.asset?._ref])

  return (
    <Card padding={6}>
      <BarChart
        width={500}
        height={400}
        backgroundColorFrom={displayed.backgroundColorFrom?.hex}
        backgroundColorTo={displayed.backgroundColorTo?.hex}
        barColor={displayed.barColor?.hex}
        xAxisKey={displayed.xAxisKey}
        yAxisKey={displayed.yAxisKey}
        csvFile={fileUrl}
        verticalMargin={displayed.verticalMargin}
        barPadding={displayed.barPadding}
      />
    </Card>
  )
}
