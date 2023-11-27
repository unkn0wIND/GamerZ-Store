import React from 'react'
import { Helmet } from 'react-helmet-async'

// Pour les titres des pages
const MetaData = ({title}) => {
  return (
    <Helmet>
          <title>{`${title} - GamerZ-Store`}</title>
    </Helmet>
  )
}

export default MetaData