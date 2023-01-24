export const pauseAnimation = (pin) => {
  pin.style.animationPlayState = "paused";
  pin.style.animation = "none";
};

export const playAnimation = (pin) => {
  pin.offsetHeight;
  pin.style.animationPlayState = "running";
};

export const renderLocationName = (el, name) => {
  el.textContent = name;
};

//"render"
export const renderSearch = (el) => {
  el.classList.remove("hidden");
};
