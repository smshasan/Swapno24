import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'


import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';






const Topbar = ({ t, i18n }) => {

    // const [click, setClick] = useState(false)
    const [selectedOption, setSelectedOption] = useState('English')
    // 


    // console.log('click', click)
    // const clickHandler = () => {
    //     setClick(!click)
    // }

    // const value = window.customValue;
    // const topbarButtonfocused =() => {
    //     if (value == 'used') {
    //         return 'used'
    //     }
    //     if (value == 'new') {
    //         return 'new'
    //     }
    // }

    // console.log('topbarButton:' + topbarButtonfocused())
    // console.log('customValue:', value)

    const handleLanguageChange = (language, event) => {
        event.stopPropagation(); // Stop the event propagation
        setSelectedOption(language);
        i18n.changeLanguage(language);

        document.getElementById('dropDownLanguageButton').focus();
    };

    console.log('selectedOption', typeof selectedOption)

    // className={topbarButtonfocused() =='new' ? "clicked": null }
    // className={topbarButtonfocused() =='used' ? "clicked": null }


    return (
        <>
            <div className='topbar'>
                <Link to={`/products/used`} style={{ margin: "0 20px", color: '#fff' }} >{t('topbar.usedProducts')}</Link>
                <Link to={`/products/new`} style={{ margin: "0 20px", color: '#fff' }} >{t('topbar.newProducts')}</Link>

                {/* Language */}



                <DropdownButton id="dropdown-basic-button" title="Language">
                    <Dropdown.Item href="#/action-1">
                        <label style={{ marginRight: '20px' }}>
                            <input
                                type='radio'
                                name='language'
                                style={{ marginRight: '5px' }}
                                value='English'
                                checked={selectedOption === 'English'}
                                onChange={(event) => handleLanguageChange('English', event)}

                            />
                            English
                        </label>

                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                        <label >
                            <input
                                type='radio'
                                name='language'
                                style={{ marginRight: '5px' }}
                                value='Bangla'
                                checked={selectedOption === 'Bangla'}
                                onChange={(event) => handleLanguageChange('Bangla', event)}

                            />
                            Bangla
                        </label>

                    </Dropdown.Item>
                </DropdownButton>

            </div>
        </>
    )
}

export default Topbar