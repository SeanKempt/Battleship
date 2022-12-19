const createWelcomeModal = () => {
  const modalOuterWrapper = document.createElement('div');
  const modalContainer = document.createElement('div');
  const modalContent = document.createElement('div');
  const modalHeader = document.createElement('div');
  const modalBody = document.createElement('div');
  const modalFooter = document.createElement('div');
  const modalContinue = document.createElement('button');
  const modalTitle = document.createElement('h1');
  modalContinue.setAttribute('type', 'button');
  modalOuterWrapper.classList.add('modal');
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
  modalContinue.classList.add('btn', 'btn-primary');
  modalOuterWrapper.appendChild(modalContainer);
  modalContainer.appendChild(modalContent);
  modalContent.appendChild(modalHeader);
  modalHeader.appendChild(modalTitle);
  modalContent.appendChild(modalBody);
  modalContent.appendChild(modalFooter);
  modalFooter.appendChild(modalContinue);
  modalTitle.textContent = `Welcome to Battleships!`;
  modalBody.textContent = `Here are the rules!`;
  modalContinue.textContent = 'Start Game';
  return modalOuterWrapper;
};

const createShipFlyout = () => {
  const flyoutConatiner = document.createElement('div');
  const flyoutHeader = document.createElement('div');
  const flyoutBody = document.createElement('div');
  const flyoutTitle = document.createElement('h5');
  flyoutConatiner.setAttribute('id', '#shipflyout');
  flyoutConatiner.classList.add('offcanvas', 'show', 'offcanvas-start');
  flyoutHeader.classList.add('offcanvas-header');
  flyoutTitle.classList.add('offcanvas-title');
  flyoutBody.classList.add('offcanvas-body');
  flyoutConatiner.appendChild(flyoutHeader);
  flyoutConatiner.appendChild(flyoutBody);
  flyoutHeader.appendChild(flyoutTitle);
  flyoutTitle.textContent = `Ships to be Placed`;
  flyoutBody.textContent = 'hello';
  flyoutConatiner.style.display = 'block';
  return flyoutConatiner;
};

export { createWelcomeModal, createShipFlyout };
