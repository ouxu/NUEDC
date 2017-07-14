import React from 'react'
import NProgress from 'nprogress'
import { Helmet } from 'react-helmet'
import { config } from '../utils'
import './app.less'
import '../themes/index.less'
import { connect } from 'dva'
const App = ({children, location, loading, routes, app, dispatch}) => {
  NProgress.start()
  !loading.global && NProgress.done()
  const { logoSrc = '', name = ''} = config
  return <div>
    <Helmet>
      <title>{name}</title>
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <link rel='icon' href={logoSrc} type='image/x-icon' />
      {/* {iconFontJS && <script src={iconFontJS}> </script>} */}
      {/* {iconFontCSS && <link rel="stylesheet" href={iconFontCSS} />} */}
    </Helmet>
    {children}
  </div>
}

export default connect(({loading, app}) => ({loading, app}))(App)
