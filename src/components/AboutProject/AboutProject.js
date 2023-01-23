import React from 'react';
import './AboutProject.css';
import SectionName from 'components/SectionName/SectionName';
import SectionText from 'components/SectionText/SectionText';

function AboutProject() {
  return (
    <section id='about-project' className="about-project">
      <SectionName name="О проекте" />

      <div className="two-columns">
        <div className="two-columns__item">
          <h3 className="two-columns__title">
            Дипломный проект включал 5 этапов
          </h3>
          <SectionText
            text="Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки."
          />
        </div>
        <div className="two-columns__item">
          <h3 className="two-columns__title">
            На выполнение диплома ушло 5 недель
          </h3>
          <SectionText
            text="У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься."
          />
        </div>
      </div>

      <div className="about-project__progress">
        <div className="about-project__progress-item">1 неделя</div>
        <div className="about-project__progress-item">4 недели</div>
        <div className="about-project__progress-item">Back-end</div>
        <div className="about-project__progress-item">Front-end</div>
      </div>
    </section>
  );
}

export default AboutProject;
