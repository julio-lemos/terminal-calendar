import { daysWeek } from '../types';

const TOTAL_DAYS_OF_WEEK = 6;

export default class Calendar {
  month: number;
  year: number;

  constructor(month = new Date().getMonth(), year = new Date().getFullYear()) {
    this.month = month;
    this.year = year;
  }

  /**
   * Monta os dados do mês informado
   * @returns Retorna Array com informações da semana
   */
  mountMonth() {
    const TOTAL_DAYS_OF_MONTH = new Date(this.year, ++this.month, 0).getDate();
    const FIRST_WEEK_DIGIT_OF_MONTH = new Date(
      this.year,
      --this.month,
      1,
    ).getDay();
    const month = [];

    for (let numberDay = 1; numberDay <= TOTAL_DAYS_OF_MONTH; ) {
      const week = new Map<daysWeek, number>();

      if (this.isFirstWeek(numberDay)) {
        for (
          let numberWeek = FIRST_WEEK_DIGIT_OF_MONTH;
          numberWeek <= TOTAL_DAYS_OF_WEEK;
          numberWeek++
        ) {
          this.createWeek(week, numberWeek, numberDay);

          numberDay++;
        }
      } else {
        for (
          let numberWeek = 0;
          numberWeek <= TOTAL_DAYS_OF_WEEK;
          numberWeek++
        ) {
          if (numberDay > TOTAL_DAYS_OF_MONTH) {
            break;
          }

          this.createWeek(week, numberWeek, numberDay);

          numberDay++;
        }
      }

      month.push(Object.fromEntries(week));
    }

    return month;
  }

  /**
   * Informa mês e ano do calendario
   * @param text Dados da data selecionada
   * @returns {Calendar} Instancia do Calendar
   */
  static createInstance(text: string): Calendar {
    const SEPARATOR_DATE = '/'
    const [month, year] = text.split(SEPARATOR_DATE)

    if(Number(month) < 1 || Number(month) > 12) {
      throw new Error('Digite o número do mês entre 1 e 12')
    }

    if(!month || !year) {
      throw new Error('Digite a data no formato MM/AAAA')
    }

    return new Calendar(Number(month) - 1, Number(year))
  }

  /**
   * Método auxiliar para verificar se é a primeira semana do mês em construção
   * @param weekNumber: Número da semana
   */
  private isFirstWeek = (weekNumber: number): boolean => weekNumber === 1;

  /**
   * Constrói a semana
   * @param map Dados da semana
   * @param numberWeek Número referencia da semana
   * @param numberDay Número do dia
   */
  private createWeek = (
    map: Map<daysWeek, number>,
    numberWeek: number,
    numberDay: number,
  ) => {
    switch (numberWeek) {
      case 0:
        map.set('DOMINGO', numberDay);
        break;
      case 1:
        map.set('SEGUNDA', numberDay);
        break;
      case 2:
        map.set('TERÇA', numberDay);
        break;
      case 3:
        map.set('QUARTA', numberDay);
        break;
      case 4:
        map.set('QUINTA', numberDay);
        break;
      case 5:
        map.set('SEXTA', numberDay);
        break;
      case 6:
        map.set('SÁBADO', numberDay);
        break;
    }
  };
}
