import React from 'react';
import './Portfolio.css';

function Portfolio() {
    return (
        <section className='portfolio'>
            <p className='portfolio__title'>Портфолио</p>

            <ul className='portfolio__list'>
                <li className='portfolio__list-item-wrap'>
                    <a href='https://ladykot.github.io/how-to-learn/' target="_blank" rel="noopener noreferrer" className='portfolio__item hover'>
                        <p className='portfolio__item-text'>Статичный сайт</p>
                        <p className='portfolio__item-text portfolio__item-text_arrow'>↗</p>
                    </a>
                </li>
                <li className='portfolio__list-item-wrap'>
                    <a href='https://ladykot.github.io/russian-travel/' target="_blank" rel="noopener noreferrer" className='portfolio__item hover'>
                        <p className='portfolio__item-text'>Адаптивный сайт</p>
                        <p className='portfolio__item-text portfolio__item-text_arrow'>↗</p>
                    </a>
                </li>
                <li className='portfolio__list-item-wrap'>
                    <a href='https://ladykot.github.io/mesto-react/' target="_blank" rel="noopener noreferrer" className='portfolio__item hover'>
                        <p className='portfolio__item-text'>Одностраничное приложение</p>
                        <p className='portfolio__item-text portfolio__item-text_arrow'>↗</p>
                    </a>
                </li>
            </ul>

        </section>
    );
}
export default Portfolio;