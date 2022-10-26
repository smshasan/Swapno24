import React from 'react'
import {Helmet} from 'react-helmet'

const MetaData = ({title}) => {
  return (
    <Helmet>
        <title>{`${title} - Swapno24`}</title>
    </Helmet>
  )
}

export default MetaData