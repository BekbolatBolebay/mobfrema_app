// DNS конфигурация көмекшісі

export const dnsConfigurations = {
  vercel: {
    name: "Vercel",
    records: [
      { type: "A", name: "@", value: "76.76.19.19" },
      { type: "CNAME", name: "www", value: "cname.vercel-dns.com" },
    ],
    ttl: 300,
    instructions: [
      "Домен провайдеріңіздің панеліне кіріңіз",
      "DNS басқару бөліміне өтіңіз",
      "Жоғарыдағы жазбаларды қосыңыз",
      "24 сағат күтіңіз",
    ],
  },

  cloudflare: {
    name: "Cloudflare",
    records: [
      { type: "A", name: "@", value: "76.76.19.19", proxied: true },
      { type: "CNAME", name: "www", value: "mobframe.vercel.app", proxied: true },
    ],
    benefits: ["Тегін SSL", "DDoS қорғанысы", "CDN", "Аналитика"],
    setup: ["Cloudflare.com-ға тіркеліңіз", "Доменді қосыңыз", "Nameserver-лерді өзгертіңіз", "DNS жазбаларын қосыңыз"],
  },
}

// Домен тексеру функциясы
export async function checkDomainStatus(domain: string) {
  try {
    const response = await fetch(`https://dns.google/resolve?name=${domain}&type=A`)
    const data = await response.json()

    return {
      available: data.Status === 0,
      records: data.Answer || [],
      status: data.Status,
    }
  } catch (error) {
    return {
      available: false,
      error: "Тексеру мүмкін болмады",
    }
  }
}
