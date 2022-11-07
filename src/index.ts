import chalk from 'chalk';
import Calendar from './Entities/Calendar';
import TerminalController from './Entities/TerminalController';

const terminalController = new TerminalController();
terminalController.initializeTerminal();

const STOP_TERM = ':q';

async function mainLoop() {
  try {
    console.log(chalk.magenta('\nDigite o mês e o ano que deseja (MM/AAAA):'));
    const answer = await terminalController.question();

    if (answer === STOP_TERM) {
      terminalController.closeTerminal();
      console.log(chalk.red('\nObrigado por usar.\n'));
      return;
    }

    const calendar = Calendar.createInstance(answer);
    terminalController.showCalendar(calendar);
    return mainLoop();
    
  } catch (err) {
    console.log(chalk.bgRedBright(`\nErro: ${(err as Error).message}\n`))
    return mainLoop()
  }
}

mainLoop();
