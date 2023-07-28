import type { ReleaseNote } from '../utils/types'
import rnv241 from './images/release_note_v24_1.webp'
import rnv242 from './images/release_note_v24_2.webp'
import rnv23 from './images/release_note_v23.webp'
import rnv22 from './images/release_note_v22.webp'
import rnv21 from './images/release_note_v21.webp'
import rnv20 from './images/release_note_v20.webp'
import rnv19 from './images/release_note_v19.webp'

const releaseNotes: Array<ReleaseNote> = [
  {
    version: '2.4.0',
    isMostRecent: true,
    title: [
      'UI Color palette 24: Create Color System “like a Pro”',
      'UI Color palette 24: Color themes management “like a Pro”',
    ],
    image: [rnv241, rnv242],
    content: [
      'UI Color Palette allows you to create freely accessible color palettes. However, the Pro plan offers additional features such as color themes, more export options, and the ability to create variables that can transform your color palette into a color system. Are you ready to try it out?',
      'With the Pro plan, you can manage color themes within the same palette, enabling you to create as many variations of lightness scales as needed to build your color system. This feature is useful for managing both light and dark mode themes.',
    ],
    numberOfNotes: 2,
    learnMore: ['https://uicp.link/whats-new', 'https://uicp.link/whats-new'],
  },
  {
    version: '2.3.0',
    isMostRecent: false,
    title: ['UI Color Palette 23 says welcome to Color spaces'],
    image: [rnv23],
    content: [
      'Color spaces can be managed throughout the UI Color Palette. This allows you to select and switch between a variety of color spaces such as LCH, OKLCH, LAB, OKLAB, and HSL.',
    ],
    numberOfNotes: 1,
    learnMore: ['https://uicp.link/whats-new', 'https://uicp.link/whats-new'],
  },
  {
    version: '2.2.0',
    isMostRecent: false,
    title: ['UI Color Palette 22 update highlight'],
    image: [rnv22],
    content: [
      'Newly extended to Figjam, the UI Color Palette plugin empowers designers to create and customize their UI color schemes at the start of the design process, providing greater flexibility to their workflow and enhancing their creative potential.',
    ],
    numberOfNotes: 1,
    learnMore: ['https://uicp.link/whats-new', 'https://uicp.link/whats-new'],
  },
  {
    version: '2.1.0',
    isMostRecent: false,
    title: ['UI Color Palette 21 update highlight'],
    image: [rnv21],
    content: [
      "Enhance your palette customization by editing the text colors used for the contrast score, surpassing the restrictions of using pure black and white. This ensures that your palette remains accessible, aligns with your brand's style, and complies with the WCAG and APCA standards.",
    ],
    numberOfNotes: 1,
    learnMore: ['https://uicp.link/whats-new', 'https://uicp.link/whats-new'],
  },
  {
    version: '2.0.0',
    isMostRecent: false,
    title: ['UI Color Palette 20 update highlight'],
    image: [rnv20],
    content: [
      "The color shades generation has been updated to improve the consistency of your palette's lightness and saturation. The new algorithm is automatically used for new palettes, and can be enabled for existing palettes in the settings.",
    ],
    numberOfNotes: 1,
    learnMore: ['https://uicp.link/whats-new', 'https://uicp.link/whats-new'],
  },
  {
    version: '1.9.0',
    isMostRecent: false,
    title: ['UI Color Palette 19 update highlight'],
    image: [rnv19],
    content: [
      'Automatically identify the closest color shade to the source color when editing a palette. This feature aims to obtain the sRGB version of the source color that may not be natively within the gamut, making it easier to use in your UI.',
    ],
    numberOfNotes: 1,
    learnMore: ['https://uicp.link/whats-new', 'https://uicp.link/whats-new'],
  },
]

export default releaseNotes
