import React from 'react';

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
                {/* Duplicate the list to ensure seamless looping */}
                {[...techs, ...techs, ...techs].map((tech, i) => (
                    <span
                        key={i}
                        className="text-2xl font-bold text-slate-700/50 hover:text-slate-500 transition-colors uppercase tracking-widest select-none font-mono"
                    >
                        {tech}
                    </span>
                ))}
            </div>

            <style jsx>{`
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
