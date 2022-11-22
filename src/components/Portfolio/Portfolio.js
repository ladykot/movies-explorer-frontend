import React from 'react';

function Portfolio() {
    return (
        <section className='portfolio'>
            <p className='portfolio__title'>Портфолио</p>

            <ul className='portfolio__list'>
                <li className='portfolio__item'>
                    <p className='portfolio__item-text'>Статичный сайт</p>
                    <p className='portfolio__item-text'>↗</p>
                </li>
                <li className='portfolio__item'>
                    <p className='portfolio__item-text'>Адаптивный сайт</p>
                    <p className='portfolio__item-text'>↗</p>
                </li>
                <li className='portfolio__item'>
                    <p className='portfolio__item-text'>Одностраничное приложение</p>
                    <p className='portfolio__item-text'>↗</p>
                </li>
            </ul>

        </section>
    );
}
export default Portfolio;