
import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const AboutPage: React.FC = () => {
    const { t } = useTranslation();

    const bannerStyle: React.CSSProperties = {
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    return (
        <div>
            <section className="relative h-[50vh] bg-fixed" style={{...bannerStyle, backgroundImage: `url('https://mayraproperty.com/wp-content/uploads/2024/05/alanyahomes-mahmutlar-sonas-star-residence-41-flat-for-sale-with-sea-and-castle-view-27.jpeg')`}}>
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-yellow-300 drop-shadow-lg">{t('about_title')}</h1>
                </div>
            </section>
            
            <section className="bg-slate-800 py-20">
                <div className="container mx-auto px-4 text-center max-w-4xl">
                    <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
                        {t('about_text_1')}
                    </p>
                </div>
            </section>

            <section className="relative h-[40vh] bg-fixed" style={{...bannerStyle, backgroundImage: `url('https://turistas.me/uploads/cities/big_webp/VqW58xUrh7Zxi8rEwPpX.webp')`}}>
                <div className="absolute inset-0 bg-black/50"></div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4 text-center max-w-4xl">
                     <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
                        {t('about_text_2')}
                    </p>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
