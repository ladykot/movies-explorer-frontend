import React from 'react';

function AboutProject() {
  return (
    <section className="about-project">
      <p className="section-name">О проекте</p>

      <div className="two-columns">
        <div className="two-columns__item">
          <h3 className="two-columns__title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="two-columns__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="two-columns__item">
          <h3 className="two-columns__title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="two-columns__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>

      <div className='about-project__progress'>
        <div className='about-project__progress-item'>1 неделя</div>
        <div className='about-project__progress-item'>4 недели</div>
      </div>
      <div className='about-project__progress'>
        <div className='about-project__progress-item'>Back-end</div>
        <div className='about-project__progress-item'>Front-end</div>
      </div>

    </section>
  );
}

export default AboutProject;
