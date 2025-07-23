        document.addEventListener('DOMContentLoaded', function() {
            const exerciseInput = document.getElementById('exercise');
            const setsInput = document.getElementById('sets');
            const repsInput = document.getElementById('reps');
            const detailsInput = document.getElementById('details');
            const submitButton = document.getElementById('button');
            const workoutList = document.getElementById('workout-list');

            // Load workouts from localStorage on page load
            loadWorkouts();

            function saveWorkouts() {
                const workouts = [];
                const workoutItems = workoutList.querySelectorAll('.workout-item');
                
                workoutItems.forEach((item, index) => {
                    const title = item.querySelector('h4').textContent;
                    const setsReps = item.querySelector('p:first-of-type').textContent;
                    const notes = item.querySelector('p:last-of-type')?.textContent || '';
                    const completed = item.classList.contains('completed');
                    
                    workouts.push({
                        id: index,
                        title: title,
                        setsReps: setsReps,
                        notes: notes.includes('Notes:') ? notes : '',
                        completed: completed
                    });
                });
                
                localStorage.setItem('workoutTracker', JSON.stringify(workouts));
            }

            function loadWorkouts() {
                const savedWorkouts = localStorage.getItem('workoutTracker');
                if (savedWorkouts) {
                    const workouts = JSON.parse(savedWorkouts);
                    workouts.forEach(workout => {
                        createWorkoutItem(workout.title, workout.setsReps, workout.notes, workout.completed, workout.id);
                    });
                }
            }

            function createWorkoutItem(title, setsReps, notes, completed = false, id = null) {
                const workoutItem = document.createElement('li');
                const workoutId = id !== null ? id : Date.now();
                workoutItem.className = `workout-item${completed ? ' completed' : ''}`;
                workoutItem.setAttribute('data-id', workoutId);
                
                workoutItem.innerHTML = `
                    <div class="complete-checkbox">
                        <input type="radio" id="complete-${workoutId}" name="complete-${workoutId}" ${completed ? 'checked' : ''}>
                        <label for="complete-${workoutId}" class="complete-label">Done</label>
                    </div>
                    <div class="workout-content">
                        <h4>${title}</h4>
                        <p>${setsReps}</p>
                        ${notes ? `<p>${notes}</p>` : ''}
                    </div>
                `;

                // Add event listener for completion toggle
                const checkbox = workoutItem.querySelector('input[type="radio"]');
                checkbox.addEventListener('change', function() {
                    if (this.checked) {
                        workoutItem.classList.add('completed');
                    } else {
                        workoutItem.classList.remove('completed');
                    }
                    saveWorkouts();
                });

                workoutList.appendChild(workoutItem);
            }

            function addExercise() {
                const exercise = exerciseInput.value.trim();
                const sets = setsInput.value;
                const reps = repsInput.value;
                const details = detailsInput.value.trim();

                if (!exercise || !sets || !reps) {
                    alert('Please fill in all required fields (Exercise, Sets, and Reps)');
                    return;
                }

                const setsRepsText = `Sets: ${sets} | Reps: ${reps}`;
                const notesText = details ? `Notes: ${details}` : '';

                createWorkoutItem(exercise, setsRepsText, notesText);
                saveWorkouts();

                // Clear form
                exerciseInput.value = '';
                setsInput.value = '';
                repsInput.value = '';
                detailsInput.value = '';

                // Focus back to exercise input
                exerciseInput.focus();
            }

            submitButton.addEventListener('click', addExercise);

            // Allow Enter key to submit when in input fields
            [exerciseInput, setsInput, repsInput].forEach(input => {
                input.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        addExercise();
                    }
                });
            });
        });