import type { Feature } from './types'

const features: Array<Feature> = [
  {
    name: 'ONBOARDING',
    description: 'Onboarding service when the selection is empty',
    isActive: true,
    isPro: false,
    type: 'SERVICE',
    service: [],
  },
  {
    name: 'CREATE',
    description: 'Palette creation service when several colors are selected',
    isActive: true,
    isPro: false,
    type: 'SERVICE',
    service: [],
  },
  {
    name: 'EDIT',
    description: 'Palette configuration service when the palette is selected',
    isActive: true,
    isPro: false,
    type: 'SERVICE',
    service: [],
  },
  {
    name: 'HIGHLIGHT',
    description: 'Release note that highlights the key feature',
    isActive: true,
    isPro: false,
    type: 'DIVISION',
    service: ['ONBOARD', 'CREATE', 'EDIT'],
  },
  {
    name: 'SHORTCUTS',
    description: 'Quick links and access',
    isActive: true,
    isPro: false,
    type: 'DIVISION',
    service: ['ONBOARD', 'CREATE', 'EDIT'],
  },
  {
    name: 'PROPERTIES',
    description: 'Shades information and WCAG scores',
    isActive: true,
    isPro: false,
    type: 'ACTION',
    service: ['CREATE', 'EDIT'],
  },
  {
    name: 'VIEWS',
    description: 'Different types of information arrangement',
    isActive: true,
    isPro: false,
    type: 'DIVISION',
    service: ['CREATE', 'EDIT'],
  },
  {
    name: 'VIEWS_PALETTE',
    description: 'Palette view',
    isActive: true,
    isPro: false,
    type: 'ACTION',
    service: ['CREATE', 'EDIT'],
  },
  {
    name: 'VIEWS_PALETTE_WITH_PROPERTIES',
    description: 'Detailed palette view',
    isActive: true,
    isPro: false,
    type: 'ACTION',
    service: ['CREATE', 'EDIT'],
  },
  {
    name: 'VIEWS_SHEET',
    description: 'Detailed color sheet view',
    isActive: true,
    isPro: true,
    type: 'ACTION',
    service: ['CREATE', 'EDIT'],
  },
  {
    name: 'CREATE_PALETTE',
    description: 'Generate a palette',
    isActive: true,
    isPro: false,
    type: 'ACTION',
    service: ['CREATE'],
  },
  {
    name: 'LOCAL_STYLES',
    description: 'Manage local styles in the document',
    isActive: true,
    isPro: false,
    type: 'ACTION',
    service: ['EDIT'],
  },
  {
    name: 'SYNC_LOCAL_STYLES',
    description: 'Sync local styles in the document',
    isActive: true,
    isPro: false,
    type: 'ACTION',
    service: ['EDIT'],
  },
  {
    name: 'LOCAL_VARIABLES',
    description: 'Manage local variable in the document',
    isActive: true,
    isPro: true,
    type: 'ACTION',
    service: ['EDIT'],
  },
  {
    name: 'SYNC_LOCAL_VARIABLES',
    description: 'Sync local variables in the document',
    isActive: true,
    isPro: true,
    type: 'ACTION',
    service: ['EDIT'],
  },
  {
    name: 'SCALE',
    description: 'Lightness scale configuration',
    isActive: true,
    isPro: false,
    type: 'CONTEXT',
    service: ['CREATE', 'EDIT'],
  },
  {
    name: 'SCALE_PRESETS',
    description: 'List of existing color systems',
    isActive: true,
    isPro: true,
    type: 'ACTION',
    service: ['CREATE'],
  },
  {
    name: 'PRESET_MATERIAL',
    description: 'Material color system',
    isActive: true,
    isPro: true,
    type: 'ACTION',
    service: ['CREATE'],
  },
  {
    name: 'PRESET_ANT',
    description: 'Ant Design color system',
    isActive: true,
    isPro: false,
    type: 'ACTION',
    service: ['CREATE'],
  },
  {
    name: 'PRESET_ADS',
    description: 'ADS Foundation color system',
    isActive: true,
    isPro: true,
    type: 'ACTION',
    service: ['CREATE'],
  },
  {
    name: 'PRESET_ADS_NEUTRAL',
    description: 'ADS Foundation Neutral color system',
    isActive: true,
    isPro: true,
    type: 'ACTION',
    service: ['CREATE'],
  },
  {
    name: 'PRESET_CARBON',
    description: 'Carbon color system',
    isActive: true,
    isPro: true,
    type: 'ACTION',
    service: ['CREATE'],
  },
  {
    name: 'PRESET_BASE',
    description: 'Uber color system',
    isActive: true,
    isPro: true,
    type: 'ACTION',
    service: ['CREATE'],
  },
  {
    name: 'PRESET_CUSTOM',
    description: 'Custom color system',
    isActive: true,
    isPro: false,
    type: 'ACTION',
    service: ['CREATE'],
  },
  {
    name: 'SCALE_CONFIGURATION',
    description: 'The lightness stops on a range slider',
    isActive: true,
    isPro: false,
    type: 'ACTION',
    service: ['CREATE', 'EDIT'],
  },
  {
    name: 'SCALE_TIPS',
    description:
      'Tip message to ONBOARD users about how to configure the lightness scale',
    isActive: true,
    isPro: false,
    type: 'DIVISION',
    service: ['CREATE', 'EDIT'],
  },
  {
    name: 'COLORS',
    description: 'Source colors configuration',
    isActive: true,
    isPro: false,
    type: 'CONTEXT',
    service: ['EDIT'],
  },
  {
    name: 'COLORS_NAME',
    description: 'Source color name',
    isActive: true,
    isPro: false,
    type: 'ACTION',
    service: ['EDIT'],
  },
  {
    name: 'COLORS_PARAMS',
    description: 'Source color parameters (hex and lch)',
    isActive: true,
    isPro: false,
    type: 'ACTION',
    service: ['EDIT'],
  },
  {
    name: 'COLORS_HUE_SHIFTING',
    description: 'Source color hue shifting number',
    isActive: true,
    isPro: false,
    type: 'ACTION',
    service: ['EDIT'],
  },
  {
    name: 'COLORS_DESCRIPTION',
    description: 'Source color description of the purpose',
    isActive: true,
    isPro: false,
    type: 'ACTION',
    service: ['EDIT'],
  },
  {
    name: 'THEMES',
    description: 'Color themes configuration',
    isActive: true,
    isPro: true,
    type: 'CONTEXT',
    service: ['EDIT'],
  },
  {
    name: 'THEMES_NAME',
    description: 'Color theme name',
    isActive: true,
    isPro: false,
    type: 'ACTION',
    service: ['EDIT'],
  },
  {
    name: 'THEMES_PARAMS',
    description: 'Palette background related to the theme',
    isActive: true,
    isPro: false,
    type: 'ACTION',
    service: ['EDIT'],
  },
  {
    name: 'THEMES_DESCRIPTION',
    description: 'Color theme description of the purpose',
    isActive: true,
    isPro: false,
    type: 'ACTION',
    service: ['EDIT'],
  },
  {
    name: 'EXPORT',
    description: 'Palette export options',
    isActive: true,
    isPro: false,
    type: 'CONTEXT',
    service: ['EDIT'],
  },
  {
    name: 'EXPORT_JSON',
    description: 'Palette export to JSON',
    isActive: true,
    isPro: false,
    type: 'ACTION',
    service: ['EDIT'],
  },
  {
    name: 'EXPORT_JSON_AMZN_STYLE_DICTIONARY',
    description: 'Palette export for the Amazon Style Dictionary',
    isActive: true,
    isPro: true,
    type: 'ACTION',
    service: ['EDIT'],
  },
  {
    name: 'EXPORT_JSON_TOKENS_STUDIO',
    description: 'Palette export to the Tokens Studio plugin',
    isActive: true,
    isPro: true,
    type: 'ACTION',
    service: ['EDIT'],
  },
  {
    name: 'EXPORT_CSS',
    description: 'Palette export to CSS',
    isActive: true,
    isPro: false,
    type: 'ACTION',
    service: ['EDIT'],
  },
  {
    name: 'EXPORT_SWIFT',
    description:
      'Palette export to SWIFT (macOS, iOS, iPadOS, watchOS, tvOS, visionOS)',
    isActive: true,
    isPro: true,
    type: 'ACTION',
    service: ['EDIT'],
  },
  {
    name: 'EXPORT_XML',
    description: 'Palette export to XML (Android)',
    isActive: true,
    isPro: true,
    type: 'ACTION',
    service: ['EDIT'],
  },
  {
    name: 'EXPORT_CSV',
    description: 'Palette LCH values export to CSV',
    isActive: true,
    isPro: true,
    type: 'ACTION',
    service: ['EDIT'],
  },
  {
    name: 'SETTINGS',
    description: 'Palette global configuration',
    isActive: true,
    isPro: false,
    type: 'CONTEXT',
    service: ['CREATE', 'EDIT'],
  },
  {
    name: 'SETTINGS_PALETTE_NAME',
    description: 'Palette name text field',
    isActive: true,
    isPro: false,
    type: 'ACTION',
    service: ['CREATE', 'EDIT'],
  },
  {
    name: 'SETTINGS_PALETTE_DESCRIPTION',
    description: 'Palette description text field',
    isActive: true,
    isPro: false,
    type: 'ACTION',
    service: ['CREATE', 'EDIT'],
  },
  {
    name: 'SETTINGS_COLOR_SPACE',
    description: 'Palette global color space',
    isActive: true,
    isPro: false,
    type: 'ACTION',
    service: ['CREATE', 'EDIT'],
  },
  {
    name: 'SETTINGS_COLOR_SPACE_LCH',
    description: 'LCH color space',
    isActive: true,
    isPro: false,
    type: 'ACTION',
    service: ['CREATE', 'EDIT'],
  },
  {
    name: 'SETTINGS_COLOR_SPACE_OKLCH',
    description: 'OKLCH color space',
    isActive: true,
    isPro: false,
    type: 'ACTION',
    service: ['CREATE', 'EDIT'],
  },
  {
    name: 'SETTINGS_COLOR_SPACE_LAB',
    description: 'CIELAB color space',
    isActive: true,
    isPro: false,
    type: 'ACTION',
    service: ['CREATE', 'EDIT'],
  },
  {
    name: 'SETTINGS_COLOR_SPACE_OKLAB',
    description: 'OKLAB color space',
    isActive: true,
    isPro: false,
    type: 'ACTION',
    service: ['CREATE', 'EDIT'],
  },
  {
    name: 'SETTINGS_COLOR_SPACE_HSL',
    description: 'HSL color space',
    isActive: true,
    isPro: false,
    type: 'ACTION',
    service: ['CREATE', 'EDIT'],
  },
  {
    name: 'SETTINGS_COLOR_SPACE_HSLUV',
    description: 'HSLUV color space',
    isActive: true,
    isPro: false,
    type: 'ACTION',
    service: ['CREATE', 'EDIT'],
  },
  {
    name: 'SETTINGS_NEW_ALGORITHM',
    description: 'Color shades generation new algorithm toggle',
    isActive: true,
    isPro: false,
    type: 'ACTION',
    service: ['EDIT'],
  },
  {
    name: 'SETTINGS_TEXT_COLORS_THEME',
    description: 'Text colors customization to better check contrast',
    isActive: true,
    isPro: false,
    type: 'ACTION',
    service: ['CREATE', 'EDIT'],
  },
  {
    name: 'ABOUT',
    description: 'Additional informations and useful links',
    isActive: true,
    isPro: false,
    type: 'CONTEXT',
    service: ['CREATE', 'EDIT'],
  },
  {
    name: 'GET_PRO_PLAN',
    description: 'Access the subscription to get pro features',
    isActive: true,
    isPro: false,
    type: 'ACTION',
    service: ['ONBOARD', 'CREATE', 'EDIT'],
  },
]

export default features