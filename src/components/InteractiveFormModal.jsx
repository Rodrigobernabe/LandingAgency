import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { X, ArrowRight, CheckCircle, Globe, DollarSign, PenTool, TrendingDown, Target } from 'lucide-react';
import AnimatedText from './AnimatedText';

export default function InteractiveFormModal({ isOpen, onClose }) {
    const modalRef = useRef(null);
    const contentRef = useRef(null);

    // Estados del Formulario
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        challenge: '',
        url: '',
        budget: '',
        name: '',
        email: '',
        phone: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Animación de Apertura/Cierre del Modal
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'; // Bloquear scroll

            gsap.fromTo(modalRef.current,
                { autoAlpha: 0, backdropFilter: 'blur(0px)' },
                { autoAlpha: 1, backdropFilter: 'blur(20px)', duration: 0.5, ease: 'power2.out' }
            );

            gsap.fromTo(contentRef.current,
                { y: 50, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 0.6, delay: 0.2, ease: 'back.out(1.2)' }
            );
        } else {
            document.body.style.overflow = 'unset';

            // Resetear estado al cerrar para la próxima vez
            setTimeout(() => {
                setStep(1);
                setIsSuccess(false);
                setFormData({ challenge: '', url: '', budget: '', name: '', email: '', phone: '' });
            }, 500);
        }
    }, [isOpen]);

    // Animación entre Pasos
    const nextStep = () => {
        gsap.to(contentRef.current, {
            opacity: 0,
            x: -30,
            duration: 0.3,
            onComplete: () => {
                setStep(prev => prev + 1);
                gsap.fromTo(contentRef.current,
                    { opacity: 0, x: 30 },
                    { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
                );
            }
        });
    };

    const prevStep = () => {
        gsap.to(contentRef.current, {
            opacity: 0,
            x: 30,
            duration: 0.3,
            onComplete: () => {
                setStep(prev => prev - 1);
                gsap.fromTo(contentRef.current,
                    { opacity: 0, x: -30 },
                    { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
                );
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // REEMPLAZA 'TU_ID_DE_FORMSPREE' CON LA URL O CÓDIGO QUE TE DÁ LA PÁGINA
            const response = await fetch('https://formspree.io/f/mgoljppk', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                // Enviamos todo el state actual (desafío, url, presupuesto, nombre, email, teléfono)
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setIsSubmitting(false);
                setIsSuccess(true);

                // Animar entrada de Success
                gsap.fromTo('.success-content',
                    { scale: 0.8, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.5)' }
                );
            } else {
                setIsSubmitting(false);
                alert("Hubo un problema procesando tu solicitud. Por favor intenta de nuevo.");
            }
        } catch (error) {
            setIsSubmitting(false);
            alert("Error de conexión. Revisa tu internet y vuelve a intentar.");
        }
    };

    const handleClose = () => {
        gsap.to(modalRef.current, {
            autoAlpha: 0,
            duration: 0.4,
            ease: 'power2.in',
            onComplete: onClose
        });
    };

    const progressPercentage = ((step - 1) / 3) * 100;

    if (!isOpen && !gsap.isTweening(modalRef.current)) return null;

    return (
        <div
            ref={modalRef}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 invisible"
        >
            {/* Botón Cerrar Global */}
            <button
                onClick={handleClose}
                className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-50"
            >
                <X size={24} />
            </button>

            {/* Contenedor Principal */}
            <div
                ref={contentRef}
                className="w-full max-w-2xl bg-[#0a0a0c] border border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden mx-4"
            >
                {/* Progreso */}
                {!isSuccess && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gray-800">
                        <div
                            className="h-full bg-gradient-to-r from-[var(--color-accent)] to-[#FF9500] transition-all duration-500 ease-out"
                            style={{ width: `${progressPercentage}%` }}
                        />
                    </div>
                )}

                {/* Glow de Fondo */}
                <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] bg-[var(--color-accent)] rounded-full blur-[100px] opacity-10 pointer-events-none" />

                {!isSuccess ? (
                    <div className="relative z-10">
                        {/* Cabecera del Step */}
                        <div className="mb-8">
                            <span className="text-[var(--color-accent)] font-[var(--font-unbounded)] font-bold text-sm tracking-widest uppercase mb-2 block">
                                Paso {step} de 4
                            </span>
                            <h3 className="text-2xl md:text-3xl font-bold text-white font-[var(--font-unbounded)] leading-tight">
                                {step === 1 && "Cuál es tu principal desafío actualmente?"}
                                {step === 2 && "Dinos más sobre tu proyecto."}
                                {step === 3 && "Para este nivel, ¿en qué rango está tu presupuesto?"}
                                {step === 4 && "Último paso. ¿A dónde enviamos el plan?"}
                            </h3>
                        </div>

                        {/* ---------- PASO 1: DESAFÍO ---------- */}
                        {step === 1 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { id: 'traffic-no-sales', icon: TrendingDown, text: "Tengo tráfico, pero nadie contacta ni compra." },
                                    { id: 'old-design', icon: PenTool, text: "Mi web se ve anticuada y poco profesional." },
                                    { id: 'new-launch', icon: Target, text: "Necesito lanzar un servicio/producto rápido." },
                                    { id: 'other', icon: Globe, text: "Otro problema." },
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            setFormData({ ...formData, challenge: item.id });
                                            nextStep();
                                        }}
                                        className="flex flex-col items-start gap-4 p-6 rounded-2xl border border-gray-800 bg-[#141517] hover:border-[var(--color-accent)] hover:bg-[#1f2126] transition-all text-left group"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-gray-800 group-hover:bg-[var(--color-accent)]/20 text-gray-400 group-hover:text-[var(--color-accent)] flex items-center justify-center transition-colors">
                                            <item.icon size={20} />
                                        </div>
                                        <span className="text-gray-300 font-medium">{item.text}</span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* ---------- PASO 2: URL ---------- */}
                        {step === 2 && (
                            <div className="flex flex-col gap-6">
                                <div className="relative">
                                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                                    <input
                                        type="url"
                                        placeholder="ej: https://miagencia.com (Opcional)"
                                        value={formData.url}
                                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                        className="w-full bg-[#141517] border border-gray-800 focus:border-[var(--color-accent)] rounded-2xl py-4 pl-12 pr-4 text-white outline-none transition-colors"
                                    />
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <button onClick={prevStep} className="text-gray-500 hover:text-white transition-colors text-sm font-medium">Volver</button>
                                    <button
                                        onClick={nextStep}
                                        className="bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-xl font-[var(--font-unbounded)] font-bold transition-colors flex items-center gap-2"
                                    >
                                        Siguiente <ArrowRight size={18} />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* ---------- PASO 3: PRESUPUESTO ---------- */}
                        {step === 3 && (
                            <div className="flex flex-col gap-4">
                                {[
                                    { id: 'low', text: "Menos de $1,000 USD" },
                                    { id: 'mid', text: "Entre $1,000 y $3,000 USD" },
                                    { id: 'high', text: "Más de $3,000 USD" },
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            setFormData({ ...formData, budget: item.id });
                                            nextStep();
                                        }}
                                        className="flex items-center justify-between p-5 rounded-2xl border border-gray-800 bg-[#141517] hover:border-[var(--color-accent)] hover:bg-[#1f2126] transition-all text-left group"
                                    >
                                        <span className="text-gray-300 font-medium text-lg">{item.text}</span>
                                        <DollarSign className="text-gray-600 group-hover:text-[var(--color-accent)] transition-colors" />
                                    </button>
                                ))}
                                <div className="mt-4">
                                    <button onClick={prevStep} className="text-gray-500 hover:text-white transition-colors text-sm font-medium">Volver</button>
                                </div>
                            </div>
                        )}

                        {/* ---------- PASO 4: CONTACTO ---------- */}
                        {step === 4 && (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                                <input
                                    type="text"
                                    required
                                    placeholder="Tu Nombre"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-[#141517] border border-gray-800 focus:border-[var(--color-accent)] rounded-xl py-4 px-5 text-white outline-none transition-colors"
                                />
                                <input
                                    type="email"
                                    required
                                    placeholder="Tu Correo Premium"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-[#141517] border border-gray-800 focus:border-[var(--color-accent)] rounded-xl py-4 px-5 text-white outline-none transition-colors"
                                />
                                <input
                                    type="tel"
                                    placeholder="Tu WhatsApp (Recomendado)"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full bg-[#141517] border border-gray-800 focus:border-[var(--color-accent)] rounded-xl py-4 px-5 text-white outline-none transition-colors"
                                />

                                <div className="flex justify-between items-center mt-4">
                                    <button type="button" onClick={prevStep} className="text-gray-500 hover:text-white transition-colors text-sm font-medium">Volver</button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="btn-liquid overflow-hidden relative group bg-[var(--color-accent)] text-white px-8 py-4 rounded-xl font-[var(--font-unbounded)] font-bold transition-all hover:shadow-[0_0_30px_rgba(255,79,0,0.4)] disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            {isSubmitting ? 'Procesando...' : 'Solicitar Auditoría'} <ArrowRight size={18} className={`${isSubmitting ? 'hidden' : 'inline'}`} />
                                        </span>
                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></div>
                                    </button>
                                </div>
                            </form>
                        )}

                    </div>
                ) : (
                    /* ---------- PANTALLA DE ÉXITO ---------- */
                    <div className="success-content text-center py-10 relative z-10">
                        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                            <CheckCircle size={40} />
                        </div>
                        <h3 className="text-3xl font-bold text-white font-[var(--font-unbounded)] mb-4">
                            ¡Solicitud Recibida!
                        </h3>
                        <p className="text-gray-400 text-lg max-w-sm mx-auto mb-8 leading-relaxed">
                            Analizaremos tu caso en las próximas 24 horas y te contactaremos por correo o WhatsApp con los siguientes pasos. Prepárate para escalar.
                        </p>
                        <button
                            onClick={handleClose}
                            className="bg-white text-black px-8 py-3 rounded-xl font-[var(--font-unbounded)] font-bold hover:bg-gray-200 transition-colors"
                        >
                            Volver a la Web
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
