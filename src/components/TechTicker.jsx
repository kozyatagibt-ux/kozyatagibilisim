const TechTicker = () => {
    const techs = [
        "PROXMOX", "MICROSOFT", "FORTINET", "NEXTCLOUD",
        "UBUNTU", "VEEAM", "CISCO", "ESET", "ZABBIX",
        "GRAFANA", "DOCKER", "KUBERNETES", "PFSENSE"
    ];

    return (
        <section className="bg-slate-950 border-y border-slate-900 py-8 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950 z-10 pointer-events-none"></div>

            <div className="flex animate-scroll whitespace-nowrap gap-16 items-center">
                {[...techs, ...techs, ...techs].map((tech, i) => (
                    <span
                        key={i}
                        className="text-2xl font-bold text-slate-500/70 hover:text-slate-300 transition-colors uppercase tracking-widest select-none font-mono"
                    >
                        {tech}
                    </span>
                ))}
            </div>

            <style>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.33%); }
                }
                .animate-scroll {
                    animation: scroll 40s linear infinite;
                }
            `}</style>
        </section>
    );
};

export default TechTicker;
