// 1. Get elements
const exerciseInput = document.getElementById('Exercise');
const setsInput     = document.getElementById('sets');
const repsInput     = document.getElementById('reps');
const detailsInput  = document.getElementById('details');
const submitButton  = document.getElementById('button');
const exerciseList  = document.querySelector('.added-Exercises');

// 2. Save all exercises to localStorage
function saveToLocalStorage() {
  const items = document.querySelectorAll('.exercise-item');
  const data = [];

  items.forEach(item => {
    const title   = item.querySelector('.exercise-title').textContent;
    const details = item.querySelector('.exercise-details').textContent;
    const done    = item.querySelector('input[type="checkbox"]').checked;
    data.push({ title, details, done });
  });

  localStorage.setItem('exercises', JSON.stringify(data));
}

// 3. Create and show one exercise entry
function createExercise(title, details, done) {
  const container = document.createElement('div');
  container.classList.add('exercise-item');
  container.style.border     = '1px solid #ccc';
  container.style.margin     = '10px 0';
  container.style.padding    = '10px';
  container.style.borderRadius = '8px';
  container.style.background = '#f5f5f5';

  const titleEl   = document.createElement('p');
  titleEl.classList.add('exercise-title');
  titleEl.textContent = title;

  const detailsEl = document.createElement('p');
  detailsEl.classList.add('exercise-details');
  detailsEl.textContent  = details;
  detailsEl.style.fontStyle = 'italic';
  detailsEl.style.color     = '#555';

  const checkbox = document.createElement('input');
  checkbox.type    = 'checkbox';
  checkbox.checked = done;

  const label = document.createElement('label');
  label.textContent = ' Mark as complete';
  label.style.marginLeft = '5px';

  // Strike-through when toggled
  checkbox.addEventListener('change', () => {
    const strike = checkbox.checked ? 'line-through' : 'none';
    titleEl.style.textDecoration   = strike;
    detailsEl.style.textDecoration = strike;
    saveToLocalStorage();
  });

  // Apply strike-through if already done
  if (done) {
    titleEl.style.textDecoration   = 'line-through';
    detailsEl.style.textDecoration = 'line-through';
  }

  // Append in order
  container.appendChild(titleEl);
  container.appendChild(detailsEl);
  container.appendChild(checkbox);
  container.appendChild(label);
  exerciseList.appendChild(container);
}

// 4. Handle form submission
function handleSubmit() {
  const name    = exerciseInput.value.trim();
  const sets    = setsInput.value.trim();
  const reps    = repsInput.value.trim();
  const details = detailsInput.value.trim();

  if (!name || !sets || !reps) {
    alert('Please fill out exercise, sets, and reps.');
    return;
  }

  const titleText   = `${name} — ${sets} sets × ${reps} reps`;
  const detailsText = details 
    ? `Details: ${details}` 
    : 'Details: No details provided';

  createExercise(titleText, detailsText, false);

  // Clear fields
  exerciseInput.value = '';
  setsInput.value     = '';
  repsInput.value     = '';
  detailsInput.value  = '';

  saveToLocalStorage();
}

// 5. Load saved exercises on page load
function loadExercises() {
  const stored = localStorage.getItem('exercises');
  if (!stored) return;

  const exercises = JSON.parse(stored);
  exercises.forEach(ex => {
    createExercise(ex.title, ex.details, ex.done);
  });
}

// 6. Event listeners
submitButton.addEventListener('click', handleSubmit);

[exerciseInput, setsInput, repsInput, detailsInput].forEach(input => {
  input.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  });
});

// 7. Initialize app
loadExercises();
