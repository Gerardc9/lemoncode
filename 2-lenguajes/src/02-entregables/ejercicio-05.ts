console.log("************** DELIVERABLE 05 *********************");

// SlotMachine - Máquina tragaperras con contador de monedas
class SlotMachine {
  coins;

  constructor() {
    this.coins = 0;
  }

  play() {
    this.coins++;

    const reel1 = Math.random() >= 0.5;
    const reel2 = Math.random() >= 0.5;
    const reel3 = Math.random() >= 0.5;

    if (reel1 && reel2 && reel3) {
      const wonCoins = this.coins;
      this.coins = 0;
      console.log(`Congratulations!!!. You won ${wonCoins} coins!!`);
    } else {
      console.log("Good luck next time!!");
    }
  }
}

// Ejemplo de uso
const machine1 = new SlotMachine();
machine1.play();
machine1.play();
machine1.play();
machine1.play();
machine1.play();
