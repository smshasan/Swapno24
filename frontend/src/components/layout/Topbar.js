import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import LanguageDropdown from '../../translations/LanguageDropdown'
// import { useTranslation } from 'react-i18next'




const Topbar = (props) => {
    // const [t, i18n] = useTranslation('common');
    const [click, setClick] = useState(false)
    const {t, i18n} = props;

    console.log('click', click)
    const clickHandler = () => {
        setClick(!click)
    }

    
    return (
        <Fragment>
            <div style={{height: '40px', display: 'flex', alignItems: 'center', justifyContent:'center', background: '#f7f7f7'}}>
                <Link to={`/products/used`} style={{margin:"0 20px", color: '#000'}} className='clicked'>{t('topbar.usedProducts')}</Link>
                <Link to={`/products/new`} style={{margin:"0 20px", color: '#000'}} className="clicked">{t('topbar.newProducts')}</Link>

                {/* <LanguageDropdown i18n={i18n}/> */}

                <button onClick={() => i18n.changeLanguage('en')}>en</button>
                <button onClick={() => i18n.changeLanguage('bd')}>bd</button>

            </div>
        </Fragment>
    )
}

export default Topbar