import { type ThemeConfig } from 'antd'

// const colorText = 'var(--color-text)';
// const colorBgContainer = 'var(--color-bg-container)';

export const theme: ThemeConfig = {
  components: {
    // Layout: {
    //   bodyBg: 'var(--color-main-bg)',
    //   siderBg: 'var(--color-aside-bg)',
    // },
    Menu: {
      lineWidth: 0,
      subMenuItemBg: 'transparent',
      darkSubMenuItemBg: 'transparent',
      fontSize: 16,
      darkItemBg: 'transparent'
    }
    // Table: {
    //   headerBg: 'var(--table-bg-header)',
    //   footerBg: 'var(--table-bg-footer)',
    //   rowHoverBg: 'var(--table-bg-row-hover)',
    //   colorTextHeading: colorText,
    //   borderColor: 'var(--table-border-color)',
    // },
    // Card: {
    //   colorTextHeading: colorText,
    //   paddingLG: 14,
    // },
    // Descriptions: {
    //   colorTextSecondary: 'var(--desc-label-color)',
    // },
    // Pagination: {
    //   itemActiveBg: colorBgContainer,
    //   colorTextDisabled: colorText,
    // },
    // Select: {
    //   optionSelectedColor: 'var(--option-selected-color)',
    // },
    // Form: {
    //   itemMarginBottom: 12,
    // },
    // Calendar: {
    //   colorPrimary: '#f0a313',
    //   borderRadius: 16,
    // },
  },
  token: {
    fontFamily: 'Inter, sans-serif',
    // colorBgContainer,
    // colorTextPlaceholder: 'var(--color-text-placeholder)',
    // colorText,
    // colorSplit: 'var(--color-split)',
    // colorBgElevated: colorBgContainer,
    // colorTextDisabled: 'var(--color-text-disabled)',
    // colorTextQuaternary: 'var(--color-text-quaternary)',
    // colorTextDescription: 'var(--color-text-description)',
    colorIcon: '#64748b'
  }
}
