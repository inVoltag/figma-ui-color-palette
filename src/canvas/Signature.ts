import Tag from './Tag'
import { lang, locals } from '../content/locals'

export default class Signature {
  nodeInfo: FrameNode | null
  nodeLogotype: FrameNode | null
  nodeVector: VectorNode | null
  node: FrameNode | null

  constructor() {
    this.nodeInfo = null
    this.nodeLogotype = null
    this.nodeVector = null
    this.node = null
  }

  makeNodeInfo = () => {
    // base
    this.nodeInfo = figma.createFrame()
    this.nodeInfo.name = '_info'
    this.nodeInfo.fills = []

    // layout
    this.nodeInfo.layoutMode = 'VERTICAL'
    this.nodeInfo.layoutSizingHorizontal = 'HUG'
    this.nodeInfo.layoutSizingVertical = 'HUG'
    this.nodeInfo.itemSpacing = 4

    // insert
    this.nodeInfo.appendChild(
      new Tag('_tagline', locals[lang].tagline, 10).makeNodeTag()
    )
    this.nodeInfo.appendChild(
      new Tag(
        '_url',
        locals[lang].url,
        8,
        'https://ui-color-palette.com'
      ).makeNodeTag()
    )

    return this.nodeInfo
  }

  makeNodeLogotype = () => {
    // base
    this.nodeLogotype = figma.createFrame()
    this.nodeLogotype.name = '_logotype'
    this.nodeLogotype.fills = [
      {
        type: 'SOLID',
        opacity: 0.5,
        color: {
          r: 1,
          g: 1,
          b: 1,
        },
      },
    ]
    this.nodeLogotype.cornerRadius = 8

    // layout
    this.nodeLogotype.layoutMode = 'HORIZONTAL'
    this.nodeLogotype.layoutSizingHorizontal = 'HUG'
    this.nodeLogotype.layoutSizingVertical = 'HUG'
    this.nodeLogotype.horizontalPadding = 8
    this.nodeLogotype.verticalPadding = 4

    // insert
    this.nodeLogotype.appendChild(this.makeNodeVector())

    return this.nodeLogotype
  }

