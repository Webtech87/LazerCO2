import './Followers.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { useTranslation } from 'react-i18next';

interface Follower {
  id: number;
  name: string;
  text: string;
  image: string;
  grade: string;
}

const foll: Follower[] = [
  /*{
    id: 1,
    name: 'Rita Lazdiņa',
    text: 'Dr. Wilsa is very kind, highly competent, and always finds the best solution! I completely trust her with my beauty needs. All the other staff at the clinic are also friendly and very helpful. Thank you!',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b332c2d2?w=150&h=150&fit=crop&crop=face',
    grade: '5 Stars'
  },*/
  {
    id: 2,
    name: 'Gutz',
    text: 'Foi uma boa escolha ter cá passado.Achei ser uma clínica com equipamento/espaço moderno e profissional.Staff muito simpático e prestativo.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    grade: '5 Stars'
  },
  {
    id: 3,
    name: 'Carolina AZEVEDO',
    text: 'Excelente clínica.\nA médica é muito profissional e sua equipe de trabalho também. Verdadeiramente uma excelente experiência.\nAdorei os resultados.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    grade: '5 Stars'
  },
  {
    id: 4,
    name: 'Sónia Vieira',
    text: 'Foi ótima experiência 🥰 equipa fantástica\nPreços qualidade! 5*',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    grade: '5 Stars'
  },
  {
    id: 5,
    name: 'Leandro rocha',
    text: 'Atendimento excelente!\nMuito satisfeito com meu procedimento\nSem palavras magnífico\n\nDra. mega simpática !',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    grade: '5 Stars'
  },
  {
    id: 6,
    name: 'Raquel Sa',
    text: 'Clínica aconchegante, bem limpa, receção muito educada e prestativa, e não sei nem o que dizer da Dra Wilsa, uma excelente profissional, super atenciosa, tira todas as dúvidas. Com certeza voltarei mais vezes para outros tratamentos!',
    image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face',
    grade: '5 Stars'
  },
  {
    id: 7,
    name: 'Sandra Correia',
    text: 'Super recomendo a Dra Wilsa uma excelente profissional muito atenciosa e com uma simpatia incrivel. Estou muito feliz com os tratamentos que realizei .agradeço imenso a Dra Wilsa e a toda equipa pela simpatia.',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
    grade: '5 Stars'
  },
  {
    id: 8,
    name: 'Alessandra Nascimento',
    text: 'Experiência incrível excelente atendimento.\nMuito satisfeita com profissionalismo da dr Wilsa e com os resultados obtidos dos procedimentos que já realizei.\nSinto-me completamente realizada na santclinic que para além da confiança ajudaram-me imenso a recuperar minha autoestima .\nGratidão a toda equipa .',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    grade: '5 Stars'
  },
  {
    id: 9,
    name: 'Eli Rato',
    text: 'Excelente profissional! Excelente médica! Não tenho palavras para descrever o quanto mudou a minha vida. Retira todas as nossas dúvidas e indica os melhores tratamentos. E os resultados … são de colocar um sorriso na cara. 100% satisfeita',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
    grade: '5 Stars'
  },
  {
    id: 10,
    name: 'antonio micro',
    text: 'Amo o atendimento desde a receção até o a atendimento. Foi avaliado pelo Dr. Luan excelente profissional, Dra. Wilsa muito atenciosa!! Voltarei para fazer o meu tratamento de corpo! Meu rosto ficou impecável!',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    grade: '5 Stars'
  },
  {
    id: 11,
    name: 'Tania Costa',
    text: 'Agradeço incomensurávelmente o humanismo, humildade e acima de tudo a credibilidade e profissionalismo da Dra Wilsa, sinto-me super confiante nos procedimentos e nas suas sábias sugestões, recomendo a Santi Clinic sem hesitações! Bem haja ❤️',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face',
    grade: '5 Stars'
  },
  {
    id: 12,
    name: 'Abe',
    text: 'Dr Wilsa was very understanding and provided service in a very caring manner. My wife\'s skin was much improved and she is a happy customer. Great service. 6⭐️s!',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    grade: '5 Stars'
  }
];

export const Followers = () => {
  const { t } = useTranslation();
  
  return (
    <div className="follower_container">
      <div className="follower_title">
        <h2>{t("followers.title")}</h2>
      </div>

      <div className="follower_list_container">
        <div className="follower_list_items">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            loop={true}
            speed={800}
            breakpoints={{
              768: {
                slidesPerView: 2
              },
              1024: {
                slidesPerView: 3
              }
            }}
          >
            {foll.map((follower) => (
              <SwiperSlide key={follower.id}>
                <div className="follower_list_item">
                  <div className="follower_img">
                    <img src={follower.image} alt={`Foto de ${follower.name}`} />
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