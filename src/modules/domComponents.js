const createWelcomeModal = () => {
  const modalOuterWrapper = document.createElement('div');
  const modalContainer = document.createElement('div');
  const modalContent = document.createElement('div');
  const modalHeader = document.createElement('div');
  const modalBody = document.createElement('div');
  const modalFooter = document.createElement('div');
  const modalContinueBtn = document.createElement('button');
  const modalTitle = document.createElement('h1');
  const modalNameEntry = document.createElement('input');
  const modalNameEntryLabel = document.createElement('label');
  modalNameEntryLabel.setAttribute('for', 'playernameentry');
  modalNameEntry.setAttribute('type', 'text');
  modalNameEntry.setAttribute('id', 'playernameentry');
  modalNameEntry.setAttribute('name', 'playernameentry');
  modalContinueBtn.setAttribute('type', 'button');
  modalContinueBtn.setAttribute('id', 'startBtn');
  modalOuterWrapper.classList.add('modal');
  modalOuterWrapper.setAttribute('id', 'welcome-modal');
  modalOuterWrapper.style.display = `block`;
  modalContainer.classList.add(
    'modal-dialog',
    'modal-dialog-centered',
    'modal-xl'
  );
  modalContent.classList.add('modal-content');
  modalHeader.classList.add('modal-header');
  modalTitle.classList.add('modal-title', 'fs-5');
  modalBody.classList.add('modal-body');
  modalFooter.classList.add('modal-footer');
  modalContinueBtn.classList.add('btn', 'btn-primary');
  modalOuterWrapper.appendChild(modalContainer);
  modalContainer.appendChild(modalContent);
  modalContent.appendChild(modalHeader);
  modalHeader.appendChild(modalTitle);
  modalContent.appendChild(modalBody);
  modalContent.appendChild(modalFooter);
  modalFooter.appendChild(modalContinueBtn);
  modalTitle.textContent = `Welcome to Battleships!`;
  modalBody.innerHTML = `<p>Read the rules here: <a target='_blank' href="https://en.wikipedia.org/wiki/Battleship_(game)#Description">Game rules</a></p>`;
  modalBody.appendChild(modalNameEntryLabel);
  modalBody.appendChild(modalNameEntry);
  modalNameEntryLabel.textContent = `Player Name:`;
  modalContinueBtn.textContent = 'Start Game';
  return modalOuterWrapper;
};

const createShipFlyout = () => {
  const flyoutContainer = document.createElement('div');
  const flyoutHeader = document.createElement('div');
  const flyoutBody = document.createElement('div');
  const flyoutTitle = document.createElement('h5');
  flyoutContainer.setAttribute('id', '#shipflyout');
  flyoutContainer.classList.add('offcanvas', 'show', 'offcanvas-end');
  flyoutContainer.setAttribute('data-bs-scroll', 'true');
  flyoutContainer.setAttribute('data-bs-backdrop', 'false');
  flyoutHeader.classList.add('offcanvas-header');
  flyoutTitle.classList.add('offcanvas-title');
  flyoutBody.classList.add('offcanvas-body');
  flyoutContainer.appendChild(flyoutHeader);
  flyoutContainer.appendChild(flyoutBody);
  flyoutHeader.appendChild(flyoutTitle);
  flyoutTitle.textContent = `Ships to be Placed`;
  flyoutContainer.style.display = 'block';
  return flyoutContainer;
};

const createGameOverModal = (winnerName) => {
  const modalOuterWrapper = document.createElement('div');
  const modalContainer = document.createElement('div');
  const modalContent = document.createElement('div');
  const modalHeader = document.createElement('div');
  const modalBody = document.createElement('div');
  const modalFooter = document.createElement('div');
  const modalContinueBtn = document.createElement('button');
  const modalTitle = document.createElement('h1');
  modalContinueBtn.setAttribute('type', 'button');
  modalContinueBtn.setAttribute('id', 'playagainBtn');
  modalOuterWrapper.classList.add('modal');
  modalOuterWrapper.setAttribute('id', 'gameover-modal');
  modalOuterWrapper.style.display = `block`;
  modalContainer.classList.add(
    'modal-dialog',
    'modal-dialog-centered',
    'modal'
  );
  modalContent.classList.add('modal-content');
  modalHeader.classList.add('modal-header');
  modalTitle.classList.add('modal-title', 'fs-5');
  modalBody.classList.add('modal-body');
  modalFooter.classList.add('modal-footer');
  modalContinueBtn.classList.add('btn', 'btn-primary');
  modalOuterWrapper.appendChild(modalContainer);
  modalContainer.appendChild(modalContent);
  modalContent.appendChild(modalHeader);
  modalHeader.appendChild(modalTitle);
  modalContent.appendChild(modalBody);
  modalContent.appendChild(modalFooter);
  modalFooter.appendChild(modalContinueBtn);
  modalTitle.textContent = `Gameover!`;
  modalBody.textContent = `${winnerName} wins! Better luck next time!`;
  modalContinueBtn.textContent = 'Play Again';
  return modalOuterWrapper;
};

const createPlayerBoard = (playerName) => {
  const playerContainer = document.createElement('div');
  playerContainer.setAttribute('id', 'player');
  const playerTitle = document.createElement('p');
  playerTitle.setAttribute('id', 'player-name');
  playerTitle.textContent = `${playerName}`;
  const playerBoard = document.createElement('div');
  playerBoard.setAttribute('id', 'player-board');
  playerBoard.classList.add('gameBoard');
  playerContainer.appendChild(playerTitle);
  playerContainer.appendChild(playerBoard);
  return playerContainer;
};
const createCpuBoard = () => {
  const computerContainer = document.createElement('div');
  computerContainer.setAttribute('id', 'computer');
  const computerTitle = document.createElement('p');
  computerTitle.setAttribute('id', 'computer-name');
  computerTitle.textContent = `Computer`;
  const computerBoard = document.createElement('div');
  computerBoard.setAttribute('id', 'computer-board');
  computerBoard.classList.add('gameBoard');
  computerContainer.appendChild(computerTitle);
  computerContainer.appendChild(computerBoard);
  return computerContainer;
};

export {
  createWelcomeModal,
  createShipFlyout,
  createGameOverModal,
  createPlayerBoard,
  createCpuBoard,
};
