// Servicio para generar consejos financieros y responder preguntas
const FinancialAdvice = {
  // Respuestas predefinidas para preguntas comunes
  commonQuestions: {
    'hola': 'Hola, soy tu asistente financiero. ¿En qué puedo ayudarte hoy?',
    'ayuda': 'Puedo ayudarte con consejos sobre inversiones, finanzas personales, ahorro, y más. Intenta preguntarme algo específico como "¿Cómo diversificar mi cartera?" o "¿Qué es un ETF?"',
    'gracias': 'De nada. Estoy aquí para ayudarte con tus consultas financieras.',
    'adios': 'Hasta luego. Si tienes más preguntas sobre finanzas o inversiones, no dudes en volver a consultarme.',
    'chau': 'Hasta pronto. Recuerda revisar regularmente tus inversiones y ajustar tu estrategia según sea necesario.'
  },
  
  // Consejos generales sobre inversiones
  investmentAdvice: [
    "Diversifica tu cartera para reducir el riesgo. No pongas todos tus huevos en la misma canasta.",
    "Invierte a largo plazo. El mercado puede ser volátil a corto plazo, pero históricamente tiende a subir a largo plazo.",
    "Considera tu tolerancia al riesgo al elegir inversiones. Las inversiones más arriesgadas pueden ofrecer mayores rendimientos, pero también mayores pérdidas potenciales.",
    "Reinvierte tus dividendos para aprovechar el interés compuesto.",
    "Mantén un fondo de emergencia antes de comenzar a invertir en activos de mayor riesgo.",
    "Investiga bien antes de invertir. Comprende en qué estás invirtiendo y por qué.",
    "Considera los costos de transacción y las comisiones, ya que pueden reducir significativamente tus rendimientos.",
    "Revisa y reequilibra tu cartera periódicamente para mantener tu asignación de activos deseada.",
    "No intentes cronometrar el mercado. Es muy difícil predecir los movimientos a corto plazo.",
    "Considera invertir regularmente (dollar-cost averaging) para reducir el impacto de la volatilidad del mercado."
  ],
  
  // Consejos sobre finanzas personales
  personalFinanceAdvice: [
    "Crea y sigue un presupuesto para controlar tus gastos y maximizar tus ahorros.",
    "Establece metas financieras claras y específicas, tanto a corto como a largo plazo.",
    "Reduce y elimina deudas de alto interés lo antes posible.",
    "Ahorra al menos el 20% de tus ingresos para metas a largo plazo como la jubilación.",
    "Mantén un fondo de emergencia que cubra de 3 a 6 meses de gastos.",
    "Automatiza tus ahorros e inversiones para mantener la disciplina financiera.",
    "Revisa regularmente tus gastos para identificar áreas donde puedes reducir.",
    "Considera diversificar tus fuentes de ingresos para aumentar tu estabilidad financiera.",
    "Edúcate continuamente sobre finanzas personales y estrategias de inversión.",
    "Planifica para grandes gastos futuros como educación, vivienda o jubilación."
  ],
  
  // Consejos específicos por tipo de inversión
  specificAdvice: {
    stocks: [
      "Las acciones ofrecen potencial de crecimiento a largo plazo, pero vienen con mayor volatilidad.",
      "Considera invertir en empresas con fundamentos sólidos, buen historial de crecimiento y ventajas competitivas.",
      "Los dividendos pueden proporcionar ingresos regulares además de la apreciación del capital.",
      "Las acciones de valor tienden a ser más estables, mientras que las de crecimiento ofrecen mayor potencial de apreciación pero con más riesgo.",
      "Diversifica entre diferentes sectores e industrias para reducir el riesgo específico de cada empresa."
    ],
    bonds: [
      "Los bonos generalmente ofrecen menor rendimiento pero también menor riesgo que las acciones.",
      "La duración del bono afecta su sensibilidad a los cambios en las tasas de interés.",
      "Los bonos gubernamentales suelen ser más seguros, mientras que los corporativos ofrecen mayores rendimientos con mayor riesgo.",
      "Considera la calificación crediticia del emisor al evaluar el riesgo de un bono.",
      "En entornos de tasas de interés crecientes, los bonos de corto plazo suelen tener mejor desempeño."
    ],
    crypto: [
      "Las criptomonedas son inversiones de alto riesgo y alta volatilidad.",
      "Solo invierte en criptomonedas el dinero que estés dispuesto a perder.",
      "Diversifica entre diferentes criptomonedas para reducir el riesgo.",
      "Mantén tus criptomonedas en billeteras seguras y considera opciones de almacenamiento en frío para mayor seguridad.",
      "Mantente informado sobre desarrollos regulatorios que puedan afectar el mercado de criptomonedas."
    ],
    etfs: [
      "Los ETFs ofrecen diversificación instantánea a un costo relativamente bajo.",
      "Considera los ETFs de índice para una estrategia pasiva de bajo costo.",
      "Revisa la composición y metodología del ETF antes de invertir.",
      "Presta atención al ratio de gastos, ya que afecta directamente tu rendimiento.",
      "Los ETFs temáticos pueden ofrecer exposición a sectores específicos o tendencias emergentes."
    ],
    funds: [
      "Los fondos mutuos ofrecen gestión profesional y diversificación.",
      "Compara el rendimiento del fondo con su benchmark para evaluar su desempeño.",
      "Considera los fondos de índice para una estrategia pasiva de bajo costo.",
      "Presta atención a las comisiones y gastos, ya que pueden reducir significativamente tus rendimientos.",
      "Revisa la filosofía de inversión y el historial del gestor del fondo."
    ]
  },
  
  // Respuestas a preguntas específicas sobre términos financieros
  financialTerms: {
    "qué es un etf": "Un ETF (Exchange-Traded Fund) es un fondo que cotiza en bolsa y sigue el rendimiento de un índice, sector, materia prima o activo específico. Los ETFs combinan la diversificación de los fondos mutuos con la flexibilidad de negociación de las acciones.",
    "qué es la diversificación": "La diversificación es una estrategia que consiste en distribuir tus inversiones entre diferentes tipos de activos, sectores e instrumentos para reducir el riesgo. La idea es que si una inversión tiene un mal desempeño, otras pueden compensar esas pérdidas.",
    "qué es el interés compuesto": "El interés compuesto es el proceso por el cual el interés se suma al capital inicial, generando a su vez más interés sobre el nuevo monto total. Es como 'interés sobre interés' y es una de las fuerzas más poderosas en las finanzas.",
    "qué es la inflación": "La inflación es el aumento generalizado y sostenido de los precios de bienes y servicios en una economía durante un período de tiempo. Reduce el poder adquisitivo del dinero, por lo que es importante que tus inversiones superen la tasa de inflación.",
    "qué es un cedear": "Un CEDEAR (Certificado de Depósito Argentino) es un certificado que representa acciones de empresas extranjeras y cotiza en la bolsa argentina. Permite a los inversores argentinos acceder a acciones internacionales en pesos argentinos.",
    "qué es el dca": "DCA (Dollar-Cost Averaging) o Promediación de Costos es una estrategia de inversión que consiste en invertir cantidades fijas de dinero a intervalos regulares, independientemente del precio del activo. Esto reduce el impacto de la volatilidad y elimina la necesidad de cronometrar el mercado.",
    "qué es un plazo fijo": "Un plazo fijo es un instrumento financiero que consiste en depositar dinero en una entidad financiera por un período determinado a cambio de una tasa de interés fija. Al finalizar el plazo, recibes tu capital más los intereses generados.",
    "qué es el riesgo": "En finanzas, el riesgo es la posibilidad de que el rendimiento real de una inversión sea diferente al esperado, especialmente la posibilidad de perder parte o la totalidad del capital invertido. Generalmente, a mayor riesgo, mayor rendimiento potencial.",
    "qué es un bono": "Un bono es un instrumento de deuda emitido por gobiernos, municipalidades o empresas para financiar proyectos o actividades. Al comprar un bono, estás prestando dinero al emisor a cambio de pagos periódicos de interés y la devolución del principal al vencimiento.",
    "qué es el rendimiento": "El rendimiento es la ganancia o pérdida total de una inversión durante un período específico, expresada como porcentaje del costo inicial. Incluye tanto los ingresos (dividendos, intereses) como la apreciación o depreciación del capital."
  },
  
  // Función para generar una respuesta basada en la pregunta del usuario
  generateResponse: (question, investments) => {
    // Convertir la pregunta a minúsculas para facilitar la comparación
    const lowerQuestion = question.toLowerCase();
    
    // Verificar si es una pregunta común
    for (const [key, response] of Object.entries(FinancialAdvice.commonQuestions)) {
      if (lowerQuestion.includes(key)) {
        return response;
      }
    }
    
    // Verificar si es una pregunta sobre un término financiero
    for (const [term, explanation] of Object.entries(FinancialAdvice.financialTerms)) {
      if (lowerQuestion.includes(term)) {
        return explanation;
      }
    }
    
    // Verificar si es una pregunta sobre un tipo específico de inversión
    if (lowerQuestion.includes('accion') || lowerQuestion.includes('stock')) {
      return FinancialAdvice.specificAdvice.stocks[Math.floor(Math.random() * FinancialAdvice.specificAdvice.stocks.length)];
    } else if (lowerQuestion.includes('bono')) {
      return FinancialAdvice.specificAdvice.bonds[Math.floor(Math.random() * FinancialAdvice.specificAdvice.bonds.length)];
    } else if (lowerQuestion.includes('cripto') || lowerQuestion.includes('bitcoin') || lowerQuestion.includes('ethereum')) {
      return FinancialAdvice.specificAdvice.crypto[Math.floor(Math.random() * FinancialAdvice.specificAdvice.crypto.length)];
    } else if (lowerQuestion.includes('etf')) {
      return FinancialAdvice.specificAdvice.etfs[Math.floor(Math.random() * FinancialAdvice.specificAdvice.etfs.length)];
    } else if (lowerQuestion.includes('fondo') || lowerQuestion.includes('mutual')) {
      return FinancialAdvice.specificAdvice.funds[Math.floor(Math.random() * FinancialAdvice.specificAdvice.funds.length)];
    }
    
    // Si la pregunta incluye "consejo" o "recomendación", dar un consejo general
    if (lowerQuestion.includes('consejo') || lowerQuestion.includes('recomend') || lowerQuestion.includes('suger')) {
      if (lowerQuestion.includes('inver')) {
        return FinancialAdvice.investmentAdvice[Math.floor(Math.random() * FinancialAdvice.investmentAdvice.length)];
      } else {
        return FinancialAdvice.personalFinanceAdvice[Math.floor(Math.random() * FinancialAdvice.personalFinanceAdvice.length)];
      }
    }
    
    // Si la pregunta es sobre las inversiones actuales del usuario
    if (lowerQuestion.includes('mi') && (lowerQuestion.includes('inver') || lowerQuestion.includes('cartera'))) {
      if (investments && investments.length > 0) {
        // Analizar la cartera del usuario
        const totalValue = investments.reduce((sum, inv) => sum + (inv.quantity * inv.current_price), 0);
        const stocksValue = investments.filter(inv => inv.type === 'stock').reduce((sum, inv) => sum + (inv.quantity * inv.current_price), 0);
        const cryptoValue = investments.filter(inv => inv.type === 'crypto').reduce((sum, inv) => sum + (inv.quantity * inv.current_price), 0);
        const bondsValue = investments.filter(inv => inv.type === 'bond').reduce((sum, inv) => sum + (inv.quantity * inv.current_price), 0);
        const etfsValue = investments.filter(inv => inv.type === 'etf').reduce((sum, inv) => sum + (inv.quantity * inv.current_price), 0);
        
        const stocksPercentage = totalValue > 0 ? (stocksValue / totalValue * 100).toFixed(1) : 0;
        const cryptoPercentage = totalValue > 0 ? (cryptoValue / totalValue * 100).toFixed(1) : 0;
        const bondsPercentage = totalValue > 0 ? (bondsValue / totalValue * 100).toFixed(1) : 0;
        const etfsPercentage = totalValue > 0 ? (etfsValue / totalValue * 100).toFixed(1) : 0;
        
        let advice = `Basado en tu cartera actual, tienes aproximadamente:\n`;
        advice += `- ${stocksPercentage}% en acciones\n`;
        advice += `- ${cryptoPercentage}% en criptomonedas\n`;
        advice += `- ${bondsPercentage}% en bonos\n`;
        advice += `- ${etfsPercentage}% en ETFs\n\n`;
        
        // Dar un consejo basado en la composición de la cartera
        if (cryptoPercentage > 20) {
          advice += `Tu exposición a criptomonedas es relativamente alta (${cryptoPercentage}%). Considera si esto se alinea con tu tolerancia al riesgo, ya que las criptomonedas son muy volátiles.`;
        } else if (stocksPercentage + cryptoPercentage > 80 && bondsPercentage < 10) {
          advice += `Tu cartera está muy orientada al crecimiento con ${stocksPercentage + cryptoPercentage}% en activos de renta variable. Considera añadir más bonos para equilibrar el riesgo, especialmente si estás cerca de necesitar estos fondos.`;
        } else if (bondsPercentage > 70) {
          advice += `Tu cartera es bastante conservadora con ${bondsPercentage}% en bonos. Si tu horizonte de inversión es largo, podrías considerar aumentar tu exposición a acciones para potenciar el crecimiento.`;
        } else {
          advice += `Tu cartera parece estar razonablemente diversificada entre diferentes clases de activos. Recuerda revisar y reequilibrar periódicamente para mantener tu asignación de activos deseada.`;
        }
        
        return advice;
      } else {
        return "No veo inversiones en tu cartera actualmente. ¿Te gustaría que te dé algunos consejos para comenzar a invertir?";
      }
    }
    
    // Si la pregunta es sobre precios o mercado
    if (lowerQuestion.includes('precio') || lowerQuestion.includes('mercado') || lowerQuestion.includes('valor')) {
      return "Los mercados financieros son impredecibles a corto plazo. En lugar de intentar predecir movimientos de precios, considera enfocarte en los fundamentos de tus inversiones y en tu estrategia a largo plazo. Recuerda que puedes actualizar los precios de tus inversiones haciendo clic en el botón de actualización.";
    }
    
    // Respuesta por defecto si no se identifica la pregunta
    return "Esa es una buena pregunta. Como asistente financiero, puedo ayudarte con consejos sobre inversiones, explicaciones de términos financieros, y análisis básico de tu cartera. ¿Podrías reformular tu pregunta o ser más específico sobre qué información buscas?";
  },
  
  // Función para generar un consejo aleatorio
  getRandomAdvice: () => {
    const allAdvice = [
      ...FinancialAdvice.investmentAdvice,
      ...FinancialAdvice.personalFinanceAdvice,
      ...FinancialAdvice.specificAdvice.stocks,
      ...FinancialAdvice.specificAdvice.bonds,
      ...FinancialAdvice.specificAdvice.crypto,
      ...FinancialAdvice.specificAdvice.etfs,
      ...FinancialAdvice.specificAdvice.funds
    ];
    
    return allAdvice[Math.floor(Math.random() * allAdvice.length)];
  }
};

export default FinancialAdvice;
