import {StructureBuilder} from 'sanity/structure'
import { EditIcon, ChartUpwardIcon, EyeOpenIcon } from '@sanity/icons'
import { MdBarChart } from "react-icons/md";
import { FcHeatMap } from "react-icons/fc";
import {BarChartPreview, HeatmapPreview} from '../previews/charts'

const Charts = (S: StructureBuilder) =>
  S.listItem()
    .title('Charts')
    .icon(ChartUpwardIcon)
    .child(
      S.list()
        .title('Charts')
        .items([
          S.listItem()
            .title('Bar Charts')
            .icon(MdBarChart)
            .child(
              S.documentTypeList('chart.bar')
                .title('All Bar Charts')
                .child((documentId) =>
                  S.document()
                    .documentId(documentId)
                    .schemaType('chart.bar')
                    .views([
                      S.view.form().icon(EditIcon),
                      S.view.component(BarChartPreview).title('Preview').icon(EyeOpenIcon),
                    ]),
                ),
            ),
          S.listItem()
            .title('Heatmaps')
            .icon(FcHeatMap)
            .child(
              S.documentTypeList('chart.heatmap')
                .title('All Heatmaps')
                .child((documentId) =>
                  S.document()
                    .documentId(documentId)
                    .schemaType('chart.heatmap')
                    .views([
                      S.view.form().icon(EditIcon),
                      S.view.component(HeatmapPreview).title('Preview').icon(EyeOpenIcon),
                    ]),
                ),
            ),
        ]),
    )

export default Charts;
