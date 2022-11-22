import React from 'react';
import Portfolio from 'components/Portfolio/Portfolio';
import pic from '../../images/pic.png';

function AboutMe() {
  return (
    <section className="about-me">
      <p className="section-name">Студент</p>
      <h2 className="section-title">Виталий</h2>
      <p className="section-subtitle">Фронтенд-разработчик, 30 лет</p>
      <p className="section-text">
        Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня
        есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно
        начал кодить. С 2015 года работал в компании «СКБ Контур». После того,
        как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и
        ушёл с постоянной работы.
      </p>
      <a className="about-me__link">Github</a>
      <img className="about-me__pic" src={pic} />
      <Portfolio />
    </section>
  );
}
export default AboutMe;
