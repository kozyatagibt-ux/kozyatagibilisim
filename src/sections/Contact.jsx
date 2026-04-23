import { useState, useRef } from 'react';
import { Send, CheckCircle, Loader2, Phone, Mail, X, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

// EmailJS yapılandırması — https://dashboard.emailjs.com/admin
// 1. EmailJS hesabı aç (ücretsiz, ayda 200 mail)
// 2. Service ID, Template ID ve Public Key'i .env dosyasına ekle
// 3. .env içinde: PUBLIC_EMAILJS_SERVICE_ID, PUBLIC_EMAILJS_TEMPLATE_ID, PUBLIC_EMAILJS_PUBLIC_KEY
const EMAILJS_SERVICE_ID = import.meta.env.PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY;

const Contact = () => {
    const form = useRef();
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        employees: '',
        message: '',
        email: '',
        phone: '',
        kvkk: false,
        marketingConsent: false
    });
    const [status, setStatus] = useState('idle');
    const [showKvkk, setShowKvkk] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.email && !formData.phone) {
            alert("Lütfen size ulaşabileceğimiz bir iletişim bilgisi (Telefon veya E-posta) giriniz.");
            return;
        }

        if (formData.phone) {
            const phoneDigits = formData.phone.replace(/\D/g, '');
            if (phoneDigits.length < 10) {
                alert("Lütfen geçerli bir telefon numarası giriniz (en az 10 hane).");
                return;
            }
        }

        // EmailJS yapılandırması eksikse formu göndermeyi engelle
        if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
            console.error('EmailJS yapılandırması eksik. .env dosyasını kontrol edin.');
            setStatus('error');
            return;
        }

        setStatus('loading');

        const templateParams = {
            name: formData.name,
            company: formData.company,
            employees: formData.employees,
            message: formData.message,
            contact_email: formData.email,
            contact_phone: formData.phone,
            marketing_consent: formData.marketingConsent ? 'Kabul Etti' : 'Reddetti'
        };

        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
            .then(() => {
                setStatus('success');
                // Google Ads dönüşüm izleme — potansiyel müşteri formu gönderimi
                if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
                    window.gtag('event', 'conversion', {
                        send_to: 'AW-18071896701/5KuPCKPVlqEcEP2EralD',
                    });
                }
            })
            .catch((error) => {
                console.error('EmailJS hatası:', error);
                setStatus('error');
            });
    };

    return (
        <section className="py-16 bg-slate-950 text-white" id="contact">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>

                    <div className="relative z-10">
                        {status !== 'success' && (
                            <div className="text-center mb-8">
                                <h2 className="text-3xl md:text-4xl font-bold mb-3">Ücretsiz Keşif Başlatın</h2>
                                <p className="text-slate-400 text-sm md:text-base">
                                    Tek bir form ile ihtiyacınızı iletin. IT altyapınızı risk olmaktan çıkarıp,
                                    işinizi büyüten bir güce dönüştürelim.
                                </p>
                            </div>
                        )}

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
                        ) : status === 'error' ? (
                            <div className="text-center py-12">
                                <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <AlertCircle size={40} />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Bir Sorun Oluştu</h3>
                                <p className="text-slate-400 mb-6">
                                    Form gönderilirken bir hata oluştu. Lütfen bizimle doğrudan iletişime geçin:
                                </p>
                                <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                                    <a href="tel:+905416367775" className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors">
                                        <Phone size={18} />
                                        0541 636 77 75
                                    </a>
                                    <a href="mailto:destek@kozyatagibilisim.com" className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition-colors">
                                        <Mail size={18} />
                                        E-posta Gönder
                                    </a>
                                </div>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="mt-6 text-sm text-slate-400 hover:text-white transition-colors underline"
                                >
                                    Tekrar dene
                                </button>
                            </div>
                        ) : (
                            <form ref={form} method="POST" action="#contact" onSubmit={handleSubmit} className="space-y-4">
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

                                <div className="space-y-3 pt-1">
                                    <div className="flex items-start gap-3">
                                        <div className="relative flex items-center mt-0.5">
                                            <input
                                                type="checkbox"
                                                required
                                                id="kvkk"
                                                className="w-4 h-4 rounded border-slate-600 text-blue-600 focus:ring-blue-500 bg-slate-900 cursor-pointer"
                                                checked={formData.kvkk}
                                                onChange={e => setFormData({ ...formData, kvkk: e.target.checked })}
                                            />
                                        </div>
                                        <span className="text-xs text-slate-400 leading-tight py-0.5">
                                            <button
                                                type="button"
                                                className="text-blue-400 hover:text-blue-300 transition-colors underline cursor-pointer"
                                                onClick={() => setShowKvkk(true)}
                                            >
                                                KVKK Aydınlatma Metni
                                            </button>'ni okudum ve{' '}
                                            <span
                                                className="cursor-pointer"
                                                onClick={() => setFormData({ ...formData, kvkk: !formData.kvkk })}
                                            >
                                                kabul ediyorum.
                                            </span>
                                        </span>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="relative flex items-center">
                                            <input
                                                type="checkbox"
                                                id="marketing"
                                                className="w-4 h-4 rounded border-slate-600 text-blue-600 focus:ring-blue-500 bg-slate-900 cursor-pointer"
                                                checked={formData.marketingConsent}
                                                onChange={e => setFormData({ ...formData, marketingConsent: e.target.checked })}
                                            />
                                        </div>
                                        <label htmlFor="marketing" className="text-xs text-slate-400 cursor-pointer select-none leading-tight py-0.5">
                                            Kampanya, bülten ve duyurulardan e-posta ve sms yoluyla haberdar olmak istiyorum.
                                        </label>
                                    </div>
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
                                <strong className="text-white block mb-1">Kişisel Verilerin Toplanma Yöntemi ve Hukuki Sebebi:</strong>
                                Kişisel verileriniz, internet sitemizdeki iletişim formu aracılığıyla elektronik ortamda otomatik yollarla toplanmaktadır. Bu veriler, KVKK m.5/2-c (Sözleşmenin kurulması/ifası) ve m.5/2-f (Meşru menfaat) hukuki sebeplerine dayalı olarak işlenmektedir.
                            </div>

                            <div>
                                <strong className="text-white block mb-1">İşlenen Veriler ve Amaçları:</strong>
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
                                • <strong>E-Posta:</strong> destek@kozyatagibilisim.com
                                <br />
                                • <strong>Adres:</strong> Quick Tower, İçerenköy E-5 Yanyolu, Umut Sk. No:8, Ataşehir/İstanbul
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
                                Okudum, Onaylıyorum
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Contact;
