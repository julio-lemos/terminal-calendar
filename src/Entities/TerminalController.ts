import chalk from 'chalk';
import DraftLog from 'draftlog';
import readline from 'readline';
import chalkTable from 'chalk-table';
import Calendar from './Calendar';

export default class TerminalController {
  terminal: readline.Interface;

  /**
   * Inicializa terminal
   */
  initializeTerminal() {
    DraftLog(console).addLineListener(process.stdin);
    this.terminal = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  /**
   * Questão do terminal
   * @param msg Dados a serem recebidos
   * @returns {Promise<string>}
   */
  question(msg = ''): Promise<string> {
    return new Promise(resolve => this.terminal.question(msg, resolve));
  }

  /**
   * Exibe Calendário
   * @param calendar Instãncia do Calendário
   */
  showCalendar(calendar: Calendar): void {
    DraftLog(console).addLineListener(process.stdin);

    const table = chalkTable(this.getTableOptions(), calendar.mountMonth());

    console.draft(table)
  }

  /**
   * Método responsável por encerrar terminal
   */
   closeTerminal() {
    this.terminal.close();
  }

  /**
   * Retorna configurações da tabela
   */
  private getTableOptions() {
    return {
      leftPad: 2,
      columns: [
        { field: 'DOMINGO', name: chalk.cyan('Dom') },
        { field: 'SEGUNDA', name: chalk.magenta('Seg') },
        { field: 'TERÇA', name: chalk.red('Ter') },
        { field: 'QUARTA', name: chalk.green('Qua') },
        { field: 'QUINTA', name: chalk.blue('Qui') },
        { field: 'SEXTA', name: chalk.blue('Sex') },
        { field: 'SÁBADO', name: chalk.blue('Sab') },
      ],
    };
  }
}
