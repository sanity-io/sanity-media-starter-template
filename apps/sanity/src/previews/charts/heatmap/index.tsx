import React, {useState, useEffect} from 'react'
import {Card} from '@sanity/ui'
import {UserViewComponent} from 'sanity/structure'
import {Heatmap} from '@media-starter/charts'
import {sanityClient} from '../../../sanityClient'

const fetchFileUrl = async (id: string): Promise<any> => {
  return sanityClient.fetch(`*[_id == '${id}'][0].url`)
}

export const HeatmapPreview: UserViewComponent = ({document}) => {
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
      <Heatmap
        width={600}
        height={400}
        jsonFile={fileUrl}
        colorRange={{
          min: displayed?.colorRange?.min?.hex || '#122549',
          max: displayed?.colorRange?.max?.hex || '#b4fbde',
        }}
        opacityRange={{
          min: displayed?.opacityRange?.min || 0.1,
          max: displayed?.opacityRange?.max || 0.9,
        }}
      />
    </Card>
  )
}
