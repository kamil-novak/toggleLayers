import { ThemeVariables, css, SerializedStyles } from 'jimu-core'

export function getStyle (theme: ThemeVariables): SerializedStyles {
  const bg = theme.surfaces[1].bg

  return css`
    .widget-body {
        height: 100%;
        align-items: center;
        justify-content: right;
        font-size: 14px;
        background-color: ${bg};

        .header-container {
          padding-top: 10px;
          padding-bottom: 10px;
          padding-left: 0.25rem;
          padding-right: 0.25rem;
          display: flex;
          justify-content: space-between;
        }
    }
  `
}
