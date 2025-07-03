
(() => {
  type NullableHTMLElement = HTMLElement | null;
  type OptionElement = HTMLOptionElement;

  const getEl = (id: string): NullableHTMLElement => {
    return typeof document !== "undefined" ? document.getElementById(id) : null;
  };

  const calculateBill = (): void => {
    const amountInput = getEl("amount") as HTMLInputElement | null;
    const tipInput = getEl("tip") as HTMLInputElement | null;
    const peopleSelect = getEl("people") as HTMLSelectElement | null;
    const tipAmountSpan = getEl("tip-amount") as HTMLSpanElement | null;
    const perPersonSpan = getEl("per-person") as HTMLSpanElement | null;

    if (!amountInput || !tipInput || !peopleSelect || !tipAmountSpan || !perPersonSpan) return;

    const amount: number = parseFloat(amountInput.value) || 0;
    const tipPercent: number = parseFloat(tipInput.value) || 0;
    const people: number = parseInt(peopleSelect.value) || 1;

    const tipAmount: number = (amount * tipPercent) / 100;
    const total: number = amount + tipAmount;
    const perPerson: number = total / people;

    tipAmountSpan.textContent = `₹${tipAmount.toFixed(2)}`;
    perPersonSpan.textContent = `₹${perPerson.toFixed(2)}`;
  };

  const toggleTheme = (): void => {
    const toggleThemeBtn = getEl("toggle-theme") as HTMLButtonElement | null;
    if (!toggleThemeBtn || typeof document === "undefined") return;

    document.body.classList.toggle("dark-mode");
    toggleThemeBtn.textContent = document.body.classList.contains("dark-mode") ? "Dark" : "Light";
  };

  const fillPeopleDropdown = (): void => {
    const peopleSelect = getEl("people") as HTMLSelectElement | null;
    if (!peopleSelect || peopleSelect.options.length > 0 || typeof document === "undefined") return;

    for (let i = 1; i <= 10; i++) {
      const option: OptionElement = document.createElement("option");
      option.value = i.toString();
      option.textContent = i.toString();
      peopleSelect.appendChild(option);
    }
    peopleSelect.value = "2";
  };

  const setupEvents = (): void => {
    const calculateBtn = getEl("calculate") as HTMLButtonElement | null;
    const toggleThemeBtn = getEl("toggle-theme") as HTMLButtonElement | null;

    if (calculateBtn) {
      calculateBtn.addEventListener("click", calculateBill);
    }

    if (toggleThemeBtn) {
      toggleThemeBtn.addEventListener("click", toggleTheme);
    }
  };

  const init = (): void => {
    fillPeopleDropdown();
    setupEvents();
  };

  // Run only if document exists
  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
    } else {
      init();
    }
  }

  // Expose functions for testing
  if (typeof window !== "undefined") {
    (window as any).calculateBill = calculateBill;
    (window as any).fillPeopleDropdown = fillPeopleDropdown;
    (window as any).toggleTheme = toggleTheme;
  }
})();
