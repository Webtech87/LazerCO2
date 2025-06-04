import './Rejuvenescimento.css'

const Rejuvenescimento = () => {
  return (
    <div className='page-container'>
        <div className='rejuv-container'>
            <section className='rejuvenescimento'>
                <div className='content'>
                    <div className='info-text'>
                        <h1>Rejuvenescimento global</h1>
                        <span><strong>O protocolo de rejuvenescimento com Laser CO₂ é indicado para quem deseja:</strong></span>
                        <ul>
                            <li>Uma renovação completa da pele</li>
                            <li>Estimular colagénio em profundidade</li>
                            <li>Reduzir visivelmente os sinais da idade</li>
                            <li>Melhorar a elasticidade, firmeza e luminosidade é um dos tratamentos preferidos para quem procura resultados impactantes sem cirurgia.</li>
                        </ul>
                    </div>
                    <div className='img-container'>
                        <div className='images'>
                            <img src='/laser-treatment.jpg' alt="laserImg" />
                            <img src='/laser-treatment.jpg' alt="laserImg" />
                        </div>                        
                    </div>                    
                </div>
            </section>
        </div>      
    </div>
  )
}

export default Rejuvenescimento
