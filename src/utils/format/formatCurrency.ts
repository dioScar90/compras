export const formatCurrency = (value: number, locale = 'pt-BR') => {
  return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: locale === 'pt-BR' ? 'BRL' : 'USD',
  }).format(value)
}