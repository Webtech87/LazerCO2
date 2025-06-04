import "./skinMarks.css"

const SkinMarks = () => {
    return (
    <div className="page-container">
      <main className="container">
        <section className="laser-treatment">
          <div className="treatment-image">
            <img
              src="/laser-treatment.jpg"
              alt="CO2 Laser Treatment"
            />
          </div>

          <article className="treatment-content">
            <h2 className="main_title">Remoção de sinais, cicatrizes e manchas</h2>
            <div className="treatment-text-container">

              <h3><li className="treatment-item">Tratamento preciso e seguro para:</li></h3>
              <ul className="list_container">
                <li className="treatment-item">Remover sinais benignos da pele</li>
                <li className="treatment-item">Corrigir cicatrizes de acne, cirúrgicas ou traumáticas</li>
                <li className="treatment-item">Eliminar manchas escuras solares ou senis</li>
                <li className="treatment-item">Reduzir hiperpigmentações com melhora progressiva da uniformidade da pele</li>
              </ul>

            </div>
          </article>
        </section>
      </main>
    </div>
  );
};

export default SkinMarks;

