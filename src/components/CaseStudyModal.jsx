import { useEffect, useRef } from 'react';
import { X, ArrowRight, TrendingUp } from 'lucide-react';
import { gsap } from 'gsap';

const CaseStudyModal = ({ isOpen, onClose, data, openForm }) => {
    const modalRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            gsap.to(modalRef.current, { opacity: 1, duration: 0.3, display: 'flex', ease: 'power2.out' });
            gsap.fromTo(contentRef.current, 
                { y: 50, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 0.4, delay: 0.1, ease: 'power3.out' }
            );
        } else {
            document.body.style.overflow = 'unset';
            gsap.to(modalRef.current, { 
                opacity: 0, 
                duration: 0.3, 
                ease: 'power2.in',
                onComplete: () => {
                    if (modalRef.current) modalRef.current.style.display = 'none';
                }
            });
        }
        
        return () => {
             document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    if (!data) return null;

    return (
        <div 
            ref={modalRef}
            className="fixed inset-0 z-[200] hidden items-center justify-center p-4 md:p-6 bg-[#040405]/80 backdrop-blur-xl"
            onClick={onClose}
        >
            <div 
                ref={contentRef}
                className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Botón de cierre */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 md:top-6 md:right-6 z-50 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Header (Hero del modal) */}
                <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-t-3xl bg-zinc-900">
                    <img 
                        src={data.image} 
                        alt={data.client}
                        width={800}
                        height={320}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-8 md:p-12">
                        <span className="px-3 py-1 bg-[var(--color-accent)]/20 text-[var(--color-accent)] text-xs font-[var(--font-unbounded)] uppercase tracking-wider rounded-full border border-[var(--color-accent)]/30 mb-4 inline-block">
                            Caso de Estudio
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white font-[var(--font-unbounded)] leading-tight mb-2">
                            {data.title}
                        </h2>
                    </div>
                </div>

                {/* Contenido Principal */}
                <div className="p-8 md:p-12">
                    
                    {/* Tarjetas de métricas destacadas */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 -mt-16 relative z-10">
                        {data.metrics.map((metric, idx) => (
                            <div key={idx} className="bg-[#121214]/80 backdrop-blur-md border border-[var(--color-border)] rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-lg">
                                <span className="text-3xl font-bold text-[#FF4F00] font-[var(--font-unbounded)] mb-1">{metric.value}</span>
                                <span className="text-gray-400 text-sm">{metric.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Texto del caso */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-300 font-light leading-relaxed">
                        <div>
                            <h3 className="text-xl font-[var(--font-unbounded)] text-white font-semibold mb-4 border-b border-[var(--color-border)] pb-2">El Desafío</h3>
                            <p className="mb-6">{data.challenge}</p>
                            
                            <h3 className="text-xl font-[var(--font-unbounded)] text-white font-semibold mb-4 border-b border-[var(--color-border)] pb-2">La Solución RBernabe</h3>
                            <p>{data.solution}</p>
                        </div>
                        
                        <div className="bg-white/5 border border-[var(--color-border)] rounded-2xl p-8 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center">
                                        <TrendingUp className="w-6 h-6 text-[var(--color-accent)]" />
                                    </div>
                                    <h3 className="text-xl font-[var(--font-unbounded)] text-white font-semibold">El Resultado</h3>
                                </div>
                                <p className="mb-8 text-lg text-white/90">
                                    {data.result}
                                </p>
                            </div>

                            <div className="border-t border-white/10 pt-6 mt-4">
                                <p className="text-sm text-gray-500 mb-4 text-center">¿Listos para escalar tu negocio?</p>
                                <button 
                                    onClick={() => {
                                        onClose();
                                        if (openForm) setTimeout(openForm, 300);
                                    }}
                                    className="w-full relative group inline-flex justify-center items-center gap-2 px-8 py-4 bg-[var(--color-accent)] hover:bg-[#E04500] text-white text-sm font-semibold rounded-full transition-all duration-300 font-[var(--font-unbounded)] shadow-[0_0_20px_rgba(255,79,0,0.3)] hover:shadow-[0_0_30px_rgba(255,79,0,0.5)] overflow-hidden"
                                >
                                    {/* Brillo de hover en el botón */}
                                    <span className="absolute inset-0 w-full h-full -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer"></span>
                                    <span>Quiero resultados así</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CaseStudyModal;
