import React from 'react'
import {
  AccountBox as AccountBoxIcon,
  ChatBubble,
  ChromeReaderMode,
  Dashboard as DashboardIcon,
  ExitToApp as ExitToAppIcon,
  FormatTextdirectionRToL as RTLIcon,
  FormatTextdirectionLToR as LTRIcon,
  GetApp,
  Language as LanguageIcon,
  Lock as LockIcon,
  MenuOpen as MenuOpenIcon,
  SettingsApplications as SettingsIcon,
  Style as StyleIcon,
  Web,
} from '@material-ui/icons'

import allLocales from './locales'
import allThemes from './themes'

const getMenuItems = (props) => {
  const {
    intl,
    updateLocale,
    locale,
    menuContext,
    themeContext,
    a2HSContext,
    auth: authData,
  } = props

  const {
    toggleThis,
    isDesktop,
    isAuthMenuOpen,
    isMiniSwitchVisibility,
  } = menuContext
  const { themeID, setThemeID, isRTL, toggleThisTheme } = themeContext

  const { auth, setAuth } = authData
  const { isAppInstallable, isAppInstalled, deferredPrompt } = a2HSContext

  const localeItems = allLocales.map((l) => {
    return {
      value: undefined,
      visible: true,
      primaryText: intl.formatMessage({ id: l.locale }),
      onClick: () => {
        updateLocale(l.locale)
      },
      leftIcon: <LanguageIcon />,
    }
  })

  const isAuthorised = auth.isAuthenticated

  const themeItems = allThemes.map((t) => {
    return {
      value: undefined,
      visible: true,
      primaryText: intl.formatMessage({ id: t.id }),
      onClick: () => {
        setThemeID(t.id)
      },
      leftIcon: <StyleIcon style={{ color: t.color }} />,
    }
  })

  if (isAuthMenuOpen || !isAuthorised) {
    return [
      {
        value: '/my_account',
        primaryText: intl.formatMessage({
          id: 'my_account',
          defaultMessage: 'My Account',
        }),
        leftIcon: <AccountBoxIcon />,
      },
      {
        value: '/signin',
        onClick: isAuthorised
          ? () => {
              setAuth({ isAuthenticated: false })
            }
          : () => {},
        visible: true,
        primaryText: isAuthorised
          ? intl.formatMessage({ id: 'sign_out' })
          : intl.formatMessage({ id: 'sign_in' }),
        leftIcon: isAuthorised ? <ExitToAppIcon /> : <LockIcon />,
      },
    ]
  }
  return [
    {
      value: '/home',
      visible: isAuthorised,
      primaryText: intl.formatMessage({ id: 'home' }),
      leftIcon: <DashboardIcon />,
    },
    {
      primaryText: intl.formatMessage({ id: 'ruleApps', defaultMessage: 'Rule Apps' }),
      primaryTogglesNestedList: true,
      leftIcon: <Web />,
      nestedItems: [
    //    {
     //     value: '/DealershipirJS',
     //     visible: isAuthorised,
     //     primaryText: intl.formatMessage({
     //       id: 'DealershipirJS',
     //       defaultMessage: 'DealershipirJS',
     //     }),
     //     leftIcon: <ChatBubble />,
     //   },
     //   {
      //    value: '/DealershipRES',
      //    visible: isAuthorised,
      //    primaryText: intl.formatMessage({
      //      id: 'DealershipRES',
       //     defaultMessage: 'DealershipRES',
       //   }),
        //  leftIcon: <ChatBubble />,
        //},
        {
          value: '/MCAPPolicy',
          visible: isAuthorised,
          primaryText: intl.formatMessage({
            id: 'MCAPPolicy',
            defaultMessage: 'MCAP Policy',
          }),
          leftIcon: <ChatBubble />,
        },
      ]
    },
    {
      primaryText: intl.formatMessage({ id: 'general', defaultMessage: 'Azure' }),
      primaryTogglesNestedList: true,
      leftIcon: <Web />,
      nestedItems: [
        {
          value: '/ServiceBus',
          visible: isAuthorised,
          primaryText: intl.formatMessage({
            id: 'ServiceBus',
            defaultMessage: 'ServiceBus',
          }),
          leftIcon: <ChatBubble />,
        },
        {
          value: '/SQLQuery',
          visible: isAuthorised,
          primaryText: intl.formatMessage({
            id: 'SQLQuery',
            defaultMessage: 'SQLQuery',
          }),
          leftIcon: <ChatBubble />,
        }
      ]
    },
    {
      primaryText: intl.formatMessage({ id: 'Dealership', defaultMessage: 'Dealership' }),
      primaryTogglesNestedList: true,
      leftIcon: <Web />,
      nestedItems: [
        {
          value: '/WebSite',
          visible: isAuthorised,
          primaryText: intl.formatMessage({
            id: 'WebSite',
            defaultMessage: 'WebSite',
          }),
          leftIcon: <ChatBubble />,
        },
        {
          value: '/Dealership',
          visible: isAuthorised,
          primaryText: intl.formatMessage({
            id: 'Dealership',
            defaultMessage: 'Dealership',
          }),
          leftIcon: <ChatBubble />,
        }
       //{
       //   value: '/Finance',
       //   visible: isAuthorised,
       //   primaryText: intl.formatMessage({
       //     id: 'Finance',
       //     defaultMessage: 'Finance',
       //   }),
       //   leftIcon: <ChatBubble />,
      //  }
      ]
    },
    {
      primaryText: intl.formatMessage({ id: 'API', defaultMessage: 'API' }),
      primaryTogglesNestedList: true,
      leftIcon: <Web />,
      nestedItems: [
        {
          value: '/GetVehiclePhoto',
          visible: isAuthorised,
          primaryText: intl.formatMessage({
            id: 'GetVehiclePhoto',
            defaultMessage: 'GetVehiclePhoto',
          }),
          leftIcon: <ChatBubble />,
        },
        {
          value: '/GetGasPrices',
          visible: isAuthorised,
          primaryText: intl.formatMessage({
            id: 'GetGasPrices',
            defaultMessage: 'GetGasPrices',
          }),
          leftIcon: <ChatBubble />,
        }
      ]
    },
    //{
    //  primaryText: intl.formatMessage({ id: 'demos', defaultMessage: 'Demos' }),
    //  primaryTogglesNestedList: true,
    //  leftIcon: <Web />,
    //  nestedItems: [
    //    {
    //      value: '/dialog_demo',
    //      visible: isAuthorised,
    //      primaryText: intl.formatMessage({
    //        id: 'dialog_demo',
    //        defaultMessage: 'Dialog',
    //      }),
    //      leftIcon: <ChatBubble />,
    //    },
    //    {
    //      value: '/toast_demo',
     //     visible: isAuthorised,
    //      primaryText: intl.formatMessage({
    //        id: 'toast_demo',
    //        defaultMessage: 'Toast',
    //      }),
    //      leftIcon: <QuestionAnswer />,
    //    },
    //    {
    //      value: '/filter_demo',
    //      visible: isAuthorised,
    //      primaryText: intl.formatMessage({
    //        id: 'filter_demo',
    //        defaultMessage: 'Filter',
    //      }),
    //      leftIcon: <FilterList />,
    //    },
    //    {
    //      value: '/list_page_demo',
    //      visible: isAuthorised,
    //      primaryText: intl.formatMessage({
    //        id: 'list_page_demo_menu',
    //        defaultMessage: 'List Page',
    //      }),
   //       leftIcon: <ViewList />,
   //     },
   //     {
   //       value: '/tabs_demo',
   //       visible: isAuthorised,
   //       primaryText: intl.formatMessage({
   //         id: 'tabs_demo',
   //         defaultMessage: 'Tabs Page',
   //       }),
   //       leftIcon: <Tab />,
   //     },
  //    ],
 //   },

   // {
   //   value: '/about',
   //   visible: true,
  //    primaryText: intl.formatMessage({ id: 'about' }),
  //    leftIcon: <InfoOutlined />,
  //  },
    { divider: true },
    {
      primaryText: intl.formatMessage({ id: 'settings' }),
      primaryTogglesNestedList: true,
      leftIcon: <SettingsIcon />,
      nestedItems: [
        {
          primaryText: intl.formatMessage({ id: 'theme' }),
          secondaryText: intl.formatMessage({ id: themeID }),
          primaryTogglesNestedList: true,
          leftIcon: <StyleIcon />,
          nestedItems: themeItems,
        },
        {
          primaryText: intl.formatMessage({ id: 'language' }),
          secondaryText: intl.formatMessage({ id: locale }),
          primaryTogglesNestedList: true,
          leftIcon: <LanguageIcon />,
          nestedItems: localeItems,
        },
        {
          visible: isDesktop ? true : false,
          onClick: () => {
            toggleThis('isMiniSwitchVisibility')
          },
          primaryText: intl.formatMessage({
            id: 'menu_mini_mode',
          }),
          leftIcon: isMiniSwitchVisibility ? (
            <MenuOpenIcon />
          ) : (
            <ChromeReaderMode />
          ),
        },
        {
          onClick: () => {
            toggleThisTheme('isRTL')
          },
          primaryText: `${isRTL ? 'LTR' : 'RTL'} mode`,
          leftIcon: isRTL ? <LTRIcon /> : <RTLIcon />,
        },
      ],
    },
    {
      value: null,
      visible: isAppInstallable && !isAppInstalled,
      onClick: () => {
        deferredPrompt.prompt()
      },
      primaryText: intl.formatMessage({
        id: 'install',
        defaultMessage: 'Install',
      }),
      leftIcon: <GetApp />,
    },
  ]
}
export default getMenuItems
