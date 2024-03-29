import React from 'react';
import Portfolio from 'components/Portfolio/Portfolio';
import SectionName from 'components/SectionName/SectionName';
import SectionText from 'components/SectionText/SectionText';
import pic from '../../images/pic.png';
import './AboutMe.css';

function AboutMe() {
  return (
    <section id='about-me' className="about-me">
      <SectionName name="Студент" />
      <div className="about-me__content">
        <img className="about-me__pic" src={pic} alt='фото студента'/>
        <div className="about-me__text">
          <h2 className="about-me__title">Виталий</h2>
          <p className="about-me__subtitle">Фронтенд-разработчик, 30 лет</p>
          <SectionText
            text="Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня
        есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно
        начал кодить. С 2015 года работал в компании «СКБ Контур». После того,
        как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и
        ушёл с постоянной работы."
          />
          <a href='ladykot' className="about-me__link">Github</a>
        </div>
      </div>

      <Portfolio />
    </section>
  );
}
export default AboutMe;
