import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'
import type { PluginAPI } from 'tailwindcss/types/config'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    plugin(function ({ addUtilities }: PluginAPI) {
      const newUtilities: Record<string, Record<string, string>> = {
        '.customScrollbar': {
          'scrollbar-gutter':
            'stable' /* 스크롤바가 생성되어도 레이아웃이 밀리지 않음 */,
          'overflow-y': 'auto' /* 세로 스크롤을 허용 */,
        },
        '.customScrollbar::-webkit-scrollbar': {
          width: '8px',
        },
        '.customScrollbar::-webkit-scrollbar-thumb': {
          'background-color': '#D9DADE',
          'border-radius': '10px',
        },
        '.customScrollbar::-webkit-scrollbar-track': {
          background: 'transparent',
        },
      }

      // 변형에 respectPrefix와 respectImportant 옵션 추가
      addUtilities(newUtilities)
    }),
  ],
}
export default config
