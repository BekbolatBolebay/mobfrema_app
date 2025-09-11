// Домен опциялары және ұсыныстар

export const domainOptions = {
  // Тегін опциялар
  free: {
    vercel: {
      domain: "mobframe.vercel.app",
      pros: ["Жылдам", "SSL автоматты", "CDN"],
      cons: ["Vercel брендингі", "Кәсіби емес"],
      setup: "Автоматты",
    },
    netlify: {
      domain: "mobframe.netlify.app",
      pros: ["Жақсы performance", "SSL"],
      cons: ["Netlify брендингі"],
      setup: "Автоматты",
    },
    github: {
      domain: "mobframe.github.io",
      pros: ["GitHub интеграциясы", "Тұрақты"],
      cons: ["Баяу", "Шектеулі функционал"],
      setup: "GitHub Pages арқылы",
    },
  },

  // Арзан опциялар
  cheap: {
    xyz: {
      domain: "mobframe.xyz",
      price: "$1.99/жыл",
      pros: ["Арзан", "Заманауи"],
      cons: ["Жаңа TLD"],
    },
    tk: {
      domain: "mobframe.tk",
      price: "Тегін",
      pros: ["Толығымен тегін"],
      cons: ["Сенімсіз", "SEO үшін жаман"],
    },
  },

  // Ұсынылатын опциялар
  recommended: {
    kz: {
      domain: "mobframe.kz",
      price: "~$20/жыл",
      pros: ["Жергілікті", "Сенімді", "SEO жақсы"],
      cons: ["Қымбат"],
      where: "nic.kz",
    },
    com: {
      domain: "mobframe.com",
      price: "~$12/жыл",
      pros: ["Ең танымал", "Сенімді"],
      cons: ["Қымбат"],
      where: "Namecheap, GoDaddy",
    },
  },
}

// Домен таңдау көмекшісі
export function recommendDomain(budget: number, isLocal: boolean) {
  if (budget === 0) {
    return {
      primary: "mobframe.vercel.app",
      reason: "Тегін, жылдам, кәсіби көрінеді",
      nextStep: "Кейін .kz немесе .com сатып алу",
    }
  }

  if (budget < 10 && isLocal) {
    return {
      primary: "mobframe.xyz",
      reason: "Арзан, заманауи көрінеді",
      price: "$1.99/жыл",
    }
  }

  if (isLocal) {
    return {
      primary: "mobframe.kz",
      reason: "Қазақстан үшін ең жақсы",
      price: "~$20/жыл",
    }
  }

  return {
    primary: "mobframe.com",
    reason: "Халықаралық үшін ең жақсы",
    price: "~$12/жыл",
  }
}
