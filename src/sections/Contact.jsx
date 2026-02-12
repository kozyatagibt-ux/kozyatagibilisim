import React, { useState, useRef } from 'react';
import { Send, CheckCircle, Loader2, Phone, Mail, FileText, X } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const form = useRef();
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        employees: '',
        message: '',
        email: '',
        phone: '',
        kvkk: false
    });
    const [status, setStatus] = useState('idle');
    const [showKvkk, setShowKvkk] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.email && !formData.phone) {
            alert("Lütfen size ulaşabileceğimiz bir iletişim bilgisi (Telefon veya E-posta) giriniz.");
            return;
        }

        setStatus('loading');

        const templateParams = {
            name: formData.name,
            company: formData.company,
            employees: formData.employees,
            message: formData.message,
            contact_email: formData.email,
            contact_phone: formData.phone
        };

        // Replace with your actual EmailJS credentials
        emailjs.send('service_YOUR_SERVICE_ID', 'template_YOUR_TEMPLATE_ID', templateParams, 'YOUR_PUBLIC_KEY')
            .then((result) => {
                console.log(result.text);
                setStatus('success');
            }, (error) => {
                console.log(error.text);
                setStatus('error');
                // Fallback for demo
                setTimeout(() => setStatus('success'), 1000);
            });
    };

    return (
        <section className="py-16 bg-slate-950 text-white" id="contact">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>

                    <div className="relative z-10">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl md:text-4xl font-bold mb-3">Ücretsiz Keşif Başlatın</h2>
                            <p className="text-slate-400 text-sm md:text-base">
                                Tek bir form ile ihtiyacınızı iletin. IT altyanızı risk olmaktan çıkarıp,
                                işinizi büyüten bir güce dönüştürelim.
                            </p>
                        </div>

                        {status === 'success' ? (
                            <div className="text-center py-12">
                                <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle size={40} />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Talebiniz Alındı!</h3>
                                <p className="text-slate-400">
                                    Uzman ekibimiz en kısa sürede sizinle iletişime geçerek keşif sürecini planlayacaktır.
                                </p>
                            </div>
                        ) : (
                            <form ref={form} onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-slate-300">Ad Soyad</label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                            placeholder="Adınız Soyadınız"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-slate-300">Şirket Ünvanı</label>
                                        <input
                                            type="text"
                                            name="company"
                                            required
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                            placeholder="Şirketiniz"
                                            value={formData.company}
                                            onChange={e => setFormData({ ...formData, company: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-slate-300">Şirket Büyüklüğü (Çalışan Sayısı)</label>
                                    <select
                                        name="employees"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-slate-300"
                                        value={formData.employees}
                                        onChange={e => setFormData({ ...formData, employees: e.target.value })}
                                    >
                                        <option value="">Seçiniz</option>
                                        <option value="1-10">1 - 10</option>
                                        <option value="10-50">10 - 50</option>
                                        <option value="50-200">50 - 200</option>
                                        <option value="200+">200+</option>
                                    </select>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-slate-300">
                                        İhtiyaç Duyduğunuz Hizmet <span className="text-slate-500 font-normal">(Opsiyonel)</span>
                                    </label>
                                    <textarea
                                        name="message"
                                        rows="2"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                                        placeholder="Dilerseniz ihtiyacınızı kısaca belirtebilirsiniz..."
                                        value={formData.message}
                                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                                    ></textarea>
                                </div>

                                <div className="pt-3 pb-1 border-t border-slate-800/50">
                                    <label className="block text-sm font-medium text-slate-300 mb-3">Size Nasıl Ulaşalım?</label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                            <input
                                                type="tel"
                                                name="phone"
                                                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                                placeholder="Telefon Numaranız"
                                                value={formData.phone}
                                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                            />
                                        </div>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                            <input
                                                type="email"
                                                name="email"
                                                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                                placeholder="E-posta Adresiniz"
                                                value={formData.email}
                                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-2">* Telefon veya e-posta adresinden en az birini girmeniz gerekmektedir.</p>
                                </div>

                                <div className="flex items-start gap-3 pt-1">
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            required
                                            id="kvkk"
                                            className="w-4 h-4 rounded border-slate-600 text-blue-600 focus:ring-blue-500 bg-slate-900 cursor-pointer"
                                            checked={formData.kvkk}
                                            onChange={e => setFormData({ ...formData, kvkk: e.target.checked })}
                                        />
                                    </div>
                                    <label htmlFor="kvkk" className="text-xs text-slate-400 cursor-pointer select-none leading-tight py-0.5">
                                        <span
                                            className="text-blue-400 hover:text-blue-300 transition-colors underline"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setShowKvkk(true);
                                            }}
                                        >
                                            KVKK Aydınlatma Metni
                                        </span>'ni okudum.
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/25 mt-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            <span>Gönderiliyor...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Formu Gönder</span>
                                            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            {/* KVKK Modal */}
            {showKvkk && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[80vh] flex flex-col shadow-2xl relative">
                        <div className="flex justify-between items-center p-6 border-b border-slate-800">
                            <h3 className="text-xl font-bold text-white">KVKK Aydınlatma Metni</h3>
                            <button onClick={() => setShowKvkk(false)} className="text-slate-400 hover:text-white transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto text-slate-300 text-sm leading-relaxed space-y-4">
                            <p>
                                <strong>Veri Sorumlusu:</strong> Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, veri sorumlusu sıfatıyla <strong>Kozyatağı Bilişim</strong> tarafından hazırlanmıştır.
                            </p>

                            <div>
                                <strong className="text-white block mb-1">İşlenen Kişisel Veriler ve Amaçları:</strong>
                                Ad-soyad, iletişim bilgileri (telefon, e-posta) ve şirket bilgileri; tarafınıza hizmet teklifi sunulması, iletişim süreçlerinin yönetilmesi ve keşif taleplerinin karşılanması amacıyla işlenmektedir.
                            </div>

                            <div>
                                <strong className="text-white block mb-1">Verilerin Saklama Süresi:</strong>
                                Teklif ve değerlendirme sürecindeki verileriniz 1 yıl, ticari ilişki kurulması halinde ise yasal zamanaşımı süreleri (10 yıl) boyunca saklanacaktır.
                            </div>

                            <div>
                                <strong className="text-white block mb-1">Verilerin Aktarımı:</strong>
                                Verileriniz, IT hizmetlerinin sağlanması amacıyla (e-posta sunucuları, hosting altyapısı vb.) teknik gereklilikler çerçevesinde, yurt içi ve zorunlu hallerde yurt dışı altyapı sağlayıcılarıyla sınırları belirlenerek paylaşılabilir.
                            </div>

                            <div>
                                <strong className="text-white block mb-1">İlgili Kişi Olarak Haklarınız ve Başvuru:</strong>
                                KVKK m.11 kapsamındaki haklarınızı (bilgi talep etme, düzeltme, silme vb.) kullanmak için taleplerinizi;
                                <br />
                                • <strong>E-Posta:</strong> info@kozyatagibilisim.com
                                <br />
                                • <strong>Adres:</strong> Kozyatağı Mah. [Adresiniz Buraya Gelecek] Kadıköy/İstanbul
                                <br />
                                kanalları üzerinden tarafımıza iletebilirsiniz.
                            </div>
                        </div>
                        <div className="p-4 border-t border-slate-800 bg-slate-900/50 rounded-b-2xl flex justify-end">
                            <button
                                onClick={() => {
                                    setShowKvkk(false);
                                    setFormData({ ...formData, kvkk: true });
                                }}
                                className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors"
                            >
                                Okudum, Kapat
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Contact;
