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

    const value = window.customValue;
    const topbarButtonfocused =() => {
        if (value == 'used') {
            return 'used'
        }
        if (value == 'new') {
            return 'new'
        }
    }

    console.log('topbarButton:' + topbarButtonfocused())
    console.log('customValue:', value)

    
    return (
        <Fragment>
            <div className='topbar'>
                <Link to={`/products/used`} style={{margin:"0 20px", color: '#fff'}} className={topbarButtonfocused() =='new' ? "clicked": null }>{t('topbar.usedProducts')}</Link>
                <Link to={`/products/new`} style={{margin:"0 20px", color: '#fff'}} className={topbarButtonfocused() =='used' ? "clicked": null }>{t('topbar.newProducts')}</Link>

                {/* <LanguageDropdown i18n={i18n}/> */}

                <button onClick={() => i18n.changeLanguage('en')}>en</button>
                <button onClick={() => i18n.changeLanguage('bd')}>bd</button>

            </div>
        </Fragment>
    )
}

export default Topbar