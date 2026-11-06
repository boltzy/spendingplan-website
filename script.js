const button = document.getElementById('topup');
const weeks = [2, 3, 4].map(number => document.getElementById(`week${number}`));
const extra = document.getElementById('week1-extra');
const status = document.getElementById('example-status');
const choices = document.querySelectorAll('input[name="topup-source"]');
let active = false;
function render() {
  const spread = document.querySelector('input[name="topup-source"]:checked').value === 'spread';
  const amounts = active ? (spread ? [184, 184, 182] : [200, 200, 150]) : [200, 200, 200];
  weeks.forEach((week, index) => {
    const changed = amounts[index] !== 200;
    week.classList.toggle('changed-amount', changed);
    week.innerHTML = changed ? `<span class="previous-amount">was £200</span> £${amounts[index]}` : '£200';
  });
  extra.textContent = active ? '+ £50 top-up' : '';
  button.setAttribute('aria-pressed', String(active));
  button.innerHTML = active ? 'Reset example <span aria-hidden="true">↺</span>' : 'Bring £50 forward <span aria-hidden="true">→</span>';
  status.textContent = active ? `After top-up: £550 remains in Future Weeks; Buffer stays £200. ${spread ? 'The reduction is spread across three weeks.' : 'The reduction comes from Week 4.'}` : 'Before top-up: £600 remains in Future Weeks.';
}
button.addEventListener('click', () => { active = !active; render(); });
choices.forEach(choice => choice.addEventListener('change', render));

const wizardPages = Array.from(document.querySelectorAll('[data-wizard-page]'));
const wizardBack = document.getElementById('wizard-back');
const wizardNext = document.getElementById('wizard-next');
const wizardProgress = document.getElementById('wizard-progress');
const wizardDots = Array.from(document.querySelectorAll('.wizard-dots span'));
let wizardStep = 0;
function renderWizard() {
  wizardPages.forEach((page, index) => { page.hidden = index !== wizardStep; });
  wizardDots.forEach((dot, index) => dot.classList.toggle('current', index === wizardStep));
  wizardBack.disabled = wizardStep === 0;
  wizardNext.textContent = wizardStep === wizardPages.length - 1 ? 'Start again ↺' : 'Continue →';
  wizardProgress.textContent = `Step ${wizardStep + 1} of ${wizardPages.length}`;
}
wizardBack.addEventListener('click', () => { if (wizardStep > 0) { wizardStep--; renderWizard(); } });
wizardNext.addEventListener('click', () => { wizardStep = (wizardStep + 1) % wizardPages.length; renderWizard(); });
renderWizard();
