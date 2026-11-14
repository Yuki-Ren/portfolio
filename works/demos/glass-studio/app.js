'use strict';

const shapes = {
  glass: {
    name: 'グラス',
    detail: '縦に伸びた側面に、細い光が映る形。',
    scene: '飲みものを入れたときの、側面の透け方を想像してみてください。',
  },
  bowl: {
    name: '小鉢',
    detail: '広い口から、底まで光が入りやすい形。',
    scene: 'テーブルの木目が、浅い底を透けて見える場面を想像してみてください。',
  },
  vase: {
    name: '一輪挿し',
    detail: '丸い胴と細い口元で、光の曲がり方が異なる形。',
    scene: '一輪の花と影が、窓辺で重なる場面を想像してみてください。',
  },
};

const lights = {
  morning: { name: '朝の窓辺', colors: ['#d8f5f1', '#87d6cb', '#ecaa43'] },
  shade: { name: '木陰', colors: ['#b0ddf9', '#528fc0', '#737ac0'] },
  evening: { name: '夕暮れ', colors: ['#f9d5b8', '#e9a557', '#ca6990'] },
};

const shapeButtons = [...document.querySelectorAll('[data-form]')];
const lightButtons = [...document.querySelectorAll('[data-light]')];
const diagram = document.getElementById('glass-diagram');
const shapeTitle = document.getElementById('diagram-title');
const selectionStatus = document.getElementById('selection-status');
const selectionDetail = document.getElementById('selection-detail');
const combination = document.getElementById('current-combination');
const combinationNote = document.getElementById('combination-note');
const motionToggle = document.querySelector('.motion-toggle');
const gradientStops = [...diagram.querySelectorAll('#optic stop')];
const allowMotion = window.matchMedia('(prefers-reduced-motion: no-preference)');

let currentShape = 'glass';
let currentLight = 'morning';

function updateDescription() {
  const shape = shapes[currentShape];
  const light = lights[currentLight];
  shapeTitle.textContent = `${shape.name}と${light.name}の光の概念図`;
  selectionStatus.textContent = shape.name;
  selectionDetail.textContent = shape.detail;
  combination.textContent = `${shape.name} × ${light.name}`;
  combinationNote.textContent = shape.scene;
}

function updateMotion() {
  diagram.classList.toggle('motion-enabled', allowMotion.matches);
  motionToggle.hidden = !allowMotion.matches;
}

motionToggle.addEventListener('click', () => {
  const paused = diagram.classList.toggle('motion-paused');
  motionToggle.textContent = paused ? '動きを再開する' : '動きを止める';
});

shapeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (button.dataset.form === currentShape) return;
    currentShape = button.dataset.form;

    shapeButtons.forEach((item) => {
      const selected = item.dataset.form === currentShape;
      const vessel = document.getElementById(`vessel-${item.dataset.form}`);
      item.setAttribute('aria-pressed', String(selected));
      vessel.toggleAttribute('hidden', !selected);
      vessel.classList.toggle('vessel-motion', selected);
    });
    updateDescription();
  });
});

lightButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (button.dataset.light === currentLight) return;
    currentLight = button.dataset.light;
    lightButtons.forEach((item) => {
      item.setAttribute('aria-pressed', String(item.dataset.light === currentLight));
    });
    gradientStops.forEach((stop, index) => {
      stop.setAttribute('stop-color', lights[currentLight].colors[index]);
    });
    updateDescription();
  });
});

updateDescription();
updateMotion();
allowMotion.addEventListener?.('change', updateMotion);
