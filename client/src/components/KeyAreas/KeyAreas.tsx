import './KeyAreas.css'


const KeyAreas = () => {
  return (
    <div className='page-container'>
        <div className='keys-container'>
            <section className='key-areas'>
                <div className='title'>
                    <h1>Laser CO₂ Aplicado com Precisão nas Zonas-Chave</h1>
                </div>
                <div className='content'>
                    <div className='img-container'>
                        <div className='images'>
                            <img src='/laser-treatment.jpg' alt="laserImg" />
                            <img src='/laser-treatment.jpg' alt="laserImg" />
                        </div>                        
                    </div>
                    <div className='info-text'>
                        <h1>Rosto, Pescoço e Colo</h1>
                        <span><strong>Ideal para melhorar:</strong></span>
                        <ul>
                            <li>Textura e firmeza da pele</li>
                            <li>Rugas finas e moderadas</li>
                            <li>Manchas solares e sinais de envelhecimento</li>
                            <li>Flacidez leve Permite um efeito lifting natural, com renovação visível da pele após cada sessão</li>
                        </ul>
                    </div>                    
                </div>
            </section>
        </div>      
    </div>
  )
}

export default KeyAreas
