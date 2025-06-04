import './Followers.css'
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {Pagination} from 'swiper/modules';


const foll = [
    {
        id: 1,
        name: 'Rita Lazdiņa',
        text: 'Dr. Wilsa is very kind, highly competent, and always finds the best solution! I completely trust her with my beauty needs. All the other staff at the clinic are also friendly and very helpful. Thank you!',
        image: '/laser-treatment.jpg',
        grade: '5 Stars',
    },
    {
        id: 2,
        name: 'Gutz',
        text: 'Foi uma boa escolha ter cá passado.Achei ser uma clínica com equipamento/espaço moderno e profissional.Staff muito simpático e prestativo.',
        image: '/laser-treatment.jpg',
        grade: '5 Stars',
    },
    {
        id: 3,
        name: 'Carolina AZEVEDO',
        text: 'Excelente clínica.\n' +
            'A médica é muito profissional e sua equipe de trabalho também. Verdadeiramente uma excelente experiência.\n' +
            'Adorei os resultados.',
        image: '/laser-treatment.jpg',
        grade: '5 Stars',
    },
    {
        id: 4,
        name: 'Sónia Vieira',
        text: 'Foi ótima experiência 🥰 equipa fantástica\n' +
            'Preços qualidade! 5*',
        image: '/laser-treatment.jpg',
        grade: '5 Stars',
    },
    {
        id: 5,
        name: 'Leandro rocha',
        text: 'Atendimento excelente!\n' +
            'Muito satisfeito com meu procedimento\n' +
            'Sem palavras magnífico\n' +
            '\n' +
            'Dra. mega simpática !',
        image: '/laser-treatment.jpg',
        grade: '5 Stars',
    },
    {
        id: 6,
        name: 'Raquel Sa',
        text: 'Clínica aconchegante, bem limpa, receção muito educada e prestativa, e não sei nem o que dizer da Dra Wilsa, uma excelente profissional, super atenciosa, tira todas as dúvidas. Com certeza voltarei mais vezes para outros tratamentos!',
        image: '/laser-treatment.jpg',
        grade: '5 Stars',
    },
    {
        id: 7,
        name: 'Sandra Correia',
        text: 'Super recomendo a Dra Wilsa uma excelente profissional muito atenciosa e com uma simpatia incrivel. Estou muito feliz com os tratamentos que realizei .agradeço imenso a Dra Wilsa e a toda equipa pela simpatia.',

        image: '/laser-treatment.jpg',
        grade: '5 Stars',
    },
    {
        id: 8,
        name: 'Alessandra Nascimento',
        text: 'Experiência incrível excelente atendimento.\n' +
            'Muito satisfeita com profissionalismo da dr Wilsa e com os resultados obtidos dos procedimentos que já realizei.\n' +
            'Sinto-me completamente realizada na santclinic que para além da confiança ajudaram-me imenso a recuperar minha autoestima .\n' +
            'Gratidão a toda equipa .',
        image: '/laser-treatment.jpg',
        grade: '5 Stars',
    },
    {
        id: 9,
        name: 'Eli Rato',
        text: 'Excelente profissional! Excelente médica! Não tenho palavras para descrever o quanto mudou a minha vida. Retira todas as nossas dúvidas e indica os melhores tratamentos. E os resultados … são de colocar um sorriso na cara. 100% satisfeita',
        image: '/laser-treatment.jpg',
        grade: '5 Stars',
    },
    {
        id: 10,
        name: 'antonio micro',
        text: 'Amo o atendimento desde a receção até o a atendimento. Foi avaliado pelo Dr. Luan excelente profissional, Dra. Wilsa muito atenciosa!! Voltarei para fazer o meu tratamento de corpo! Meu rosto ficou impecável!',
        image: '/laser-treatment.jpg',
        grade: '5 Stars',
    },
    {
        id: 11,
        name: 'Tania Costa',
        text: 'Agradeço incomensurávelmente o humanismo, humildade e acima de tudo a credibilidade e profissionalismo da Dra Wilsa, sinto-me super confiante nos procedimentos e nas suas sábias sugestões, recomendo a Santi Clinic sem hesitações! Bem haja ❤️',
        image: '/laser-treatment.jpg',
        grade: '5 Stars',
    },
    {
        id: 12,
        name: 'Abe',
        text: 'Dr Wilsa was very understanding and provided service in a very caring manner. My wife’s skin was much improved and she is a happy customer. Great service. 6⭐️s!',
        image: '/laser-treatment.jpg',
        grade: '5 Stars',
    },
];


export const Followers = () => {
    return (
        <div className="follower_container">
            <div className="follower_title">
                <h2>Testemunhos de quem escolheu a Santiclinic</h2>
            </div>

            <div className="follower_list_container">
                <div className="follower_list_items">
                    <Swiper
                        modules={[Pagination]}
                        spaceBetween={30}
                        slidesPerView={1}
                        pagination={{clickable: true}}
                        breakpoints={{
                            768: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                        }}
                    >
                        {foll.map((follower) => (
                            <SwiperSlide key={follower.id}>
                                <div className="follower_list_item">
                                    <div className="follower_img">
                                        <img src={follower.image} alt={`Foto de ${follower.name}`}/>
                                    </div>
                                    <div className="follower_text">
                                        <p>{follower.text}</p>
                                    </div>
                                    <div className="follower_grade">{follower.grade}</div>
                                    <div className="follower_name">{follower.name}</div>
                                </div>
                            </SwiperSlide>
                        ))}

                    </Swiper>
                </div>
            </div>
        </div>
    );
};