  makeNodeVector = () => {
    // base
    this.nodeVector = figma.createVector()
    this.nodeVector.name = '_vector'
    this.nodeVector.fills = [
      {
        type: 'SOLID',
        color: {
          r: 0 / 255,
          g: 39 / 255,
          b: 47 / 255,
        },
      },
    ]
    this.nodeVector.strokeAlign = 'OUTSIDE'
    this.nodeVector.vectorPaths = [
      {
        windingRule: 'EVENODD',
        data: 'M 181.60000610351562 97.23200225830078 C 175.7760066986084 97.23200225830078 170.69866371154785 96.03733611106873 166.3679962158203 93.64800262451172 C 162.0373296737671 91.25866913795471 158.6773281097412 87.89866781234741 156.28799438476562 83.56800079345703 C 153.8986611366272 79.23733377456665 152.70399475097656 74.15999794006348 152.70399475097656 68.33599853515625 L 152.70399475097656 17.599994659423828 L 171.96800231933594 17.599994659423828 L 171.96800231933594 68.33599853515625 C 171.96800231933594 71.8453323841095 172.82667291164398 74.6826663017273 174.54400634765625 76.8479995727539 C 176.26133978366852 78.93866610527039 178.61334013938904 79.98400115966797 181.60000610351562 79.98400115966797 C 184.5866720676422 79.98400115966797 186.93867242336273 78.93866610527039 188.656005859375 76.8479995727539 C 190.37333929538727 74.6826663017273 191.23199462890625 71.8453323841095 191.23199462890625 68.33599853515625 L 191.23199462890625 17.599994659423828 L 210.49600219726562 17.599994659423828 L 210.49600219726562 68.33599853515625 C 210.49600219726562 74.15999794006348 209.30133628845215 79.23733377456665 206.91200256347656 83.56800079345703 C 204.52266883850098 87.89866781234741 201.1626672744751 91.25866913795471 196.83200073242188 93.64800262451172 C 192.5759997367859 96.03733611106873 187.49867248535156 97.23200225830078 181.60000610351562 97.23200225830078 Z',
      },
      {
        windingRule: 'EVENODD',
        data: 'M 225.6842498779297 96 L 225.6842498779297 79.87200164794922 L 244.7242431640625 79.87200164794922 L 244.7242431640625 33.72799301147461 L 225.6842498779297 33.72799301147461 L 225.6842498779297 17.599994659423828 L 283.02825927734375 17.599994659423828 L 283.02825927734375 33.72799301147461 L 263.9882507324219 33.72799301147461 L 263.9882507324219 79.87200164794922 L 283.02825927734375 79.87200164794922 L 283.02825927734375 96 L 225.6842498779297 96 Z',
      },
      {
        windingRule: 'EVENODD',
        data: 'M 328.23248291015625 97.23200225830078 C 322.3338165283203 97.23200225830078 316.9951581954956 95.66400003433228 312.21649169921875 92.52799987792969 C 307.5124912261963 89.39199948310852 303.7418439388275 84.83733224868774 300.9045104980469 78.86399841308594 C 298.14184403419495 72.81599855422974 296.760498046875 65.46132946014404 296.760498046875 56.79999542236328 C 296.760498046875 48.138662338256836 298.14184403419495 40.82133150100708 300.9045104980469 34.847999572753906 C 303.7418439388275 28.799997329711914 307.5124912261963 24.207996368408203 312.21649169921875 21.071996688842773 C 316.9951581954956 17.935997009277344 322.3338165283203 16.367996215820312 328.23248291015625 16.367996215820312 C 332.9364848136902 16.367996215820312 337.3044877052307 17.413331270217896 341.33648681640625 19.503997802734375 C 345.3684883117676 21.594664335250854 348.80316829681396 24.65599822998047 351.6405029296875 28.687999725341797 C 354.55250096321106 32.645331144332886 356.6058419942856 37.49866247177124 357.8005065917969 43.24799728393555 L 340.88848876953125 47.615997314453125 C 340.21649074554443 42.91199541091919 338.723176240921 39.402663230895996 336.40850830078125 37.08799743652344 C 334.1685082912445 34.69866371154785 331.62984347343445 33.503997802734375 328.7925109863281 33.503997802734375 C 326.40317726135254 33.503997802734375 324.23784387111664 34.287996888160706 322.2965087890625 35.85599899291992 C 320.4298428297043 37.423996567726135 318.93649780750275 39.92532992362976 317.8164978027344 43.3599967956543 C 316.696497797966 46.7199981212616 316.1365051269531 51.19999647140503 316.1365051269531 56.79999542236328 C 316.1365051269531 62.3253288269043 316.696497797966 66.8053297996521 317.8164978027344 70.23999786376953 C 318.93649780750275 73.67466378211975 320.4298428297043 76.17600238323212 322.2965087890625 77.74400329589844 C 324.23784387111664 79.31200313568115 326.40317726135254 80.09600067138672 328.7925109863281 80.09600067138672 C 331.62984347343445 80.09600067138672 334.1685082912445 78.93866753578186 336.40850830078125 76.6240005493164 C 338.723176240921 74.23466682434082 340.21649074554443 70.68800067901611 340.88848876953125 65.98400115966797 L 357.8005065917969 70.35199737548828 C 356.6058419942856 76.02666425704956 354.55250096321106 80.88000202178955 351.6405029296875 84.91200256347656 C 348.80316829681396 88.94400310516357 345.3684883117676 92.00533390045166 341.33648681640625 94.09600067138672 C 337.3044877052307 96.18666744232178 332.9364848136902 97.23200225830078 328.23248291015625 97.23200225830078 Z',
      },
      {
        windingRule: 'EVENODD',
        data: 'M 372.6527404785156 96 L 372.6527404785156 17.599994659423828 L 402.5567626953125 17.599994659423828 C 408.15676403045654 17.599994659423828 413.0100932121277 18.719996690750122 417.11676025390625 20.959999084472656 C 421.29809522628784 23.199996948242188 424.50875091552734 26.2613308429718 426.7487487792969 30.144001007080078 C 429.06341671943665 34.02666664123535 430.22076416015625 38.46933317184448 430.22076416015625 43.47200012207031 C 430.22076416015625 48.17599964141846 429.06341671943665 52.43199801445007 426.7487487792969 56.23999786376953 C 424.50875091552734 60.04799771308899 421.29809522628784 63.071996450424194 417.11676025390625 65.31199645996094 C 413.0100932121277 67.55199646949768 408.15676403045654 68.6719970703125 402.5567626953125 68.6719970703125 L 391.916748046875 68.6719970703125 L 391.916748046875 96 L 372.6527404785156 96 Z M 391.916748046875 53.21599578857422 L 399.1967468261719 53.21599578857422 C 403.07941460609436 53.21599578857422 405.95410311222076 52.28266525268555 407.8207702636719 50.41600036621094 C 409.7621030807495 48.4746652841568 410.7327575683594 46.122663497924805 410.7327575683594 43.3599967956543 C 410.7327575683594 40.522664308547974 409.7621030807495 38.17066252231598 407.8207702636719 36.303993225097656 C 405.95410311222076 34.43732833862305 403.07941460609436 33.503997802734375 399.1967468261719 33.503997802734375 L 391.916748046875 33.503997802734375 L 391.916748046875 53.21599578857422 Z',
      },
      {
        windingRule: 'EVENODD',
        data: 'M 24.571428298950195 0 C 10.959449768066406 0 0 11.145122528076172 0 24.799999237060547 L 0 87.19999694824219 C 0 100.85487365722656 10.959450721740723 112 24.571430206298828 112 L 79.42857360839844 112 C 93.0405502319336 112 104 100.85487365722656 104 87.19999694824219 L 104 24.799999237060547 C 104 11.145124435424805 93.0405502319336 0 79.42857360839844 0 L 24.571428298950195 0 Z M 8 24.799999237060547 C 8 15.479829788208008 15.460837364196777 8 24.571428298950195 8 L 34 8 L 34 28 C 30.686290740966797 28 28 30.68629264831543 28 34 L 28 38 L 8 38 L 8 24.799999237060547 Z M 28 42 L 8 42 L 8 70 L 28 70 L 28 42 Z M 28 74 L 8 74 L 8 87.19999694824219 C 8 96.52017211914062 15.460838317871094 104 24.571430206298828 104 L 34 104 L 34 84 C 30.686290740966797 84 28 81.31370544433594 28 78 L 28 74 Z M 38 84 L 38 104 L 66 104 L 66 84 L 38 84 Z M 38 28 L 66 28 L 66 8 L 38 8 L 38 28 Z M 70 28 C 73.31370544433594 28 76 30.686290740966797 76 34 L 76 38 L 96 38 L 96 24.799999237060547 C 96 15.47983169555664 88.5391616821289 8 79.42857360839844 8 L 70 8 L 70 28 Z M 76 42 L 76 70 L 96 70 L 96 42 L 76 42 Z M 76 74 L 76 78 C 76 81.31370544433594 73.31370544433594 84 70 84 L 70 104 L 79.42857360839844 104 C 88.5391616821289 104 96 96.52017211914062 96 87.19999694824219 L 96 74 L 76 74 Z',
      },
    ]
    this.nodeVector.rescale(1 / 4)

    return this.nodeVector
  }

  makeNode = () => {
    // base
    this.node = figma.createFrame()
    this.node.name = '_signature'
    this.node.fills = []

    // layout
    this.node.layoutMode = 'HORIZONTAL'
    this.node.primaryAxisSizingMode = 'FIXED'
    this.node.counterAxisSizingMode = 'AUTO'
    this.node.layoutAlign = 'STRETCH'
    this.node.primaryAxisAlignItems = 'SPACE_BETWEEN'

    // insert
    this.node.appendChild(this.makeNodeInfo())
    this.node.appendChild(this.makeNodeLogotype())

    return this.node
  }
}
